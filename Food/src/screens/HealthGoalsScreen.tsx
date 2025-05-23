import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Platform,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '../components/Icon';
import { useProfile } from '../hooks/useProfile';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';

interface GoalCard {
  id: string;
  title: string;
  icon: string;
}

const PRIMARY_GOALS: GoalCard[] = [
  { id: 'sleep', title: 'Improve Sleep Quality', icon: 'sleep' },
  { id: 'stress', title: 'Reduce Stress & Depression', icon: 'emoticon-happy' },
  { id: 'exercise', title: 'Boost Exercise Performance', icon: 'run' },
  { id: 'hydration', title: 'Increase Hydration', icon: 'water' },
  { id: 'nutrition', title: 'Optimize Nutrition', icon: 'food-apple' },
];

const DIETARY_RESTRICTIONS = [
  'Vegan',
  'Vegetarian',
  'Keto',
  'Gluten-free',
  'Dairy-free',
  'Paleo',
  'Mediterranean',
];

const HealthGoalsScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { profile, updateProfile } = useProfile();
  
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [goalData, setGoalData] = useState({
    sleep: {
      currentHours: 6,
      targetHours: 8,
      currentQuality: 6,
      targetQuality: 8,
    },
    stress: {
      currentLevel: 7,
      targetLevel: 4,
      mindfulnessDays: 3,
    },
    exercise: {
      currentWorkouts: 2,
      targetWorkouts: 4,
      workoutLength: 30,
    },
    hydration: {
      currentGlasses: 4,
      targetGlasses: 8,
    },
    nutrition: {
      targetCalories: 2000,
      restrictions: [] as string[],
    },
  });

  const handleSave = async () => {
    await updateProfile({ 
      healthGoals: {
        primaryGoal: selectedGoal,
        ...goalData[selectedGoal as keyof typeof goalData],
      }
    });
    navigation.goBack();
  };

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const renderGoalCard = (goal: GoalCard) => (
    <TouchableOpacity
      key={goal.id}
      style={[
        styles.goalCard,
        { backgroundColor: colors.card },
        selectedGoal === goal.id && styles.selectedGoalCard,
      ]}
      onPress={() => handleGoalSelect(goal.id)}
    >
      <Icon name={goal.icon} size={32} color={colors.primary} />
      <Text style={[styles.goalCardTitle, { color: colors.text }]}>{goal.title}</Text>
    </TouchableOpacity>
  );

  const renderSleepQuestions = () => (
    <Animated.View style={[styles.questionsContainer, { opacity: fadeAnim }]}>
      <View style={[styles.questionCard, { backgroundColor: colors.card }]}>
        <Text style={[styles.questionLabel, { color: colors.text }]}>Current sleep duration</Text>
        <View style={styles.stepperContainer}>
          <TouchableOpacity onPress={() => setGoalData(prev => ({
            ...prev,
            sleep: { ...prev.sleep, currentHours: Math.max(0, prev.sleep.currentHours - 1) }
          }))}>
            <Icon name="minus" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[styles.stepperValue, { color: colors.text }]}>{goalData.sleep.currentHours}h</Text>
          <TouchableOpacity onPress={() => setGoalData(prev => ({
            ...prev,
            sleep: { ...prev.sleep, currentHours: Math.min(12, prev.sleep.currentHours + 1) }
          }))}>
            <Icon name="plus" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.questionCard, { backgroundColor: colors.card }]}>
        <Text style={[styles.questionLabel, { color: colors.text }]}>Target sleep duration</Text>
        <View style={styles.stepperContainer}>
          <TouchableOpacity onPress={() => setGoalData(prev => ({
            ...prev,
            sleep: { ...prev.sleep, targetHours: Math.max(0, prev.sleep.targetHours - 1) }
          }))}>
            <Icon name="minus" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={[styles.stepperValue, { color: colors.text }]}>{goalData.sleep.targetHours}h</Text>
          <TouchableOpacity onPress={() => setGoalData(prev => ({
            ...prev,
            sleep: { ...prev.sleep, targetHours: Math.min(12, prev.sleep.targetHours + 1) }
          }))}>
            <Icon name="plus" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.questionCard, { backgroundColor: colors.card }]}>
        <Text style={[styles.questionLabel, { color: colors.text }]}>Current sleep quality</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={goalData.sleep.currentQuality}
          onValueChange={(value: number) => setGoalData(prev => ({
            ...prev,
            sleep: { ...prev.sleep, currentQuality: value }
          }))}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.border}
          thumbTintColor={colors.primary}
        />
        <Text style={[styles.sliderValue, { color: colors.text }]}>{goalData.sleep.currentQuality}/10</Text>
      </View>

      <View style={[styles.questionCard, { backgroundColor: colors.card }]}>
        <Text style={[styles.questionLabel, { color: colors.text }]}>Target sleep quality</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={goalData.sleep.targetQuality}
          onValueChange={(value: number) => setGoalData(prev => ({
            ...prev,
            sleep: { ...prev.sleep, targetQuality: value }
          }))}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.border}
          thumbTintColor={colors.primary}
        />
        <Text style={[styles.sliderValue, { color: colors.text }]}>{goalData.sleep.targetQuality}/10</Text>
      </View>
    </Animated.View>
  );

  const renderProgressPreview = () => {
    if (!selectedGoal) return null;

    const current = goalData[selectedGoal as keyof typeof goalData];
    let previewText = '';

    switch (selectedGoal) {
      case 'sleep':
        const sleepProgress = (goalData.sleep.currentHours / goalData.sleep.targetHours) * 100;
        previewText = `You're at ${goalData.sleep.currentHours}h sleep → Goal ${goalData.sleep.targetHours}h (${Math.round(sleepProgress)}%)`;
        break;
      case 'hydration':
        const hydrationProgress = (goalData.hydration.currentGlasses / goalData.hydration.targetGlasses) * 100;
        previewText = `You're at ${goalData.hydration.currentGlasses} glasses → Goal ${goalData.hydration.targetGlasses} glasses (${Math.round(hydrationProgress)}%)`;
        break;
      // Add other cases as needed
    }

    return (
      <View style={[styles.progressPreview, { backgroundColor: colors.card }]}>
        <Text style={[styles.progressText, { color: colors.text }]}>{previewText}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Health Goals</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={[styles.subtitle, { color: colors.text }]}>
          What's your top priority right now?
        </Text>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.goalsScrollView}
          contentContainerStyle={styles.goalsContainer}
        >
          {PRIMARY_GOALS.map(renderGoalCard)}
        </ScrollView>

        {renderProgressPreview()}

        {selectedGoal === 'sleep' && renderSleepQuestions()}
        {/* Add other goal-specific questions here */}
      </ScrollView>

      {selectedGoal && (
        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: colors.primary }]}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Set Goal</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
    padding: 16,
    paddingBottom: 8,
  },
  goalsScrollView: {
    marginBottom: 16,
  },
  goalsContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  goalCard: {
    width: 140,
    height: 120,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  selectedGoalCard: {
    borderWidth: 2,
    borderColor: '#007AFF',
    shadowColor: '#007AFF',
    shadowOpacity: 0.2,
  },
  goalCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
  },
  questionsContainer: {
    padding: 16,
  },
  questionCard: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  questionLabel: {
    fontSize: 16,
    marginBottom: 12,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepperValue: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 16,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderValue: {
    textAlign: 'center',
    marginTop: 8,
  },
  progressPreview: {
    margin: 16,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    fontWeight: '500',
  },
  saveButton: {
    height: 48,
    borderRadius: 8,
    margin: 20,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HealthGoalsScreen; 