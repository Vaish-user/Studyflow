import express from 'express';
import {
  createMaterial,
  getMaterials,
  getMaterialById,
  deleteMaterial,
} from '../controllers/materialController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createMaterial);
router.get('/', protect, getMaterials);
router.get('/:id', protect, getMaterialById);
router.delete('/:id', protect, deleteMaterial);

export default router;

