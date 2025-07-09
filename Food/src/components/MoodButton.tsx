import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface MoodButtonProps {
  emoji: string;
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

export const MoodButton = ({ emoji, label, isSelected, onPress }: MoodButtonProps) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: isSelected ? colors.primary + '20' : colors.card,
          borderColor: isSelected ? colors.primary : colors.border,
        },
      ]}
      onPress={onPress}
    >
      <Text style={styles.emoji}>{emoji}</Text>
      <Text
        style={[
          styles.label,
          {
            color: colors.text,
            fontWeight: isSelected ? 'bold' : 'normal',
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 56, // reduced from 80
    height: 70, // reduced from 100
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6, // reduced from 12
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  emoji: {
    fontSize: 22, // reduced from 32
    marginBottom: 4, // reduced from 8
  },
  label: {
    fontSize: 11, // reduced from 14
  },
}); 