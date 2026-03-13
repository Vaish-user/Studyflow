import mongoose from 'mongoose';

const notesSchema = new mongoose.Schema(
  {
    materialId: { type: mongoose.Schema.Types.ObjectId, ref: 'StudyMaterial', required: true },
    content: { type: String, required: true },
    summary: { type: String },
  },
  { timestamps: true }
);

const Notes = mongoose.model('Notes', notesSchema);

export default Notes;

