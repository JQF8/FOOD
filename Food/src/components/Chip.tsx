import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface ChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export function Chip({ label, selected, onPress }: ChipProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      style={[
        styles.chip,
        {
          backgroundColor: selected ? colors.primary : colors.card,
          borderColor: selected ? colors.primary : colors.border,
        },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.label,
          {
            color: selected ? 'white' : colors.text,
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
}); 