import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Card from '../components/Card';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

type SleepRecommendationsScreenRouteProp = RouteProp<RootStackParamList, 'SleepRecommendations'>;

interface Props {
  route: SleepRecommendationsScreenRouteProp;
}

interface FoodRecommendation {
  label: string;
  icon: string;
  desc: string;
  cite: string;
}

const RECOMMENDATIONS: Record<string, FoodRecommendation[]> = {
  'Difficulty Falling Asleep': [
    {
      label: 'Kiwi',
      icon: 'food-apple-outline',
      desc: 'Contains serotonin and antioxidants that help regulate sleep onset.',
      cite: 'Sleep Foundation',
    },
    {
      label: 'Almonds',
      icon: 'nutrition',
      desc: 'Rich in magnesium, which may improve sleep quality.',
      cite: 'National Council on Aging',
    },
    {
      label: 'Oatmeal',
      icon: 'noodles',
      desc: 'High in melatonin and complex carbs that induce drowsiness.',
      cite: 'Healthline',
    },
    {
      label: 'Warm Milk',
      icon: 'cup',
      desc: 'Provides tryptophan, a precursor to melatonin and serotonin.',
      cite: 'Sleep Foundation',
    },
  ],
  'Difficulty Staying Asleep': [
    {
      label: 'Tart Cherry Juice',
      icon: 'fruit-cherries',
      desc: 'Natural source of melatonin to help maintain sleep.',
      cite: 'Sleep Foundation',
    },
    {
      label: 'Banana',
      icon: 'food-apple-outline',
      desc: 'Offers magnesium and potassium to regulate muscle & nerve function.',
      cite: 'NPR',
    },
    {
      label: 'Pumpkin Seeds',
      icon: 'seed',
      desc: 'High in magnesium, which may reduce nighttime awakenings.',
      cite: 'National Council on Aging',
    },
  ],
  'Waking Too Early': [
    {
      label: 'Turkey',
      icon: 'food-turkey',
      desc: 'High in tryptophan to promote sustained melatonin production.',
      cite: 'NPR',
    },
    {
      label: 'White Rice',
      icon: 'rice',
      desc: 'High-GI carb that may help extend sleep duration if eaten ~1h before bed.',
      cite: 'Sleep Foundation',
    },
    {
      label: 'Cherries',
      icon: 'fruit-cherries',
      desc: 'Rich in melatonin, which can help lengthen sleep cycles.',
      cite: 'Sleep Foundation',
    },
  ],
};

export default function SleepRecommendations({ route }: Props) {
  const { issue } = route.params;
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingTop: insets.top + 16,
        }}
      >
        {RECOMMENDATIONS[issue].map(item => (
          <Card 
            key={item.label} 
            style={{
              marginBottom: 16,
              borderRadius: 12,
              padding: 12,
              backgroundColor: colors.card,
            }}
          >
            <View style={styles.header}>
              <Icon name={item.icon} size={24} color={colors.text} />
              <Text style={[styles.headerText, { color: colors.text }]}>
                {item.label}
              </Text>
            </View>
            <Text style={[styles.desc, { color: colors.text }]}>
              {item.desc}
            </Text>
            <Text style={[styles.cite, { color: colors.text }]}>
              Source: {item.cite}
            </Text>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerText: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: '600',
  },
  desc: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  cite: {
    fontSize: 12,
    fontStyle: 'italic',
    opacity: 0.7,
  },
}); 