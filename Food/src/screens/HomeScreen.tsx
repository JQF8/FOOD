import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Pressable } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { MoodToFood } from '../components/MoodToFood';
import { FeelingButton } from '../components/FeelingButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { saveMood } from '../storage/moodStorage';
import { Mood } from '../types/mood';
import dayjs from 'dayjs';
import { useProfile } from '../hooks/useProfile';
import { getPartOfDay } from '../utils/timeUtils';
import NoteSheet, { NoteSheetHandle } from '../components/NoteSheet';
import InsightsCarousel from '../components/InsightsCarousel';
import SectionTitle from '../components/SectionTitle';
import Card from '../components/Card';
import { Icon } from '../components/Icon';
import { ResearchInsights } from '../components/ResearchInsights';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const { colors, theme, toggleTheme } = useTheme();
  const [showMoodToFood, setShowMoodToFood] = useState(false);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { profile } = useProfile();
  const noteSheetRef = useRef<NoteSheetHandle>(null);
  const partOfDay = getPartOfDay();

  const onMoodPress = (mood: Mood) => {
    noteSheetRef.current?.open(mood);
  };

  const quickActions = [
    {
      title: 'Track Meal',
      icon: 'food',
      onPress: () => navigation.navigate('TrackMeal'),
    },
    {
      title: 'Water Intake',
      icon: 'water',
      onPress: () => navigation.navigate('WaterScreen'),
    },
    {
      title: 'Exercise',
      icon: 'dumbbell',
      onPress: () => navigation.navigate('ExerciseOptions'),
    },
    {
      title: 'Sleep',
      icon: 'sleep',
      onPress: () => navigation.navigate('SleepOptions'),
    },
  ];

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
                  marginBottom: 8,
                }}
              >
                {profile.fullName.trim()}
              </Text>
            ) : (
              <View style={{ marginBottom: 8 }}/>
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

        <View style={styles.moodSection}>
          <Text style={[styles.moodTitle, { color: colors.text }]}>How are you feeling?</Text>
          <View style={styles.moodContainer}>
            <FeelingButton 
              mood="happy" 
              label="Happy" 
              onPress={() => onMoodPress('happy')} 
              style={styles.moodButton}
            />
            <FeelingButton 
              mood="soso" 
              label="So-so" 
              onPress={() => onMoodPress('soso')} 
              style={styles.moodButton}
            />
            <FeelingButton 
              mood="stressed" 
              label="Stressed" 
              onPress={() => onMoodPress('stressed')} 
              style={styles.moodButton}
            />
            <FeelingButton 
              mood="tired" 
              label="Tired" 
              onPress={() => onMoodPress('tired')} 
              style={styles.moodButton}
            />
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
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.quickActionButton, { backgroundColor: colors.card }]}
                onPress={action.onPress}
              >
                <Icon name={action.icon} size={24} color={colors.primary} />
                <Text style={[styles.quickActionText, { color: colors.text }]}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Card>
            <ResearchInsights />
          </Card>
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
    marginBottom: 16,
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
  moodSection: {
    padding: 20,
    paddingBottom: 8,
    marginBottom: 16,
  },
  moodTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  moodButton: {
    minWidth: 72,
    width: '22%',
  },
  section: {
    padding: 20,
    paddingTop: 8,
    paddingBottom: 8,
    marginBottom: 16,
  },
  calendarLink: {
    padding: 5,
  },
  calendarLinkText: {
    fontSize: 14,
    fontWeight: '500',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  quickActionButton: {
    width: '48%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  quickActionText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  moodToFoodContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
});

export default HomeScreen; 