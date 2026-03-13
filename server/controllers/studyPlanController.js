import StudyPlan from '../models/StudyPlan.js';

export const getStudyPlan = async (req, res, next) => {
  try {
    const plans = await StudyPlan.find({ userId: req.user._id }).sort({ revisionDate: 1 });
    res.json(plans);
  } catch (error) {
    next(error);
  }
};

export const createStudyPlan = async (req, res, next) => {
  try {
    const { topic, revisionDate } = req.body;
    if (!topic || !revisionDate) {
      return res.status(400).json({ message: 'Topic and revision date are required' });
    }
    const plan = await StudyPlan.create({
      userId: req.user._id,
      topic,
      revisionDate,
    });
    res.status(201).json(plan);
  } catch (error) {
    next(error);
  }
};

export const updateStudyPlanStatus = async (req, res, next) => {
  try {
    const plan = await StudyPlan.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!plan) {
      return res.status(404).json({ message: 'Study plan not found' });
    }
    plan.completed = req.body.completed ?? plan.completed;
    const updated = await plan.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

