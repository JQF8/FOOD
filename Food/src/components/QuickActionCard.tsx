import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../context/ThemeContext';

interface QuickActionCardProps {
  icon: string;
  title: string;
  onPress: () => void;
}

export const QuickActionCard: React.FC<QuickActionCardProps> = ({
  icon,
  title,
  onPress,
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: colors.card },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Icon name={icon} size={24} color={colors.primary} />
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '44%', // reduced from 48% for tighter grid
    aspectRatio: 1,
    borderRadius: 10, // slightly reduced
    padding: 10, // reduced from 16
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3, // reduced from 4
    elevation: 2, // reduced from 3
  },
  title: {
    marginTop: 4, // reduced from 8
    fontSize: 12, // reduced from 14
    fontWeight: '500',
    textAlign: 'center',
  },
}); 