import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, Alert, TouchableOpacity, Pressable } from 'react-native';
import { CalendarList, DateData } from 'react-native-calendars';
import { useTheme } from '../context/ThemeContext';
import { loadMoods, normMood } from '../storage/moodStorage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Mood } from '../types/mood';
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MOOD_EMOJI: Record<string, string> = {
  happy: '😊',
  soso: '😐',
  stressed: '😫',
  tired: '😴',
};

type Props = { route: { params?: { initialDate?: string } } };

interface CustomMarking {
  emoji?: string;
}

interface DayComponentProps {
  date?: DateData;
  state?: string;
}

export const MoodCalendarScreen = ({ route }: Props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [emojiMarks, setEmojiMarks] = useState<Record<string, CustomMarking>>({});
  const [entries, setEntries] = useState<Record<string, { mood: Mood; note?: string }>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(route.params?.initialDate ?? dayjs().format('YYYY-MM-DD'));
  const startDate = route.params?.initialDate;

  const loadMoodData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const loadedEntries = await loadMoods();
      setEntries(loadedEntries);
      
      const newMarks = Object.fromEntries(
        Object.entries(loadedEntries).map(([d, entry]) => {
          // Handle both old format (string) and new format (object)
          const mood = typeof entry === 'string' ? entry : entry.mood;
          return [d, { emoji: MOOD_EMOJI[normMood(mood)] }];
        })
      );
      setEmojiMarks(newMarks);
    } catch (error) {
      console.error('Error loading mood data:', error);
      setError('Failed to load mood data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadMoodData();
    }, [loadMoodData])
  );

  const handleDayPress = ({ dateString }: { dateString: string }) => {
    setSelectedDate(dateString);
    const entry = entries[dateString];
    if (entry?.note) {
      Alert.alert(
        dayjs(dateString).format('MMM D, YYYY'),
        entry.note,
        [{ text: 'OK' }]
      );
    }
  };

  const handleDayLongPress = ({ dateString }: { dateString: string }) => {
    const entry = entries[dateString];
    if (entry?.note) {
      Alert.alert(
        dayjs(dateString).format('MMM D, YYYY'),
        entry.note,
        [{ text: 'OK' }]
      );
    }
  };

  const renderHeader = () => (
    <View style={[styles.header, { backgroundColor: colors.card }]}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-left" size={24} color={colors.text} />
      </TouchableOpacity>
      <Text style={[styles.headerTitle, { color: colors.text }]}>Mood Calendar</Text>
      <View style={styles.headerRight} />
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        {renderHeader()}
        <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        {renderHeader()}
        <View style={[styles.errorContainer, { backgroundColor: colors.background }]}>
          <Text style={[styles.errorText, { color: colors.text }]}>{error}</Text>
          <TouchableOpacity 
            style={[styles.retryButton, { backgroundColor: colors.primary }]}
            onPress={loadMoodData}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const CustomDay = (props: DayComponentProps) => {
    const { date, state } = props;
    const marking = date ? emojiMarks[date.dateString] : undefined;
    const isToday = date?.dateString === dayjs().format('YYYY-MM-DD');
    const isSelected = date?.dateString === selectedDate;
    const hasNote = date ? entries[date.dateString]?.note : false;

    return (
      <Pressable
        onPress={() => date && handleDayPress({ dateString: date.dateString })}
        onLongPress={() => date && handleDayLongPress({ dateString: date.dateString })}
      >
        <View
          style={[
            styles.dayContainer,
            {
              borderColor: colors.border,
              backgroundColor: isToday 
                ? colors.primary + '20' 
                : isSelected 
                  ? colors.primary + '10'
                  : 'transparent',
            },
          ]}
        >
          {marking?.emoji ? (
            <View style={styles.emojiContainer}>
              <Text style={styles.emoji}>{marking.emoji}</Text>
              {hasNote && (
                <Icon 
                  name="note-text-outline" 
                  size={12} 
                  color={colors.primary}
                  style={styles.noteIcon}
                />
              )}
            </View>
          ) : (
            <Text
              style={[
                styles.dayText,
                { color: state === 'disabled' ? colors.text + '80' : colors.text },
              ]}
            >
              {date?.day}
            </Text>
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {renderHeader()}
      <CalendarList
        current={startDate ?? dayjs().format('YYYY-MM-DD')}
        pastScrollRange={12}
        futureScrollRange={0}
        horizontal
        pagingEnabled
        markingType="custom"
        markedDates={emojiMarks as any}
        dayComponent={CustomDay}
        renderHeader={(date) => {
          const d = dayjs(date ? date : dayjs());
          return (
            <View style={styles.monthHeaderContainer}>
              <Text style={[styles.monthHeaderText, { color: colors.text }]}>
                {d.isValid() ? d.format('MMMM YYYY') : dayjs().format('MMMM YYYY')}
              </Text>
            </View>
          );
        }}
        theme={{
          calendarBackground: 'transparent',
          'stylesheet.calendar.main': {
            week: { marginTop: 1, marginBottom: 1, flexDirection: 'row' },
          },
        } as any}
        style={styles.calendar}
      />
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerRight: {
    width: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  dayContainer: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderRadius: 8,
  },
  emojiContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 20,
  },
  noteIcon: {
    position: 'absolute',
    bottom: -2,
    right: -2,
  },
  dayText: {
    fontSize: 13,
  },
  monthHeaderContainer: {
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  monthHeaderText: {
    fontSize: 17,
    fontWeight: '600',
  },
  calendar: {
    marginTop: 8,
  },
  errorText: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 