import Overtime from '../models/OvertimeModel.js';
import DataPegawai from '../models/DataPegawaiModel.js';
import { Op } from 'sequelize';

// ── Helpers ──────────────────────────────────────────────────────────────────

function isValidDate(dateStr) {
    const d = new Date(dateStr);
    return !isNaN(d.getTime());
}

function validate(worker_id, date, hours, reason) {
    if (!worker_id || !date || hours === undefined || hours === null || !reason) {
        return 'All fields are required.';
    }
    const numHours = Number(hours);
    if (isNaN(numHours) || numHours < 1 || numHours > 6) {
        return 'Overtime hours must be between 1 and 6.';
    }
    if (!isValidDate(date)) {
        return 'Invalid date.';
    }
    const entryDate = new Date(date);
    entryDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (entryDate > today) {
        return 'Date cannot be in the future.';
    }
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    if (entryDate < sevenDaysAgo) {
        return 'Date cannot be more than 7 days in the past.';
    }
    if (reason.trim().length < 10) {
        return 'Reason must be at least 10 characters.';
    }
    return null;
}

// ── Controllers ───────────────────────────────────────────────────────────────

// GET /overtime — list all entries
export const getOvertime = async (req, res) => {
    try {
        const records = await Overtime.findAll({ order: [['date', 'DESC']] });
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// GET /overtime/:id — single entry
export const getOvertimeByID = async (req, res) => {
    try {
        const record = await Overtime.findOne({ where: { id: req.params.id } });
        if (!record) return res.status(404).json({ msg: 'Overtime record not found.' });
        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// POST /overtime — create entry
export const createOvertime = async (req, res) => {
    const { worker_id, date, hours, reason } = req.body;

    // Shared validation (mirrors frontend)
    const validationError = validate(worker_id, date, hours, reason);
    if (validationError) return res.status(400).json({ msg: validationError });

    try {
        // Worker must exist
        const worker = await DataPegawai.findOne({ where: { id: worker_id } });
        if (!worker) return res.status(404).json({ msg: 'Worker not found in the system.' });

        // No duplicate for same worker + same date
        const duplicate = await Overtime.findOne({ where: { worker_id, date } });
        if (duplicate) {
            return res.status(409).json({
                msg: 'An overtime entry already exists for this worker on that date.'
            });
        }

        // Monthly cap: total overtime for this worker this month cannot exceed 60 hrs
        const entryDate = new Date(date);
        const monthStart = new Date(entryDate.getFullYear(), entryDate.getMonth(), 1);
        const monthEnd = new Date(entryDate.getFullYear(), entryDate.getMonth() + 1, 0);

        const monthlyRecords = await Overtime.findAll({
            where: {
                worker_id,
                date: { [Op.between]: [monthStart.toISOString().split('T')[0], monthEnd.toISOString().split('T')[0]] }
            }
        });
        const monthlyTotal = monthlyRecords.reduce((sum, r) => sum + Number(r.hours), 0);
        if (monthlyTotal + Number(hours) > 60) {
            return res.status(400).json({
                msg: `This entry would exceed the 60-hour monthly overtime cap. Worker has ${monthlyTotal} hours logged this month.`
            });
        }

        await Overtime.create({ worker_id, date, hours: Number(hours), reason: reason.trim() });
        res.status(201).json({ msg: 'Overtime entry created successfully.' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// DELETE /overtime/:id
export const deleteOvertime = async (req, res) => {
    try {
        const record = await Overtime.findOne({ where: { id: req.params.id } });
        if (!record) return res.status(404).json({ msg: 'Overtime record not found.' });
        await record.destroy();
        res.status(200).json({ msg: 'Overtime entry deleted.' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
