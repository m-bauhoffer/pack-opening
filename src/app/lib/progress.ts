export const levelThresholds = [
  { level: 1, requiredCopies: 1 },
  { level: 2, requiredCopies: 5 },
  { level: 3, requiredCopies: 10 },
  { level: 4, requiredCopies: 20 },
  { level: 5, requiredCopies: 50 },
] as const;

export function getMonsterProgress(quantity: number) {
  const currentLevel =
    [...levelThresholds].reverse().find((threshold) => quantity >= threshold.requiredCopies) ??
    levelThresholds[0];
  const nextLevel = levelThresholds.find(
    (threshold) => threshold.level === currentLevel.level + 1
  );

  if (!nextLevel) {
    return {
      level: currentLevel.level,
      currentLevelRequiredCopies: currentLevel.requiredCopies,
      nextLevel: null,
      nextLevelRequiredCopies: null,
      progressLabel: "Nivel maximo",
      progressPercent: 100,
    };
  }

  return {
    level: currentLevel.level,
    currentLevelRequiredCopies: currentLevel.requiredCopies,
    nextLevel: nextLevel.level,
    nextLevelRequiredCopies: nextLevel.requiredCopies,
    progressLabel: `${quantity} / ${nextLevel.requiredCopies} hacia nivel ${nextLevel.level}`,
    progressPercent: Math.min((quantity / nextLevel.requiredCopies) * 100, 100),
  };
}