import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Mood } from '../types/mood';
import { moodColor } from '../constants/moodColor';
import { useTheme } from '../context/ThemeContext';
import { useMood } from '../context/MoodContext';

interface FeelingButtonProps {
  mood: Mood;
  label: string;
}

export const FeelingButton: React.FC<FeelingButtonProps> = ({ mood, label }) => {
  console.log('[FeelingButton] Rendering with mood:', mood, 'label:', label);
  const { colors } = useTheme();
  const { setMood, isInitialized } = useMood();

  const handlePress = async () => {
    if (!isInitialized) {
      console.log('[FeelingButton] Context not initialized, ignoring press');
      return;
    }

    try {
      console.log('[FeelingButton] Pressed, setting mood:', mood);
      const today = new Date().toISOString().split('T')[0];
      await setMood(today, mood);
      console.log('[FeelingButton] Mood set successfully');
    } catch (error) {
      console.error('[FeelingButton] Error setting mood:', error);
    }
  };

  const getIconName = (mood: Mood): string => {
    switch (mood) {
      case 'happy':
        return 'emoticon-happy-outline';
      case 'soso':
        return 'emoticon-neutral-outline';
      case 'stress_anxiety':
        return 'emoticon-sad-outline';
      case 'tired':
        return 'sleep';
      default:
        return 'emoticon-neutral-outline';
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button, 
        { 
          backgroundColor: colors.card,
          opacity: isInitialized ? 1 : 0.5 
        }
      ]}
      onPress={handlePress}
      disabled={!isInitialized}
    >
      <Icon name={getIconName(mood)} size={24} color={moodColor[mood]} />
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '48%',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
  },
}); 