import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, PanResponder } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../context/ThemeContext';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

type Mood = 'stress' | 'anxious' | 'tired' | 'insomnia';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const PANEL_HEIGHT = SCREEN_HEIGHT * 0.6;

const moodSuggestions = {
  stress: {
    food: 'Dark Chocolate',
    description: 'Rich in antioxidants and mood-enhancing compounds that help reduce stress hormones.',
    icon: 'food-chocolate',
  },
  anxious: {
    food: 'Green Tea',
    description: 'Contains L-theanine, an amino acid that promotes calmness and reduces anxiety.',
    icon: 'tea',
  },
  tired: {
    food: 'Quinoa Bowl',
    description: 'Complete protein with complex carbohydrates for sustained energy.',
    icon: 'food-grains',
  },
  insomnia: {
    food: 'Chamomile Tea',
    description: 'Natural sedative properties that help promote sleep.',
    icon: 'tea-outline',
  },
};

export const MoodToFood = () => {
  const { colors } = useTheme();
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(PANEL_HEIGHT)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          slideAnim.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > PANEL_HEIGHT * 0.3) {
          // Dismiss panel
          Animated.parallel([
            Animated.timing(slideAnim, {
              toValue: PANEL_HEIGHT,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
          ]).start(() => {
            setSelectedMood(null);
          });
        } else {
          // Return to original position
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const renderAnimation = (mood: Mood) => {
    switch (mood) {
      case 'stress':
        return (
          <Svg width="100" height="100" viewBox="0 0 100 100">
            <Circle cx="50" cy="50" r="40" fill={colors.primary} opacity="0.2" />
            <Path
              d="M30 50 Q50 30 70 50 Q50 70 30 50"
              fill="none"
              stroke={colors.primary}
              strokeWidth="4"
            />
          </Svg>
        );
      case 'anxious':
        return (
          <Svg width="100" height="100" viewBox="0 0 100 100">
            <Circle cx="50" cy="50" r="40" fill={colors.primary} opacity="0.2" />
            <Path
              d="M30 40 Q50 60 70 40"
              fill="none"
              stroke={colors.primary}
              strokeWidth="4"
            />
          </Svg>
        );
      case 'tired':
        return (
          <Svg width="100" height="100" viewBox="0 0 100 100">
            <Circle cx="50" cy="50" r="40" fill={colors.primary} opacity="0.2" />
            <Path
              d="M30 50 Q50 30 70 50"
              fill="none"
              stroke={colors.primary}
              strokeWidth="4"
            />
          </Svg>
        );
      case 'insomnia':
        return (
          <Svg width="100" height="100" viewBox="0 0 100 100">
            <Circle cx="50" cy="50" r="40" fill={colors.primary} opacity="0.2" />
            <Path
              d="M30 50 Q50 70 70 50"
              fill="none"
              stroke={colors.primary}
              strokeWidth="4"
            />
          </Svg>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>How are you feeling?</Text>
      
      <View style={styles.moodContainer}>
        {Object.keys(moodSuggestions).map((mood) => (
          <TouchableOpacity
            key={mood}
            style={[
              styles.moodButton,
              selectedMood === mood && { backgroundColor: colors.primary },
            ]}
            onPress={() => handleMoodSelect(mood as Mood)}
          >
            <Icon
              name={mood === 'stress' ? 'emoticon-sad' :
                    mood === 'anxious' ? 'emoticon-nervous' :
                    mood === 'tired' ? 'emoticon-tired' :
                    'emoticon-sleep'}
              size={24}
              color={selectedMood === mood ? '#FFFFFF' : colors.text}
            />
            <Text style={[
              styles.moodText,
              { color: selectedMood === mood ? '#FFFFFF' : colors.text }
            ]}>
              {mood.charAt(0).toUpperCase() + mood.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedMood && (
        <Animated.View
          style={[
            styles.slidingPanel,
            {
              backgroundColor: colors.card,
              transform: [{ translateY: slideAnim }],
              opacity: fadeAnim,
            },
          ]}
          {...panResponder.panHandlers}
        >
          <View style={styles.dragHandle} />
          <View style={styles.suggestionContent}>
            <View style={styles.animationWrapper}>
              {renderAnimation(selectedMood)}
            </View>
            <Icon
              name={moodSuggestions[selectedMood].icon}
              size={32}
              color={colors.primary}
            />
            <Text style={[styles.foodTitle, { color: colors.text }]}>
              {moodSuggestions[selectedMood].food}
            </Text>
            <Text style={[styles.foodDescription, { color: colors.text }]}>
              {moodSuggestions[selectedMood].description}
            </Text>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  moodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  moodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
    gap: 8,
    width: '48%',
    marginBottom: 16,
    justifyContent: 'center',
  },
  moodText: {
    fontSize: 16,
    fontWeight: '600',
  },
  slidingPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: PANEL_HEIGHT,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#CCCCCC',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  suggestionContent: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
  },
  animationWrapper: {
    marginBottom: 24,
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 12,
  },
  foodDescription: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 28,
    paddingHorizontal: 20,
  },
}); 