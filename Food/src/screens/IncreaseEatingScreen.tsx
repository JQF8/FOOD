import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../context/ThemeContext';

const IncreaseEatingScreen: React.FC = () => {
  const { colors } = useTheme();
  
  const foodCategories = [
    {
      title: 'High Calorie Foods',
      icon: 'fire',
      foods: [
        { name: 'Avocado', benefits: 'Healthy fats and high calories', calories: '322 kcal/200g' },
        { name: 'Nuts & Seeds', benefits: 'Dense in calories and nutrients', calories: '607 kcal/100g' },
        { name: 'Olive Oil', benefits: 'Healthy fats for weight gain', calories: '884 kcal/100g' },
      ],
    },
    {
      title: 'Protein Rich',
      icon: 'food-steak',
      foods: [
        { name: 'Salmon', benefits: 'High in protein and healthy fats', calories: '208 kcal/100g' },
        { name: 'Greek Yogurt', benefits: 'Protein and probiotics', calories: '130 kcal/100g' },
        { name: 'Eggs', benefits: 'Complete protein source', calories: '155 kcal/100g' },
      ],
    },
    {
      title: 'Carbohydrate Sources',
      icon: 'bread-slice',
      foods: [
        { name: 'Sweet Potatoes', benefits: 'Complex carbs and vitamins', calories: '86 kcal/100g' },
        { name: 'Quinoa', benefits: 'Complete protein and carbs', calories: '120 kcal/100g' },
        { name: 'Brown Rice', benefits: 'Fiber-rich complex carbs', calories: '112 kcal/100g' },
      ],
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView>
        <View style={[styles.header, { backgroundColor: colors.primary }]}>
          <Text style={[styles.title, { color: '#FFFFFF' }]}>Increase Eating</Text>
          <Text style={[styles.subtitle, { color: '#FFFFFF' }]}>Healthy weight gain foods</Text>
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
              >
                <View style={styles.foodInfo}>
                  <Text style={[styles.foodName, { color: colors.text }]}>{food.name}</Text>
                  <Text style={[styles.foodBenefits, { color: colors.text }]}>{food.benefits}</Text>
                  <Text style={[styles.calories, { color: colors.primary }]}>{food.calories}</Text>
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
                Get personalized meal suggestions for healthy weight gain
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
    marginBottom: 5,
  },
  calories: {
    fontSize: 14,
    fontWeight: '600',
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

export default IncreaseEatingScreen; 