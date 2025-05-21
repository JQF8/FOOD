import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Alert, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../context/ThemeContext';
import { MoodToFood } from '../components/MoodToFood';
import { FeelingButton } from '../components/FeelingButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { saveMood, normMood } from '../storage/moodStorage';
import { Mood } from '../types/mood';
import dayjs from 'dayjs';
import { useProfile } from '../hooks/useProfile';
import { getPartOfDay } from '../utils/timeUtils';
import NoteSheet, { NoteSheetHandle } from '../components/NoteSheet';
import InsightsCarousel from '../components/InsightsCarousel';
import SectionTitle from '../components/SectionTitle';
import Card from '../components/Card';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const { colors, theme, toggleTheme } = useTheme();
  const [showMoodToFood, setShowMoodToFood] = useState(false);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { profile } = useProfile();
  const noteSheetRef = useRef<NoteSheetHandle>(null);
  const partOfDay = getPartOfDay();          // Morning / Afternoon / Evening

  const onMoodPress = (mood: Mood) => {
    noteSheetRef.current?.open(mood);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View>
            <Text
              style={{
                fontSize: 28,
                fontWeight: '700',
                color: colors.text,
              }}
            >
              {`Good ${partOfDay},`}
            </Text>

            {profile.fullName?.trim().length ? (
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '500',
                  color: colors.text,
                  marginBottom: 8,   // gap before subtitle
                }}
              >
                {profile.fullName.trim()}
              </Text>
            ) : (
              <View style={{ marginBottom: 8 }}/>   // same gap even w/out name
            )}

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
          <SectionTitle label="How are you feeling?" />
          <View style={styles.moodContainer}>
            <FeelingButton mood="happy" label="Happy" onPress={() => onMoodPress('happy')} />
            <FeelingButton mood="soso" label="So-so" onPress={() => onMoodPress('soso')} />
            <FeelingButton mood="stressed" label="Stressed" onPress={() => onMoodPress('stressed')} />
            <FeelingButton mood="tired" label="Tired" onPress={() => onMoodPress('tired')} />
          </View>
        </View>

        <View style={styles.section}>
          <SectionTitle 
            label="Quick Actions"
            rightContent={
              <TouchableOpacity 
                onPress={() => navigation.navigate('MoodCalendar')}
                style={styles.calendarLink}
              >
                <Text style={[styles.calendarLinkText, { color: colors.primary }]}>
                  View Mood Calendar
                </Text>
              </TouchableOpacity>
            }
          />
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
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: colors.card }]}
              onPress={() => navigation.navigate('ExerciseOptions')}
            >
              <Icon name="run" size={24} color={colors.primary} />
              <Text style={[styles.actionText, { color: colors.text }]}>Exercise</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: colors.card }]}
              onPress={() => navigation.navigate('SleepOptions')}
            >
              <Icon name="moon-waning-crescent" size={24} color={colors.primary} />
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

          <SectionTitle label="Wealth Summary" />
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

        {showMoodToFood && (
          <View style={styles.moodToFoodContainer}>
            <MoodToFood />
          </View>
        )}

        <View style={styles.section}>
          <SectionTitle 
            label="Food & Mood Insights"
            rightContent={
              <Pressable onPress={() => navigation.navigate('InsightsFeed')}>
                <Text style={[styles.seeAllText, { color: colors.primary }]}>
                  See all ›
                </Text>
              </Pressable>
            }
          />
          <InsightsCarousel />
        </View>
      </ScrollView>
      <NoteSheet
        ref={noteSheetRef}
        onSave={async (mood, note) => {
          const today = dayjs().format('YYYY-MM-DD');
          await saveMood(today, mood, note);
          navigation.navigate('MoodCalendar', { initialDate: today });
        }}
      />
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
  calendarLink: {
    padding: 5,
  },
  calendarLinkText: {
    fontSize: 14,
    fontWeight: '500',
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
  seeAllText: {
    fontSize: 14,
    fontWeight: '500',
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HomeScreen; 