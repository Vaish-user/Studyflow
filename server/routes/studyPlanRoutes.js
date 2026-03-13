import express from 'express';
import {
  getStudyPlan,
  createStudyPlan,
  updateStudyPlanStatus,
} from '../controllers/studyPlanController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getStudyPlan);
router.post('/', protect, createStudyPlan);
router.put('/:id', protect, updateStudyPlanStatus);

export default router;

