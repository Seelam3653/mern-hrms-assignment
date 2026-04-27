import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DESIGNATIONS = ['Mason', 'Electrician', 'Plumber', 'Supervisor', 'Helper'];

// ── Helpers ──────────────────────────────────────────────────────────────────
function todayStr() {
    return new Date().toISOString().split('T')[0];
}

function sevenDaysAgoStr() {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d.toISOString().split('T')[0];
}

function validateForm({ worker_id, date, hours, reason }) {
    const errors = {};
    if (!worker_id) errors.worker_id = 'Please select a worker.';
    if (!date) {
        errors.date = 'Date is required.';
    } else {
        if (date > todayStr()) errors.date = 'Date cannot be in the future.';
        if (date < sevenDaysAgoStr()) errors.date = 'Date cannot be more than 7 days in the past.';
    }
    const h = Number(hours);
    if (!hours) {
        errors.hours = 'Overtime hours are required.';
    } else if (isNaN(h) || h < 1 || h > 6) {
        errors.hours = 'Overtime hours must be between 1 and 6.';
    }
    if (!reason) {
        errors.reason = 'Reason is required.';
    } else if (reason.trim().length < 10) {
        errors.reason = 'Reason must be at least 10 characters.';
    }
    return errors;
}

// ── Component ─────────────────────────────────────────────────────────────────
const DataOvertime = () => {
    const [workers, setWorkers] = useState([]);
    const [entries, setEntries] = useState([]);
    const [form, setForm] = useState({ worker_id: '', date: '', hours: '', reason: '' });
    const [errors, setErrors] = useState({});
    const [apiMsg, setApiMsg] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);

    // Fetch workers
    useEffect(() => {
        axios.get('/data_pegawai', { withCredentials: true })
            .then(r => setWorkers(r.data))
            .catch(() => {});
        fetchEntries();
    }, []);

    const fetchEntries = () => {
        axios.get('/overtime', { withCredentials: true })
            .then(r => setEntries(r.data))
            .catch(() => {});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
        setApiMsg({ type: '', text: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm(form);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setLoading(true);
        try {
            await axios.post('/overtime', form, { withCredentials: true });
            setApiMsg({ type: 'success', text: 'Overtime entry submitted successfully!' });
            setForm({ worker_id: '', date: '', hours: '', reason: '' });
            fetchEntries();
        } catch (err) {
            setApiMsg({ type: 'error', text: err.response?.data?.msg || 'Submission failed.' });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this overtime entry?')) return;
        try {
            await axios.delete(`/overtime/${id}`, { withCredentials: true });
            fetchEntries();
        } catch (err) {
            alert(err.response?.data?.msg || 'Delete failed.');
        }
    };

    const workerMap = workers.reduce((acc, w) => { acc[w.id] = w.nama_pegawai; return acc; }, {});

    return (
        <div className="p-4 md:p-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Overtime Entry & Approval</h2>

            {/* Form Card */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Log Overtime</h3>

                {apiMsg.text && (
                    <div className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium ${
                        apiMsg.type === 'success'
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                        {apiMsg.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Worker */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-600">Worker *</label>
                        <select
                            name="worker_id"
                            value={form.worker_id}
                            onChange={handleChange}
                            className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.worker_id ? 'border-red-400' : 'border-gray-300'
                            }`}
                        >
                            <option value="">-- Select Worker --</option>
                            {workers.map(w => (
                                <option key={w.id} value={w.id}>{w.nama_pegawai} ({w.nik})</option>
                            ))}
                        </select>
                        {errors.worker_id && <p className="text-red-500 text-xs">{errors.worker_id}</p>}
                    </div>

                    {/* Date */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-600">Date *</label>
                        <input
                            type="date"
                            name="date"
                            value={form.date}
                            max={todayStr()}
                            min={sevenDaysAgoStr()}
                            onChange={handleChange}
                            className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.date ? 'border-red-400' : 'border-gray-300'
                            }`}
                        />
                        {errors.date && <p className="text-red-500 text-xs">{errors.date}</p>}
                    </div>

                    {/* Overtime Hours */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-600">Overtime Hours (1–6) *</label>
                        <input
                            type="number"
                            name="hours"
                            value={form.hours}
                            min="1"
                            max="6"
                            step="0.5"
                            onChange={handleChange}
                            placeholder="e.g. 2"
                            className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.hours ? 'border-red-400' : 'border-gray-300'
                            }`}
                        />
                        {errors.hours && <p className="text-red-500 text-xs">{errors.hours}</p>}
                    </div>

                    {/* Reason */}
                    <div className="flex flex-col gap-1 md:col-span-2">
                        <label className="text-sm font-medium text-gray-600">Reason (min 10 chars) *</label>
                        <textarea
                            name="reason"
                            value={form.reason}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Describe why overtime was needed..."
                            className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                                errors.reason ? 'border-red-400' : 'border-gray-300'
                            }`}
                        />
                        <div className="flex justify-between">
                            {errors.reason && <p className="text-red-500 text-xs">{errors.reason}</p>}
                            <span className={`ml-auto text-xs ${form.reason.trim().length < 10 ? 'text-gray-400' : 'text-green-600'}`}>
                                {form.reason.trim().length} / 10 min
                            </span>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition disabled:opacity-50"
                        >
                            {loading ? 'Submitting...' : 'Submit Overtime Entry'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Overtime List */}
            <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Overtime Records</h3>
                {entries.length === 0 ? (
                    <p className="text-gray-400 text-sm">No overtime entries found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead>
                                <tr className="border-b border-gray-200 text-gray-600">
                                    <th className="py-2 px-3">Worker</th>
                                    <th className="py-2 px-3">Date</th>
                                    <th className="py-2 px-3">Hours</th>
                                    <th className="py-2 px-3">Reason</th>
                                    <th className="py-2 px-3">Status</th>
                                    <th className="py-2 px-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {entries.map(e => {
                                    const [y, m, d] = e.date.split('-');
                                    const dateFormatted = `${d}/${m}/${y}`;
                                    return (
                                        <tr key={e.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-2 px-3">{workerMap[e.worker_id] || e.worker_id}</td>
                                            <td className="py-2 px-3">{dateFormatted}</td>
                                            <td className="py-2 px-3">{e.hours}h</td>
                                            <td className="py-2 px-3 max-w-xs truncate">{e.reason}</td>
                                            <td className="py-2 px-3">
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                                    e.status === 'approved'
                                                        ? 'bg-green-100 text-green-700'
                                                        : e.status === 'rejected'
                                                        ? 'bg-red-100 text-red-700'
                                                        : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                    {e.status}
                                                </span>
                                            </td>
                                            <td className="py-2 px-3">
                                                <button
                                                    onClick={() => handleDelete(e.id)}
                                                    className="text-red-500 hover:text-red-700 text-xs font-medium"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DataOvertime;
