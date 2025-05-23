import { useState, useCallback } from 'react';
import { WaterService } from './WaterService';
import { Meal, WaterLog, Exercise, DailyWaterStats } from './types';
import dayjs from 'dayjs';

export const useWaterTracking = (userProfile: { sex: 'male' | 'female'; weight_kg: number }) => {
  const [waterService] = useState(() => new WaterService(userProfile));
  const [todayStats, setTodayStats] = useState<DailyWaterStats | null>(null);

  const updateStats = useCallback(() => {
    setTodayStats(waterService.getTodayStats());
  }, [waterService]);

  const logWater = useCallback((volume_ml: number) => {
    const log: WaterLog = {
      date: dayjs().format('YYYY-MM-DD'),
      timestamp: dayjs().format('HH:mm:ss'),
      volume_ml,
    };
    waterService.addWaterLog(log);
    updateStats();
  }, [waterService, updateStats]);

  const logMeal = useCallback((meal: Omit<Meal, 'date'>) => {
    const newMeal: Meal = {
      ...meal,
      date: dayjs().format('YYYY-MM-DD'),
    };
    waterService.addMeal(newMeal);
    updateStats();
  }, [waterService, updateStats]);

  const logExercise = useCallback((exercise: Omit<Exercise, 'date'>) => {
    const newExercise: Exercise = {
      ...exercise,
      date: dayjs().format('YYYY-MM-DD'),
    };
    waterService.addExercise(newExercise);
    updateStats();
  }, [waterService, updateStats]);

  const getExerciseWaterSuggestion = useCallback((durationMin: number) => {
    return waterService.getExerciseWaterSuggestion(durationMin);
  }, [waterService]);

  return {
    todayStats,
    logWater,
    logMeal,
    logExercise,
    getExerciseWaterSuggestion,
  };
}; 