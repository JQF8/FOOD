import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

type TestQuestion = {
  id: number;
  question: string;
  options: {
    value: number;
    label: string;
  }[];
  category: 'stress' | 'sleep' | 'energy' | 'mood' | 'anxiety' | 'focus';
};

const mentalHealthTest: TestQuestion[] = [
  {
    id: 1,
    question: "How would you rate your stress level today?",
    options: [
      { value: 1, label: "Very Low" },
      { value: 2, label: "Low" },
      { value: 3, label: "Moderate" },
      { value: 4, label: "High" },
      { value: 5, label: "Very High" }
    ],
    category: 'stress'
  },
  {
    id: 2,
    question: "How well did you sleep last night?",
    options: [
      { value: 1, label: "Very Poor" },
      { value: 2, label: "Poor" },
      { value: 3, label: "Average" },
      { value: 4, label: "Good" },
      { value: 5, label: "Excellent" }
    ],
    category: 'sleep'
  },
  {
    id: 3,
    question: "How is your energy level today?",
    options: [
      { value: 1, label: "Very Low" },
      { value: 2, label: "Low" },
      { value: 3, label: "Moderate" },
      { value: 4, label: "High" },
      { value: 5, label: "Very High" }
    ],
    category: 'energy'
  },
  {
    id: 4,
    question: "How would you rate your mood today?",
    options: [
      { value: 1, label: "Very Low" },
      { value: 2, label: "Low" },
      { value: 3, label: "Moderate" },
      { value: 4, label: "Good" },
      { value: 5, label: "Excellent" }
    ],
    category: 'mood'
  },
  {
    id: 5,
    question: "How anxious do you feel right now?",
    options: [
      { value: 1, label: "Not at all" },
      { value: 2, label: "Slightly" },
      { value: 3, label: "Moderately" },
      { value: 4, label: "Very" },
      { value: 5, label: "Extremely" }
    ],
    category: 'anxiety'
  },
  {
    id: 6,
    question: "How focused do you feel today?",
    options: [
      { value: 1, label: "Very Distracted" },
      { value: 2, label: "Somewhat Distracted" },
      { value: 3, label: "Neutral" },
      { value: 4, label: "Focused" },
      { value: 5, label: "Very Focused" }
    ],
    category: 'focus'
  }
];

type TestResult = {
  date: string;
  answers: number[];
  recommendations: any[];
};

