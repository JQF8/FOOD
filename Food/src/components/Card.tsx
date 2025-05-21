import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  variant?: 'elevated' | 'outlined' | 'flat';
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  variant = 'elevated',
}) => {
  const { colors } = useTheme();

  const getShadowStyle = () => {
    switch (variant) {
      case 'elevated':
        return {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        };
      case 'outlined':
        return {};
      case 'flat':
        return {};
      default:
        return {};
    }
  };

  const getBorderStyle = () => {
    switch (variant) {
      case 'elevated':
        return {};
      case 'outlined':
        return {
          borderWidth: 1,
          borderColor: colors.border,
        };
      case 'flat':
        return {};
      default:
        return {};
    }
  };

  if (onPress) {
    return (
      <TouchableOpacity
        style={[
          styles.card,
          getShadowStyle(),
          getBorderStyle(),
          style,
        ]}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={[
        styles.card,
        getShadowStyle(),
        getBorderStyle(),
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: 'hidden',
  },
});

export default Card; 