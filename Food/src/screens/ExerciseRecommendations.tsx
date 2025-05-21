import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, ViewStyle, Modal, Pressable } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Card from '../components/Card';
import { Chip } from '../components/Chip';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const STAGE_CONFIG = {
  Before: { 
    icon: 'weather-sunny', 
    color: '#FFF8E1' 
  },
  During: { 
    icon: 'water-outline', 
    color: '#E3F2FD' 
  },
  After: { 
    icon: 'food-apple-outline', 
    color: '#E8F5E9' 
  },
};

type ExerciseRecommendationsScreenRouteProp = RouteProp<RootStackParamList, 'ExerciseRecommendations'>;

interface Props {
  route: ExerciseRecommendationsScreenRouteProp;
}

interface FoodItem {
  name: string;
  description: string;
  source: string;
}

const FOOD_TIPS: Record<string, Record<string, FoodItem[]>> = {
  Run: {
    Before: [
      {
        name: 'Banana',
        description: 'Provides easily digestible carbohydrates and potassium to fuel working muscles, maintain electrolyte balance, and help prevent cramping during exercise',
        source: 'Healthline'
      },
      {
        name: 'Oatmeal',
        description: 'A complex-carb source that releases energy slowly, avoiding blood-sugar spikes and delivering sustained fuel without GI discomfort',
        source: 'Oats Overnight'
      },
      {
        name: 'Toast with Honey',
        description: 'Honey delivers quick-absorbing simple sugars for an immediate energy boost; spread on toast or a rice cake ~30 minutes pre-run for fast fuel without heaviness',
        source: 'Peloton'
      },
      {
        name: 'Energy Bar',
        description: 'Combines carbohydrates for energy plus protein to kick-start muscle repair—portable and balanced to power you through your warm-up and early miles',
        source: 'QNT Sport'
      }
    ],
    During: [
      {
        name: 'Sports Drink',
        description: 'Replenishes fluids, glucose and electrolytes (sodium, potassium, magnesium, calcium) lost in sweat, helping sustain hydration and endurance',
        source: 'The Nutrition Source'
      },
      {
        name: 'Energy Gel',
        description: 'Delivers a concentrated hit of carbohydrates when you need to maintain blood sugar and push through fatigue—best sipped with water to aid absorption',
        source: 'Runners Need'
      },
      {
        name: 'Water',
        description: 'Essential for keeping blood volume up, regulating body temperature, and preventing dehydration-related cramps or fatigue',
        source: 'University of Michigan Medical School'
      },
      {
        name: 'Electrolyte Tablets',
        description: 'Supply key minerals (sodium, potassium, calcium, magnesium) lost through sweat, supporting nerve impulses, muscle contractions and optimal fluid uptake',
        source: 'Ohio State Health'
      }
    ],
    After: [
      {
        name: 'Protein Shake',
        description: 'Offers fast-absorbing, high-quality protein to repair microtears in muscle fibers and support recovery; total daily protein intake is the main driver of muscle rebuild',
        source: 'Healthline'
      },
      {
        name: 'Greek Yogurt',
        description: 'Packed with protein plus live cultures, it promotes muscle repair and gut health—studies show greater strength gains when post-workout yogurt is included',
        source: 'Yogurt in Nutrition'
      },
      {
        name: 'Chicken Breast',
        description: 'A lean protein source rich in essential amino acids (especially leucine) that power muscle protein synthesis and help rebuild tissue after intense exercise',
        source: 'DHW Blog'
      },
      {
        name: 'Sweet Potato',
        description: 'Complex carbohydrates replenish glycogen stores while copper and other micronutrients support energy metabolism, tendon health and overall recovery',
        source: 'Gym and Fitness'
      }
    ]
  },
  Swim: {
    Before: [
      {
        name: 'Banana',
        description: 'Provides easily digestible carbohydrates and potassium to fuel working muscles, maintain electrolyte balance, and help prevent cramping during exercise',
        source: 'Healthline'
      },
      {
        name: 'Granola',
        description: 'A balanced mix of complex carbs, protein, and healthy fats that provides sustained energy for swimming without causing digestive discomfort',
        source: 'Swimming World'
      },
      {
        name: 'Rice Cakes',
        description: 'Light, easily digestible carbohydrates that provide quick energy without weighing you down in the water',
        source: 'SwimSwam'
      },
      {
        name: 'Fruit Smoothie',
        description: 'Combines quick-digesting fruits with protein for a balanced pre-swim meal that\'s easy on the stomach',
        source: 'Swimming Science'
      }
    ],
    During: [
      {
        name: 'Sports Drink',
        description: 'Replenishes fluids, glucose and electrolytes (sodium, potassium, magnesium, calcium) lost in sweat, helping sustain hydration and endurance',
        source: 'The Nutrition Source'
      },
      {
        name: 'Water',
        description: 'Essential for keeping blood volume up, regulating body temperature, and preventing dehydration-related cramps or fatigue',
        source: 'University of Michigan Medical School'
      },
      {
        name: 'Electrolyte Tablets',
        description: 'Supply key minerals (sodium, potassium, calcium, magnesium) lost through sweat, supporting nerve impulses, muscle contractions and optimal fluid uptake',
        source: 'Ohio State Health'
      }
    ],
    After: [
      {
        name: 'Protein Shake',
        description: 'Offers fast-absorbing, high-quality protein to repair microtears in muscle fibers and support recovery; total daily protein intake is the main driver of muscle rebuild',
        source: 'Healthline'
      },
      {
        name: 'Tuna Salad',
        description: 'Rich in omega-3 fatty acids and protein, supporting muscle recovery and reducing inflammation after intense swimming',
        source: 'Swimming World'
      },
      {
        name: 'Quinoa Bowl',
        description: 'Complete protein source with complex carbs to replenish glycogen stores and support muscle recovery',
        source: 'SwimSwam'
      },
      {
        name: 'Avocado Toast',
        description: 'Healthy fats and complex carbs help restore energy levels and support muscle recovery after swimming',
        source: 'Swimming Science'
      }
    ]
  },
  Bike: {
    Before: [
      {
        name: 'Oatmeal',
        description: 'A complex-carb source that releases energy slowly, avoiding blood-sugar spikes and delivering sustained fuel without GI discomfort',
        source: 'Oats Overnight'
      },
      {
        name: 'Energy Bar',
        description: 'Combines carbohydrates for energy plus protein to kick-start muscle repair—portable and balanced to power you through your warm-up and early miles',
        source: 'QNT Sport'
      },
      {
        name: 'Banana',
        description: 'Provides easily digestible carbohydrates and potassium to fuel working muscles, maintain electrolyte balance, and help prevent cramping during exercise',
        source: 'Healthline'
      },
      {
        name: 'Peanut Butter Toast',
        description: 'Combines complex carbs with healthy fats and protein for sustained energy during long rides',
        source: 'Cycling Weekly'
      }
    ],
    During: [
      {
        name: 'Sports Drink',
        description: 'Replenishes fluids, glucose and electrolytes (sodium, potassium, magnesium, calcium) lost in sweat, helping sustain hydration and endurance',
        source: 'The Nutrition Source'
      },
      {
        name: 'Energy Gel',
        description: 'Delivers a concentrated hit of carbohydrates when you need to maintain blood sugar and push through fatigue—best sipped with water to aid absorption',
        source: 'Runners Need'
      },
      {
        name: 'Water',
        description: 'Essential for keeping blood volume up, regulating body temperature, and preventing dehydration-related cramps or fatigue',
        source: 'University of Michigan Medical School'
      },
      {
        name: 'Trail Mix',
        description: 'Portable mix of nuts, dried fruits, and seeds provides a balance of quick and slow-release energy for long rides',
        source: 'Cycling Weekly'
      }
    ],
    After: [
      {
        name: 'Protein Shake',
        description: 'Offers fast-absorbing, high-quality protein to repair microtears in muscle fibers and support recovery; total daily protein intake is the main driver of muscle rebuild',
        source: 'Healthline'
      },
      {
        name: 'Chicken Wrap',
        description: 'Lean protein and complex carbs help rebuild muscles and restore glycogen stores after cycling',
        source: 'Cycling Weekly'
      },
      {
        name: 'Sweet Potato',
        description: 'Complex carbohydrates replenish glycogen stores while copper and other micronutrients support energy metabolism, tendon health and overall recovery',
        source: 'Gym and Fitness'
      },
      {
        name: 'Greek Yogurt',
        description: 'Packed with protein plus live cultures, it promotes muscle repair and gut health—studies show greater strength gains when post-workout yogurt is included',
        source: 'Yogurt in Nutrition'
      }
    ]
  }
};

