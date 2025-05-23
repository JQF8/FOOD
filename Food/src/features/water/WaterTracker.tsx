import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '../../components/Icon';
import { WaterService, DailyWaterStats } from './WaterService';
import { LogWaterModal } from './LogWaterModal';
import { HighWaterFoodsCard } from './HighWaterFoodsCard';
import { HIGH_WATER_FOODS } from './constants';

interface Props {
  waterService: WaterService;
}

type FoodItem = typeof HIGH_WATER_FOODS[number];

export const WaterTracker: React.FC<Props> = ({ waterService }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [todayStats, setTodayStats] = useState<DailyWaterStats>({
    total: 0,
    goal: 0,
    percentage: 0,
  });
  const [recommendedFoods, setRecommendedFoods] = useState<FoodItem[]>([]);

  useEffect(() => {
    updateStats();
  }, []);

  const updateStats = async () => {
    const stats = await waterService.getTodayStats();
    setTodayStats(() => stats);
    // Update recommended foods based on logged stats
    // For now, we'll just show the top 3 foods
    setRecommendedFoods(HIGH_WATER_FOODS.slice(0, 3));
  };

  const handleSave = async (amount: number, type: 'water' | 'food') => {
    if (type === 'water') {
      await waterService.logWater(amount);
    } else {
      await waterService.logFood(amount);
    }
    await updateStats();
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Water Intake</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Icon name="plus" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{todayStats.total}L</Text>
          <Text style={styles.statLabel}>Today</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{todayStats.goal}L</Text>
          <Text style={styles.statLabel}>Goal</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{todayStats.percentage}%</Text>
          <Text style={styles.statLabel}>Progress</Text>
        </View>
      </View>

      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${Math.min(todayStats.percentage, 100)}%` },
          ]}
        />
      </View>

      <HighWaterFoodsCard foods={recommendedFoods} />

      <LogWaterModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSave}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222B45',
  },
  addButton: {
    backgroundColor: '#3366FF',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222B45',
  },
  statLabel: {
    fontSize: 12,
    color: '#8F9BB3',
    marginTop: 4,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#EDF1F7',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3366FF',
    borderRadius: 4,
  },
}); 