import { DailyWaterStats, WaterLog, MealLog } from './types';
import dayjs from 'dayjs';

interface WaterServiceConfig {
  sex: 'male' | 'female';
  weight_kg: number;
}

export class WaterService {
  private sex: 'male' | 'female';
  private weight_kg: number;
  private waterLogs: WaterLog[] = [];
  private mealLogs: MealLog[] = [];

  constructor(config: WaterServiceConfig) {
    this.sex = config.sex;
    this.weight_kg = config.weight_kg;
  }

  private getRecommendedWater(): number {
    // Basic calculation: 30-35ml per kg of body weight
    return Math.round(this.weight_kg * (this.sex === 'male' ? 35 : 30));
  }

  logWater({ volume_ml }: { volume_ml: number }) {
    const today = dayjs().format('YYYY-MM-DD');
    this.waterLogs.push({ date: today, volume_ml });
  }

  logMealWater({ food_id }: { food_id: number }) {
    const today = dayjs().format('YYYY-MM-DD');
    this.mealLogs.push({ date: today, food_id });
  }

  getTodayStats(): DailyWaterStats {
    const today = dayjs().format('YYYY-MM-DD');
    const recommended_ml = this.getRecommendedWater();

    // Calculate water from logged water
    const logged_water_ml = this.waterLogs
      .filter(log => log.date === today)
      .reduce((sum, log) => sum + log.volume_ml, 0);

    // Calculate water from meals (simplified for now)
    const food_water_ml = this.mealLogs
      .filter(log => log.date === today)
      .reduce((sum, log) => sum + 100, 0); // Assuming each meal contributes 100ml

    const actual_ml = logged_water_ml + food_water_ml;
    const hydration_pct = Math.round((actual_ml / recommended_ml) * 100);

    return {
      recommended_ml,
      food_water_ml,
      logged_water_ml,
      actual_ml,
      hydration_pct,
    };
  }
} 