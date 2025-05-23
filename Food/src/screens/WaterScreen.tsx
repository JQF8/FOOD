import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { WaterTracker } from '../features/water/WaterTracker';
import { useWaterTracking } from '../features/water/useWaterTracking';
import { useProfile } from '../hooks/useProfile';
import { WaterService } from '../features/water/WaterService';

export default function WaterScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { profile } = useProfile();

  // Get user's sex with fallback to 'male'
  const userSex = profile.sex === 'other' || !profile.sex ? 'male' : profile.sex;

  // Initialize water tracking with user profile
  const { todayStats, logWater, logMeal, logExercise } = useWaterTracking({
    sex: userSex,
    weight_kg: profile.weight || 70,
  });

  // Create water service instance
  const waterService = new WaterService({
    sex: userSex,
    weight_kg: profile.weight || 70,
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingTop: insets.top + 16,
        }}
      >
        <WaterTracker 
          waterService={waterService}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 