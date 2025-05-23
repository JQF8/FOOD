export const WATER_BASELINES = {
  DAILY_MALE: 3.7, // liters
  DAILY_FEMALE: 2.7, // liters
  WATER_PER_KG: 0.033, // liters per kg of body weight
  EXERCISE_WATER: 0.5, // liters per hour of exercise
} as const;

export const calculateWeightBasedBaseline = (weightKg: number): number => {
  return weightKg * WATER_BASELINES.WATER_PER_KG;
};

export const calculateExerciseWater = (exerciseHours: number): number => {
  return exerciseHours * WATER_BASELINES.EXERCISE_WATER;
};

export const HIGH_WATER_FOODS = [
  { name: "Cucumber", waterPct: 96 },
  { name: "Watermelon", waterPct: 92 },
  { name: "Tomato", waterPct: 94 },
  { name: "Lettuce", waterPct: 95 },
  { name: "Apple", waterPct: 86 },
  { name: "Orange", waterPct: 87 },
  { name: "Celery", waterPct: 95 },
  { name: "Grapes", waterPct: 81 },
  { name: "Strawberries", waterPct: 91 },
  { name: "Cantaloupe", waterPct: 90 },
  { name: "Peach", waterPct: 89 },
  { name: "Pineapple", waterPct: 87 },
] as const; 