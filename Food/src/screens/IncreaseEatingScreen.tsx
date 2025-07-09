import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

export default function IncreaseEatingScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);

  const strategies = [
    {
      id: '1',
      title: 'Add Healthy Snacks',
      description: 'Include nutrient-dense snacks between meals',
      icon: 'nutrition-outline',
    },
    {
      id: '2',
      title: 'Increase Portion Sizes',
      description: 'Gradually increase your meal portions',
      icon: 'restaurant-outline',
    },
    {
      id: '3',
      title: 'Add Protein-Rich Foods',
      description: 'Include more protein in your diet',
      icon: 'fitness-outline',
    },
    {
      id: '4',
      title: 'Track Your Progress',
      description: 'Monitor your calorie intake and weight',
      icon: 'analytics-outline',
    },
  ];

  const handleStrategySelect = (strategyId: string) => {
    setSelectedStrategy(strategyId);
    // TODO: Implement strategy selection logic
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Text style={[styles.title, { color: colors.text }]}>Increase Eating</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={[styles.subtitle, { color: colors.text }]}>
          Choose a strategy to help increase your food intake:
        </Text>

        <View style={styles.strategiesContainer}>
          {strategies.map((strategy) => (
            <TouchableOpacity
              key={strategy.id}
              style={[
                styles.strategyCard,
                { 
                  backgroundColor: colors.card,
                  borderColor: selectedStrategy === strategy.id ? colors.primary : colors.border,
                },
              ]}
              onPress={() => handleStrategySelect(strategy.id)}
            >
              <Icon 
                name={strategy.icon} 
                size={24} 
                color={selectedStrategy === strategy.id ? colors.primary : colors.text} 
              />
              <View style={styles.strategyContent}>
                <Text style={[styles.strategyTitle, { color: colors.text }]}>
                  {strategy.title}
                </Text>
                <Text style={[styles.strategyDescription, { color: colors.text + '80' }]}>
                  {strategy.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  strategiesContainer: {
    gap: 16,
  },
  strategyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  strategyContent: {
    marginLeft: 16,
    flex: 1,
  },
  strategyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  strategyDescription: {
    fontSize: 14,
  },
}); 