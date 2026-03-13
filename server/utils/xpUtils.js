export const calculateXPForSession = (minutesStudied, materialsCount) => {
  const base = Math.max(10, minutesStudied);
  return base + materialsCount * 5;
};

export const getLevelFromXP = (totalXP) => {
  if (totalXP >= 1000) return { level: 10, label: 'Knowledge Master' };
  if (totalXP >= 700) return { level: 7, label: 'Advanced Scholar' };
  if (totalXP >= 500) return { level: 5, label: 'Active Learner' };
  if (totalXP >= 250) return { level: 3, label: 'Growing Learner' };
  return { level: 1, label: 'Beginner' };
};

