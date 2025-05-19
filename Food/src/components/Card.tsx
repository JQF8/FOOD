import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import theme from '@utils/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'elevated' | 'outlined' | 'flat';
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  variant = 'elevated',
}) => {
  const getShadowStyle = () => {
    switch (variant) {
      case 'elevated':
        return theme.shadows.medium;
      case 'outlined':
        return {};
      case 'flat':
        return {};
      default:
        return theme.shadows.medium;
    }
  };

  const getBorderStyle = () => {
    switch (variant) {
      case 'elevated':
        return {};
      case 'outlined':
        return {
          borderWidth: 1,
          borderColor: theme.colors.border,
        };
      case 'flat':
        return {};
      default:
        return {};
    }
  };

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
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
  },
});

export default Card; 