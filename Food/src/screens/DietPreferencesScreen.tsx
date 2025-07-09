import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Chip } from '../components/Chip';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useProfile } from '../hooks/useProfile';
import { Icon as CustomIcon } from '../components/Icon';
import { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const DIET_STYLES = [
  'None',
  'Vegetarian',
  'Vegan',
  'Pescatarian',
  'Ketogenic',
  'Mediterranean',
  'Low-FODMAP',
  'Intermittent fasting',
];

const FOODS_TO_AVOID = [
  'Gluten',
  'Dairy',
  'Soy',
  'Added sugar',
  'Shellfish',
  'Red meat',
  'Caffeine',
  'Alcohol',
];

const CULTURAL_CONSTRAINTS = [
  'None',
  'Halal',
  'Kosher',
  'Hindu',
  'Buddhist',
  'Jain',
];

const DietPreferencesScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { profile, updateProfile } = useProfile();
  const [selectedDietStyle, setSelectedDietStyle] = useState('None');
  const [foodsToAvoid, setFoodsToAvoid] = useState<string[]>([]);
  const [dislikes, setDislikes] = useState<string[]>([]);
  const [cravings, setCravings] = useState<string[]>([]);
  const [calorieGoal, setCalorieGoal] = useState('');
  const [macroSplit, setMacroSplit] = useState({
    carbs: 40,
    protein: 30,
    fat: 30,
  });
  const [breakfastWindow, setBreakfastWindow] = useState({
    start: new Date(),
    end: new Date(),
  });
  const [dinnerCutoff, setDinnerCutoff] = useState(new Date());
  const [culturalConstraint, setCulturalConstraint] = useState('None');

  const handleSave = async () => {
    try {
      await updateProfile({
        dietStyle: selectedDietStyle,
        foodsToAvoid,
        dislikes,
        cravings,
        calorieGoal: calorieGoal ? parseInt(calorieGoal) : undefined,
        macroSplit,
        mealTiming: {
          breakfastWindow: {
            start: breakfastWindow.start.toISOString(),
            end: breakfastWindow.end.toISOString(),
          },
          dinnerCutoff: dinnerCutoff.toISOString(),
        },
        culturalConstraint,
      });
      navigation.goBack();
    } catch (error) {
      console.error('Error saving diet preferences:', error);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <Pressable 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.backButtonText, { color: colors.primary }]}>← Back</Text>
        </Pressable>
        <Text style={[styles.title, { color: colors.text }]}>Diet Preferences</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Overall Eating Style */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Overall Eating Style
            </Text>
            <View style={styles.dietStyles}>
              {DIET_STYLES.map((style) => (
                <Pressable
                  key={style}
                  style={[
                    styles.dietStyleButton,
                    {
                      backgroundColor: selectedDietStyle === style
                        ? colors.primary
                        : colors.card,
                    },
                  ]}
                  onPress={() => setSelectedDietStyle(style)}
                >
                  <Text
                    style={[
                      styles.dietStyleText,
                      {
                        color: selectedDietStyle === style
                          ? 'white'
                          : colors.text,
                      },
                    ]}
                  >
                    {style}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Foods to Avoid */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Foods to Avoid
            </Text>
            <View style={styles.chipContainer}>
              {FOODS_TO_AVOID.map((food) => (
                <Chip
                  key={food}
                  label={food}
                  selected={foodsToAvoid.includes(food)}
                  onPress={() => {
                    const newFoods = foodsToAvoid.includes(food)
                      ? foodsToAvoid.filter(f => f !== food)
                      : [...foodsToAvoid, food];
                    setFoodsToAvoid(newFoods);
                  }}
                />
              ))}
            </View>
          </View>

          {/* Dislikes & Cravings */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Dislikes & Cravings
            </Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: colors.card,
                color: colors.text,
                borderColor: colors.border,
              }]}
              placeholder="Foods you dislike (press enter to add)"
              placeholderTextColor={colors.text + '80'}
              onSubmitEditing={(e) => {
                const text = e.nativeEvent.text.trim();
                if (text && !dislikes.includes(text)) {
                  setDislikes([...dislikes, text]);
                }
                e.currentTarget.clear();
              }}
            />
            <View style={styles.chipContainer}>
              {dislikes.map((dislike) => (
                <Chip
                  key={dislike}
                  label={dislike}
                  selected={true}
                  onPress={() => {
                    setDislikes(dislikes.filter(d => d !== dislike));
                  }}
                />
              ))}
            </View>

            <TextInput
              style={[styles.input, { 
                backgroundColor: colors.card,
                color: colors.text,
                borderColor: colors.border,
                marginTop: 16,
              }]}
              placeholder="Comfort foods you crave when stressed (press enter to add)"
              placeholderTextColor={colors.text + '80'}
              onSubmitEditing={(e) => {
                const text = e.nativeEvent.text.trim();
                if (text && !cravings.includes(text)) {
                  setCravings([...cravings, text]);
                }
                e.currentTarget.clear();
              }}
            />
            <View style={styles.chipContainer}>
              {cravings.map((craving) => (
                <Chip
                  key={craving}
                  label={craving}
                  selected={true}
                  onPress={() => {
                    setCravings(cravings.filter(c => c !== craving));
                  }}
                />
              ))}
            </View>
          </View>

          {/* Macro & Calorie Targets */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Macro & Calorie Targets
            </Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: colors.card,
                color: colors.text,
                borderColor: colors.border,
              }]}
              placeholder="Daily calorie goal (optional)"
              placeholderTextColor={colors.text + '80'}
              keyboardType="numeric"
              value={calorieGoal}
              onChangeText={setCalorieGoal}
            />
            <View style={styles.macroContainer}>
              <Text style={[styles.macroLabel, { color: colors.text }]}>Carbs: {macroSplit.carbs}%</Text>
              <Text style={[styles.macroLabel, { color: colors.text }]}>Protein: {macroSplit.protein}%</Text>
              <Text style={[styles.macroLabel, { color: colors.text }]}>Fat: {macroSplit.fat}%</Text>
            </View>
          </View>

          {/* Meal Timing Preferences */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Meal Timing Preferences
            </Text>
            <View style={styles.timeContainer}>
              <Text style={[styles.timeLabel, { color: colors.text }]}>Breakfast window</Text>
              <DateTimePicker
                value={breakfastWindow.start}
                mode="time"
                display="default"
                onChange={(event, time) => {
                  if (time) setBreakfastWindow({ ...breakfastWindow, start: time });
                }}
              />
              <Text style={[styles.timeLabel, { color: colors.text }]}>to</Text>
              <DateTimePicker
                value={breakfastWindow.end}
                mode="time"
                display="default"
                onChange={(event, time) => {
                  if (time) setBreakfastWindow({ ...breakfastWindow, end: time });
                }}
              />
            </View>
            <View style={styles.timeContainer}>
              <Text style={[styles.timeLabel, { color: colors.text }]}>Dinner cutoff</Text>
              <DateTimePicker
                value={dinnerCutoff}
                mode="time"
                display="default"
                onChange={(event, time) => {
                  if (time) setDinnerCutoff(time);
                }}
              />
            </View>
          </View>

          {/* Cultural / Religious Constraints */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Cultural / Religious Constraints
            </Text>
            <View style={[styles.pickerContainer, { backgroundColor: colors.card }]}>
              <Picker
                selectedValue={culturalConstraint}
                onValueChange={setCulturalConstraint}
                style={{ color: colors.text }}
              >
                {CULTURAL_CONSTRAINTS.map((constraint) => (
                  <Picker.Item key={constraint} label={constraint} value={constraint} />
                ))}
              </Picker>
            </View>
          </View>
        </View>
      </ScrollView>

      <Pressable
        style={[styles.saveButton, { backgroundColor: colors.primary }]}
        onPress={handleSave}
      >
        <Text style={styles.saveButtonText}>Save Preferences</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  dietStyles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dietStyleButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  dietStyleText: {
    fontSize: 14,
    fontWeight: '500',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  macroContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  macroLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  timeLabel: {
    fontSize: 16,
    marginRight: 8,
  },
  pickerContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  saveButton: {
    margin: 20,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DietPreferencesScreen; 