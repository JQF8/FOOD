import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Mood } from '../types/mood';
import { moodColor } from '../constants/moodColor';
import { useTheme } from '../context/ThemeContext';

interface FeelingButtonProps {
  mood: Mood;
  label: string;
  onPress: () => void;
}

export const FeelingButton: React.FC<FeelingButtonProps> = ({ mood, label, onPress }) => {
  const { colors } = useTheme();

  const getIconName = (mood: Mood): string => {
    switch (mood) {
      case 'happy':
        return 'emoticon-happy-outline';
      case 'soso':
        return 'emoticon-neutral-outline';
      case 'stressed':
        return 'emoticon-sad-outline';
      case 'tired':
        return 'sleep';
      default:
        return 'emoticon-neutral-outline';
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors.card }]}
      onPress={onPress}
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