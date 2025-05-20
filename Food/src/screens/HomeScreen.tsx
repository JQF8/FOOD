import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../context/ThemeContext';
import { MoodToFood } from '../components/MoodToFood';
import { FeelingButton } from '../components/FeelingButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const { colors, theme, toggleTheme } = useTheme();
  const [showMoodToFood, setShowMoodToFood] = useState(false);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: colors.text }]}>Good Morning</Text>
            <Text style={[styles.subtitle, { color: colors.text }]}>Let's check your mood today</Text>
          </View>
          <View style={styles.headerButtons}>
            <TouchableOpacity 
              style={[styles.headerButton, { backgroundColor: colors.card }]}
              onPress={toggleTheme}
            >
              <Icon 
                name={theme === 'dark' ? 'white-balance-sunny' : 'moon-waning-crescent'} 
                size={24} 
                color={colors.primary} 
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.headerButton, { backgroundColor: colors.card }]}
            >
              <Icon name="bell-outline" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>How are you feeling?</Text>
          <View style={styles.moodContainer}>
            <FeelingButton mood="happy" label="Happy" />
            <FeelingButton mood="soso" label="So-so" />
            <FeelingButton mood="stress_anxiety" label="Stressed" />
            <FeelingButton mood="tired" label="Tired" />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.card }]}
              onPress={() => setShowMoodToFood(true)}
            >
              <Icon name="food-apple" size={24} color={colors.primary} />
              <Text style={[styles.actionText, { color: colors.text }]}>Track Meal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.card }]}>
              <Icon name="water" size={24} color={colors.primary} />
              <Text style={[styles.actionText, { color: colors.text }]}>Water Intake</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.card }]}>
              <Icon name="run" size={24} color={colors.primary} />
              <Text style={[styles.actionText, { color: colors.text }]}>Exercise</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.card }]}>
              <Icon name="power-sleep" size={24} color={colors.primary} />
              <Text style={[styles.actionText, { color: colors.text }]}>Sleep</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: colors.card }]}
              onPress={() => navigation.navigate('IncreaseEating')}
            >
              <Icon name="food-variant" size={24} color={colors.primary} />
              <Text style={[styles.actionText, { color: colors.text }]}>Gain</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.summaryContainer}>
            <View style={[styles.summaryCard, { backgroundColor: colors.card }]}>
              <Icon name="food-apple" size={24} color={colors.primary} />
              <Text style={[styles.summaryValue, { color: colors.text }]}>1,200</Text>
              <Text style={[styles.summaryLabel, { color: colors.text }]}>Calories</Text>
            </View>
            <View style={[styles.summaryCard, { backgroundColor: colors.card }]}>
              <Icon name="water" size={24} color={colors.primary} />
              <Text style={[styles.summaryValue, { color: colors.text }]}>4/8</Text>
              <Text style={[styles.summaryLabel, { color: colors.text }]}>Water</Text>
            </View>
            <View style={[styles.summaryCard, { backgroundColor: colors.card }]}>
              <Icon name="run" size={24} color={colors.primary} />
              <Text style={[styles.summaryValue, { color: colors.text }]}>30m</Text>
              <Text style={[styles.summaryLabel, { color: colors.text }]}>Exercise</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Testing Section</Text>
          <View style={[styles.testingContainer, { backgroundColor: colors.card }]}>
            <View style={styles.testingHeader}>
              <Icon name="test-tube" size={24} color={colors.primary} />
              <Text style={[styles.testingTitle, { color: colors.text }]}>Health Assessment</Text>
            </View>
            <View style={styles.testingContent}>
              <TouchableOpacity style={[styles.testingButton, { backgroundColor: colors.primary }]}>
                <Icon name="heart-pulse" size={24} color="#FFFFFF" />
                <Text style={styles.testingButtonText}>Start Health Test</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.testingButton, { backgroundColor: colors.primary }]}>
                <Icon name="food-apple" size={24} color="#FFFFFF" />
                <Text style={styles.testingButtonText}>Nutrition Analysis</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {showMoodToFood && (
          <View style={styles.moodToFoodContainer}>
            <MoodToFood />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  headerButton: {
    padding: 8,
    borderRadius: 12,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  moodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 10,
  },
  actionButton: {
    width: '48%',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  actionText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  summaryCard: {
    flex: 1,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  summaryLabel: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 4,
  },
  moodToFoodContainer: {
    marginTop: 20,
  },
  testingContainer: {
    borderRadius: 15,
    padding: 20,
    marginTop: 10,
  },
  testingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  testingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  testingContent: {
    gap: 15,
  },
  testingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
  },
  testingButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
});

export default HomeScreen; 