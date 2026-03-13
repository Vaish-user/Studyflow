import User from '../models/User.js';
import { getLevelFromXP } from '../utils/xpUtils.js';

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const level = getLevelFromXP(user.totalXP);
    res.json({ ...user.toObject(), level });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, subjects, studyGoal } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (name) user.name = name;
    if (subjects) user.subjects = subjects;
    if (studyGoal) user.studyGoal = studyGoal;
    const updated = await user.save();
    res.json({
      id: updated._id,
      name: updated.name,
      email: updated.email,
      subjects: updated.subjects,
      studyGoal: updated.studyGoal,
      streak: updated.streak,
      totalXP: updated.totalXP,
    });
  } catch (error) {
    next(error);
  }
};

export const getLeaderboard = async (req, res, next) => {
  try {
    const topUsers = await User.find().sort({ totalXP: -1 }).limit(10).select('name totalXP streak');
    res.json(topUsers);
  } catch (error) {
    next(error);
  }
};

