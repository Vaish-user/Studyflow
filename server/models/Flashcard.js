import mongoose from 'mongoose';

const flashcardSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    materialId: { type: mongoose.Schema.Types.ObjectId, ref: 'StudyMaterial', required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
    sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

const Flashcard = mongoose.model('Flashcard', flashcardSchema);

export default Flashcard;

