export interface Meal {
  date: string;
  meal_id: string;
  calories: number;
  water_content_ml: number;
}

export interface WaterLog {
  date: string;
  volume_ml: number;
}

export interface Exercise {
  date: string;
  activity_type: 'Run' | 'Swim' | 'Bike';
  duration_min: number;
}

export interface DailyWaterStats {
  recommended_ml: number;
  food_water_ml: number;
  logged_water_ml: number;
  actual_ml: number;
  hydration_pct: number;
}

export interface UserProfile {
  sex: 'male' | 'female';
  weight_kg: number;
}

export interface MealLog {
  date: string;
  food_id: number;
} 