export default function ExerciseRecommendations({ route }: Props) {
  const { type } = route.params;
  const { colors } = useTheme();
  const tips = FOOD_TIPS[type];
  const insets = useSafeAreaInsets();
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView 
        contentContainerStyle={{ 
          padding: 16, 
          paddingTop: insets.top + 16,
          paddingBottom: 32,
        }}
      >
        {(['Before', 'During', 'After'] as const).map(stage => {
          const { icon, color } = STAGE_CONFIG[stage];
          return (
            <Card 
              key={stage} 
              style={{
                marginBottom: 16,
                borderRadius: 12,
                padding: 12,
                backgroundColor: color,
              }}
            >
              <View style={styles.header}>
                <Icon name={icon} size={24} color={colors.text} />
                <Text style={[styles.headerText, { color: colors.text }]}>
                  {stage} {type}
                </Text>
              </View>
              <View style={styles.chipRow}>
                {tips[stage].map(item => (
                  <Chip
                    key={item.name}
                    label={item.name}
                    selected={false}
                    onPress={() => setSelectedItem(item)}
                  />
                ))}
              </View>
            </Card>
          );
        })}
      </ScrollView>

      <Modal
        visible={selectedItem !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedItem(null)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setSelectedItem(null)}
        >
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {selectedItem?.name}
            </Text>
            <Text style={[styles.modalDescription, { color: colors.text }]}>
              {selectedItem?.description}
            </Text>
            <Text style={[styles.modalSource, { color: colors.text }]}>
              Source: {selectedItem?.source}
            </Text>
          </View>
        </Pressable>
      </Modal>
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
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
  },
  modalDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  modalSource: {
    fontSize: 14,
    fontStyle: 'italic',
    opacity: 0.7,
  },
}); 