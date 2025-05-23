export interface ProfileData {
  // ... existing code ...
  healthGoals?: {
    primaryGoal: string;
    sleep?: {
      currentHours: number;
      targetHours: number;
      currentQuality: number;
      targetQuality: number;
    };
    stress?: {
      currentLevel: number;
      targetLevel: number;
      mindfulnessDays: number;
    };
    exercise?: {
      currentWorkouts: number;
      targetWorkouts: number;
      workoutLength: number;
    };
    hydration?: {
      currentGlasses: number;
      targetGlasses: number;
    };
    nutrition?: {
      targetCalories: number;
      restrictions: string[];
    };
  };
  // ... existing code ...
} 