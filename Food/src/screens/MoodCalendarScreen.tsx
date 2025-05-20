import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useTheme } from '../context/ThemeContext';
import { useMood } from '../context/MoodContext';
import { moodColor } from '../constants/moodColor';

export const MoodCalendarScreen = () => {
  console.log('[MoodCalendarScreen] Rendering');
  const { colors } = useTheme();
  const { moods, isInitialized } = useMood();

  console.log('[MoodCalendarScreen] Current moods:', moods);

  if (!isInitialized) {
    console.log('[MoodCalendarScreen] Context not initialized, showing loading state');
    return (
      <View style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const markedDates = Object.entries(moods).reduce((acc, [date, mood]) => {
    console.log('[MoodCalendarScreen] Processing date:', date, 'mood:', mood);
    return {
      ...acc,
      [date]: {
        marked: true,
        dotColor: moodColor[mood],
      },
    };
  }, {});

  console.log('[MoodCalendarScreen] Marked dates:', markedDates);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Calendar
        theme={{
          backgroundColor: colors.background,
          calendarBackground: colors.background,
          textSectionTitleColor: colors.text,
          selectedDayBackgroundColor: colors.primary,
          selectedDayTextColor: '#ffffff',
          todayTextColor: colors.primary,
          dayTextColor: colors.text,
          textDisabledColor: colors.text + '80',
          dotColor: colors.primary,
          selectedDotColor: '#ffffff',
          arrowColor: colors.primary,
          monthTextColor: colors.text,
          indicatorColor: colors.primary,
        }}
        markedDates={markedDates}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
}); 