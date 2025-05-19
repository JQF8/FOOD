import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const FoodScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  
  const foodCategories = [
    {
      title: 'Better Sleep',
      icon: 'moon-waning-crescent',
      foods: [
        { name: 'Turkey', benefits: 'Rich in tryptophan, promotes melatonin production', category: 'Better Sleep' },
        { name: 'Almonds', benefits: 'Contains magnesium and melatonin', category: 'Better Sleep' },
        { name: 'Chamomile Tea', benefits: 'Natural sedative properties', category: 'Better Sleep' },
      ],
    },
    {
      title: 'Energy Boost',
      icon: 'lightning-bolt',
      foods: [
        { name: 'Quinoa', benefits: 'Complete protein with complex carbohydrates', category: 'Energy Boost' },
        { name: 'Bananas', benefits: 'Natural sugars and potassium', category: 'Energy Boost' },
        { name: 'Greek Yogurt', benefits: 'Protein and probiotics', category: 'Energy Boost' },
      ],
    },
    {
      title: 'Stress Relief',
      icon: 'heart-pulse',
      foods: [
        { name: 'Dark Chocolate', benefits: 'Contains antioxidants and mood-enhancing compounds', category: 'Stress Relief' },
        { name: 'Avocado', benefits: 'Healthy fats and B vitamins', category: 'Stress Relief' },
        { name: 'Green Tea', benefits: 'L-theanine for calm focus', category: 'Stress Relief' },
      ],
    },
  ];

  const handleFoodPress = (food: { name: string; benefits: string; category: string }) => {
    navigation.navigate('FoodDetail', { food });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView>
        <View style={[styles.header, { backgroundColor: colors.gradient.start }]}>
          <Text style={[styles.title, { color: colors.text }]}>Food Recommendations</Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>Based on your wellness goals</Text>
        </View>

        {foodCategories.map((category, index) => (
          <View key={index} style={styles.section}>
            <View style={styles.categoryHeader}>
              <Icon name={category.icon} size={24} color={colors.primary} />
              <Text style={[styles.categoryTitle, { color: colors.text }]}>{category.title}</Text>
            </View>

            {category.foods.map((food, foodIndex) => (
              <TouchableOpacity
                key={foodIndex}
                style={[styles.foodCard, { backgroundColor: colors.card }]}
                onPress={() => handleFoodPress(food)}
              >
                <View style={styles.foodInfo}>
                  <Text style={[styles.foodName, { color: colors.text }]}>{food.name}</Text>
                  <Text style={[styles.foodBenefits, { color: colors.text }]}>{food.benefits}</Text>
                </View>
                <Icon name="chevron-right" size={24} color={colors.text} />
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Meal Planning</Text>
          <TouchableOpacity style={[styles.mealPlanCard, { backgroundColor: colors.card }]}>
            <Icon name="calendar-clock" size={24} color={colors.primary} />
            <View style={styles.mealPlanInfo}>
              <Text style={[styles.mealPlanTitle, { color: colors.text }]}>Create Weekly Meal Plan</Text>
              <Text style={[styles.mealPlanDescription, { color: colors.text }]}>
                Get personalized meal suggestions based on your wellness goals
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  section: {
    padding: 20,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  foodCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  foodBenefits: {
    fontSize: 14,
    opacity: 0.8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  mealPlanCard: {
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  mealPlanInfo: {
    marginLeft: 15,
    flex: 1,
  },
  mealPlanTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  mealPlanDescription: {
    fontSize: 14,
    opacity: 0.8,
  },
});

export default FoodScreen; 