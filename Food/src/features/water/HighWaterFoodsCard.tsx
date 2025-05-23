import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from '../../components/Icon';
import { HIGH_WATER_FOODS } from './constants';

type FoodItem = typeof HIGH_WATER_FOODS[number];

interface Props {
  foods: FoodItem[];
}

export const HighWaterFoodsCard: React.FC<Props> = ({ foods }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Try these high-water foods</Text>
      <View style={styles.foodList}>
        {foods.map((food, index) => (
          <View key={index} style={styles.foodItem}>
            <Icon name="water" size={24} color="#8F9BB3" />
            <View style={styles.foodInfo}>
              <Text style={styles.foodName}>{food.name}</Text>
              <Text style={styles.waterContent}>{food.waterContent}% water</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#222B45',
  },
  foodList: {
    gap: 12,
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#222B45',
  },
  waterContent: {
    fontSize: 12,
    color: '#8F9BB3',
    marginTop: 2,
  },
}); 