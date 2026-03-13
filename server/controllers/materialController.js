import StudyMaterial from '../models/StudyMaterial.js';
import Notes from '../models/Notes.js';
import Flashcard from '../models/Flashcard.js';
import Quiz from '../models/Quiz.js';

export const createMaterial = async (req, res, next) => {
  try {
    const { title, type, content } = req.body;
    if (!title || !type || !content) {
      return res.status(400).json({ message: 'Title, type and content are required' });
    }
    const material = await StudyMaterial.create({
      title,
      type,
      content,
      userId: req.user._id,
    });
    res.status(201).json(material);
  } catch (error) {
    next(error);
  }
};

export const getMaterials = async (req, res, next) => {
  try {
    const materials = await StudyMaterial.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(materials);
  } catch (error) {
    next(error);
  }
};

export const getMaterialById = async (req, res, next) => {
  try {
    const material = await StudyMaterial.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }

    const notes = await Notes.findOne({ materialId: material._id });
    const flashcards = await Flashcard.find({ materialId: material._id });
    const quiz = await Quiz.findOne({ materialId: material._id });

    res.json({ material, notes, flashcards, quiz });
  } catch (error) {
    next(error);
  }
};

export const deleteMaterial = async (req, res, next) => {
  try {
    const material = await StudyMaterial.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }
    await Notes.deleteMany({ materialId: material._id });
    await Flashcard.deleteMany({ materialId: material._id });
    await Quiz.deleteMany({ materialId: material._id });
    res.json({ message: 'Material and related AI content deleted' });
  } catch (error) {
    next(error);
  }
};

