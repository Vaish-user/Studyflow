import express from 'express';
import {
  generateNotes,
  generateFlashcards,
  generateQuiz,
} from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/generate-notes', protect, generateNotes);
router.post('/generate-flashcards', protect, generateFlashcards);
router.post('/generate-quiz', protect, generateQuiz);

export default router;