export const MentalHealthTest: React.FC = () => {
  const { colors } = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [testHistory, setTestHistory] = useState<TestResult[]>([]);
  const fadeAnim = new Animated.Value(1);

  useEffect(() => {
    loadTestHistory();
  }, []);

  const loadTestHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('testHistory');
      if (history) {
        setTestHistory(JSON.parse(history));
      }
    } catch (error) {
      console.error('Error loading test history:', error);
    }
  };

  const saveTestResult = async (recommendations: any[]) => {
    try {
      const newResult: TestResult = {
        date: new Date().toISOString(),
        answers,
        recommendations,
      };
      const updatedHistory = [newResult, ...testHistory];
      await AsyncStorage.setItem('testHistory', JSON.stringify(updatedHistory));
      setTestHistory(updatedHistory);
    } catch (error) {
      console.error('Error saving test result:', error);
    }
  };

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);

    if (currentQuestion < mentalHealthTest.length - 1) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setCurrentQuestion(currentQuestion + 1);
      });
    } else {
      const recommendations = getRecommendations();
      saveTestResult(recommendations);
      setShowResults(true);
    }
  };

  const getRecommendations = () => {
    const categoryScores = {
      stress: answers[0],
      sleep: answers[1],
      energy: answers[2],
      mood: answers[3],
      anxiety: answers[4],
      focus: answers[5],
    };

    let recommendations = [];

    if (categoryScores.stress >= 4) {
      recommendations.push({
        title: "Stress Management",
        foods: [
          {
            name: "Dark Chocolate",
            benefits: "Contains flavonoids that reduce stress hormones",
            serving: "1-2 squares (30g)",
            timing: "Morning or afternoon"
          },
          {
            name: "Green Tea",
            benefits: "L-theanine promotes calmness and reduces stress",
            serving: "1 cup",
            timing: "Throughout the day"
          },
          {
            name: "Blueberries",
            benefits: "Rich in antioxidants that combat stress",
            serving: "1 cup",
            timing: "Morning or as a snack"
          }
        ],
        reason: "High stress levels detected. These foods help reduce cortisol and promote relaxation."
      });
    }

    if (categoryScores.sleep <= 2) {
      recommendations.push({
        title: "Sleep Support",
        foods: [
          {
            name: "Chamomile Tea",
            benefits: "Natural sedative properties",
            serving: "1 cup",
            timing: "30 minutes before bed"
          },
          {
            name: "Almonds",
            benefits: "Contains magnesium and melatonin",
            serving: "1 handful (28g)",
            timing: "Evening snack"
          },
          {
            name: "Bananas",
            benefits: "Rich in potassium and tryptophan",
            serving: "1 medium",
            timing: "1 hour before bed"
          }
        ],
        reason: "Poor sleep quality detected. These foods contain sleep-promoting compounds."
      });
    }

    if (categoryScores.energy <= 2) {
      recommendations.push({
        title: "Energy Boost",
        foods: [
          {
            name: "Quinoa",
            benefits: "Complete protein with complex carbs",
            serving: "1 cup cooked",
            timing: "Lunch or dinner"
          },
          {
            name: "Sweet Potatoes",
            benefits: "Slow-release energy from complex carbs",
            serving: "1 medium",
            timing: "Lunch or dinner"
          },
          {
            name: "Greek Yogurt",
            benefits: "Protein and probiotics for sustained energy",
            serving: "1 cup",
            timing: "Breakfast or snack"
          }
        ],
        reason: "Low energy levels detected. These foods provide sustained energy release."
      });
    }

    if (categoryScores.mood <= 2) {
      recommendations.push({
        title: "Mood Enhancement",
        foods: [
          {
            name: "Salmon",
            benefits: "Rich in omega-3 fatty acids",
            serving: "4-6 oz",
            timing: "Lunch or dinner"
          },
          {
            name: "Dark Leafy Greens",
            benefits: "High in folate and magnesium",
            serving: "2 cups",
            timing: "Lunch or dinner"
          },
          {
            name: "Avocados",
            benefits: "Healthy fats and B vitamins",
            serving: "1/2 medium",
            timing: "Any meal"
          }
        ],
        reason: "Low mood detected. These foods support brain health and mood regulation."
      });
    }

    if (categoryScores.anxiety >= 4) {
      recommendations.push({
        title: "Anxiety Relief",
        foods: [
          {
            name: "Oatmeal",
            benefits: "Complex carbs that increase serotonin",
            serving: "1 cup cooked",
            timing: "Breakfast"
          },
          {
            name: "Turmeric",
            benefits: "Anti-inflammatory properties",
            serving: "1/4 tsp",
            timing: "With meals"
          },
          {
            name: "Pumpkin Seeds",
            benefits: "Rich in magnesium and zinc",
            serving: "1/4 cup",
            timing: "Snack"
          }
        ],
        reason: "High anxiety levels detected. These foods help calm the nervous system."
      });
    }

    if (categoryScores.focus <= 2) {
      recommendations.push({
        title: "Focus Enhancement",
        foods: [
          {
            name: "Blueberries",
            benefits: "Improves memory and concentration",
            serving: "1 cup",
            timing: "Morning or snack"
          },
          {
            name: "Walnuts",
            benefits: "Omega-3 fatty acids for brain function",
            serving: "1/4 cup",
            timing: "Snack"
          },
          {
            name: "Green Tea",
            benefits: "L-theanine and caffeine for focus",
            serving: "1 cup",
            timing: "Morning or early afternoon"
          }
        ],
        reason: "Low focus detected. These foods support cognitive function and concentration."
      });
    }

    return recommendations;
  };

  const renderHistoryItem = (result: TestResult, index: number) => {
    const date = new Date(result.date);
    return (
      <View key={index} style={[styles.historyCard, { backgroundColor: colors.card }]}>
        <Text style={[styles.historyDate, { color: colors.text }]}>
          {date.toLocaleDateString()}
        </Text>
        <View style={styles.historyScores}>
          {mentalHealthTest.map((question, qIndex) => (
            <View key={qIndex} style={styles.scoreItem}>
              <Text style={[styles.scoreLabel, { color: colors.text }]}>
                {question.category}
              </Text>
              <View style={[styles.scoreBar, { backgroundColor: colors.border }]}>
                <View
                  style={[
                    styles.scoreFill,
                    {
                      width: `${(result.answers[qIndex] / 5) * 100}%`,
                      backgroundColor: colors.primary,
                    },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  if (showHistory) {
    return (
      <View style={styles.testContainer}>
        <View style={styles.historyHeader}>
          <Text style={[styles.testTitle, { color: colors.text }]}>Test History</Text>
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: colors.primary }]}
            onPress={() => setShowHistory(false)}
          >
            <Text style={styles.backButtonText}>Back to Test</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.historyContainer}>
          {testHistory.map(renderHistoryItem)}
        </ScrollView>
      </View>
    );
  }

  if (showResults) {
    const recommendations = getRecommendations();
    return (
      <View style={styles.testContainer}>
        <Text style={[styles.testTitle, { color: colors.text }]}>Your Personalized Recommendations</Text>
        <ScrollView style={styles.recommendationsContainer}>
          {recommendations.map((rec, index) => (
            <View key={index} style={[styles.recommendationCard, { backgroundColor: colors.card }]}>
              <Text style={[styles.recommendationTitle, { color: colors.text }]}>{rec.title}</Text>
              <Text style={[styles.recommendationReason, { color: colors.text }]}>{rec.reason}</Text>
              <View style={styles.foodList}>
                {rec.foods.map((food, foodIndex) => (
                  <View key={foodIndex} style={styles.foodItem}>
                    <Icon name="food" size={20} color={colors.primary} />
                    <View style={styles.foodDetails}>
                      <Text style={[styles.foodName, { color: colors.text }]}>{food.name}</Text>
                      <Text style={[styles.foodBenefit, { color: colors.text }]}>{food.benefits}</Text>
                      <Text style={[styles.foodServing, { color: colors.text }]}>
                        Serving: {food.serving} | Best time: {food.timing}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.resultButtons}>
          <TouchableOpacity
            style={[styles.historyButton, { backgroundColor: colors.card }]}
            onPress={() => setShowHistory(true)}
          >
            <Icon name="history" size={20} color={colors.primary} />
            <Text style={[styles.historyButtonText, { color: colors.primary }]}>View History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.restartButton, { backgroundColor: colors.primary }]}
            onPress={() => {
              setCurrentQuestion(0);
              setAnswers([]);
              setShowResults(false);
            }}
          >
            <Text style={styles.restartButtonText}>Take Test Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <Animated.View style={[styles.testContainer, { opacity: fadeAnim }]}>
      <Text style={[styles.testTitle, { color: colors.text }]}>Mental Health Check</Text>
      <Text style={[styles.questionText, { color: colors.text }]}>
        {mentalHealthTest[currentQuestion].question}
      </Text>
      <View style={styles.optionsContainer}>
        {mentalHealthTest[currentQuestion].options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.optionButton,
              { backgroundColor: colors.card },
              answers[currentQuestion] === option.value && { borderColor: colors.primary, borderWidth: 2 }
            ]}
            onPress={() => handleAnswer(option.value)}
          >
            <Text style={[styles.optionText, { color: colors.text }]}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.progressContainer}>
        <Text style={[styles.progressText, { color: colors.text }]}>
          Question {currentQuestion + 1} of {mentalHealthTest.length}
        </Text>
        <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${((currentQuestion + 1) / mentalHealthTest.length) * 100}%`,
                backgroundColor: colors.primary,
              },
            ]}
          />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  testContainer: {
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },
  testTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 10,
  },
  optionButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
  },
  progressContainer: {
    marginTop: 20,
  },
  progressText: {
    textAlign: 'center',
    marginBottom: 10,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  recommendationsContainer: {
    maxHeight: 400,
  },
  recommendationCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recommendationReason: {
    fontSize: 14,
    marginBottom: 10,
    opacity: 0.8,
  },
  foodList: {
    gap: 8,
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  foodDetails: {
    flex: 1,
    marginLeft: 8,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '600',
  },
  foodBenefit: {
    fontSize: 14,
    opacity: 0.8,
    marginTop: 2,
  },
  foodServing: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 2,
  },
  resultButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
  },
  historyButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    gap: 8,
  },
  historyButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  restartButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  restartButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  historyContainer: {
    maxHeight: 400,
  },
  historyCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  historyDate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  historyScores: {
    gap: 8,
  },
  scoreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  scoreLabel: {
    width: 80,
    fontSize: 12,
  },
  scoreBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  scoreFill: {
    height: '100%',
  },
}); 