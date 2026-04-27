import express from 'express';
import { verifyUser, adminOnly } from '../middleware/AuthUser.js';
import {
    getOvertime,
    getOvertimeByID,
    createOvertime,
    deleteOvertime
} from '../controllers/OvertimeController.js';

const router = express.Router();

router.get('/overtime', verifyUser, adminOnly, getOvertime);
router.get('/overtime/:id', verifyUser, adminOnly, getOvertimeByID);
router.post('/overtime', verifyUser, adminOnly, createOvertime);
router.delete('/overtime/:id', verifyUser, adminOnly, deleteOvertime);

export default router;
