import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../navigation/types';
import { useTheme } from '../context/ThemeContext';
import { MoodButton } from '../components/MoodButton';
import { QuickActionCard } from '../components/QuickActionCard';
import { InsightCard } from '../components/InsightCard';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Layout Constants
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const INSIGHT_CARD_WIDTH = SCREEN_WIDTH * 0.8;

// Spacing Constants
const SPACING = {
  xs: 2, // reduced from 4
  sm: 4, // reduced from 8
  md: 6, // reduced from 12
  lg: 8, // reduced from 16
  xl: 12, // reduced from 24
} as const;

const LAYOUT = {
  headerTopPadding: SPACING.sm,
  sectionGap: SPACING.lg, // reduced from xl
  gridGap: SPACING.md, // reduced from md
  cardGap: SPACING.md, // reduced from lg
  bottomPadding: SPACING.lg, // reduced from xl
} as const;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    console.log('✅ HomeScreen mounted');
  }, []);

  const moods = [
    { emoji: '😊', label: 'Happy' },
    { emoji: '😐', label: 'Neutral' },
    { emoji: '😔', label: 'Sad' },
    { emoji: '😡', label: 'Angry' },
    { emoji: '😴', label: 'Tired' },
  ];

  const quickActions = [
    {
      icon: 'water-outline',
      title: 'Water',
      screen: 'WaterScreen' as const,
    },
    {
      icon: 'nutrition-outline',
      title: 'Track Meal',
      screen: 'TrackMeal' as const,
    },
    {
      icon: 'add-circle-outline',
      title: 'Increase Eating',
      screen: 'IncreaseEating' as const,
    },
    {
      icon: 'remove-circle-outline',
      title: 'Decrease Eating',
      screen: 'DecreaseEating' as const,
    },
  ] as const;

  type QuickActionScreen = typeof quickActions[number]['screen'];

  const insights = [
    {
      id: '1',
      title: 'Understanding Your Eating Patterns',
      image: 'https://picsum.photos/200/100',
      tags: ['Nutrition', 'Behavior'],
    },
    {
      id: '2',
      title: 'The Science of Hunger',
      image: 'https://picsum.photos/200/100',
      tags: ['Research', 'Health'],
    },
  ];

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    navigation.navigate('MoodCalendar', { initialDate: new Date().toISOString().split('T')[0] });
  };

  const handleQuickAction = (screen: QuickActionScreen) => {
    navigation.navigate(screen);
  };

  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.text }}>Error: {error.message}</Text>
      </View>
    );
  }

  try {
    return (
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingTop: insets.top + LAYOUT.headerTopPadding,
            paddingBottom: LAYOUT.bottomPadding,
          }
        ]}
      >
        <View style={styles.section}>
          <View style={styles.headerRow}>
            <Text style={[styles.heading, { color: colors.text }]}>
              How are you feeling?
            </Text>
          </View>
          <FlatList
            data={moods}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.moodList}
            renderItem={({ item }) => (
              <MoodButton
                emoji={item.emoji}
                label={item.label}
                isSelected={selectedMood === item.label}
                onPress={() => handleMoodSelect(item.label)}
              />
            )}
            keyExtractor={(item) => item.label}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.headerRow}>
            <Text style={[styles.heading, { color: colors.text }]}>
              Quick Actions
            </Text>
          </View>
          <View style={styles.grid}>
            {quickActions.map((action) => (
              <QuickActionCard
                key={action.title}
                icon={action.icon}
                title={action.title}
                onPress={() => handleQuickAction(action.screen)}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.headerRow}>
            <Text style={[styles.heading, { color: colors.text }]}>
              Insights
            </Text>
          </View>
          <FlatList
            data={insights}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToAlignment="start"
            snapToInterval={INSIGHT_CARD_WIDTH + LAYOUT.cardGap}
            decelerationRate="fast"
            contentContainerStyle={styles.insightList}
            renderItem={({ item }) => (
              <View style={styles.insightCard}>
                <InsightCard
                  key={item.id}
                  title={item.title}
                  image={item.image}
                  tags={item.tags}
                  onPress={() => navigation.navigate('InsightDetail', { id: item.id })}
                />
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>
    );
  } catch (e) {
    setError(e instanceof Error ? e : new Error('Unknown error occurred'));
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: SPACING.md, // reduced from lg
  },
  headerRow: {
    paddingHorizontal: SPACING.md, // reduced from lg
    marginBottom: SPACING.sm, // reduced from md
  },
  section: {
    marginBottom: LAYOUT.sectionGap,
  },
  heading: {
    fontSize: 20, // reduced from 24
    fontWeight: '600',
  },
  moodList: {
    paddingRight: SPACING.md, // reduced from lg
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: LAYOUT.gridGap,
    columnGap: 0,
  },
  insightList: {
    paddingHorizontal: SPACING.md, // reduced from lg
  },
  insightCard: {
    width: INSIGHT_CARD_WIDTH * 0.85, // reduced width
    marginRight: LAYOUT.cardGap,
  },
}); 