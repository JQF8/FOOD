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
  style?: any;
}

export const FeelingButton: React.FC<FeelingButtonProps> = ({ mood, label, onPress, style }) => {
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
      style={[styles.button, { backgroundColor: colors.card }, style]}
      onPress={onPress}
    >
      <Icon name={getIconName(mood)} size={24} color={moodColor[mood]} />
      <Text 
        style={[styles.label, { color: colors.text }]}
        numberOfLines={1}
        adjustsFontSizeToFit={true}
        minimumFontScale={0.85}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    minWidth: 72,
    width: '22%',
    height: 80,
    padding: 8,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    width: '100%',
  },
}); 