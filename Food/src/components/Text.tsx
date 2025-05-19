import React from 'react';
import { Text as RNText, StyleSheet, TextStyle } from 'react-native';
import theme from '@utils/theme';

interface TextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  color?: string;
  style?: TextStyle;
  numberOfLines?: number;
}

const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  color = theme.colors.text.primary,
  style,
  numberOfLines,
}) => {
  const getFontSize = () => {
    switch (variant) {
      case 'h1':
        return theme.typography.fontSize.xxxl;
      case 'h2':
        return theme.typography.fontSize.xxl;
      case 'h3':
        return theme.typography.fontSize.xl;
      case 'body':
        return theme.typography.fontSize.md;
      case 'caption':
        return theme.typography.fontSize.sm;
      default:
        return theme.typography.fontSize.md;
    }
  };

  const getFontFamily = () => {
    switch (variant) {
      case 'h1':
      case 'h2':
      case 'h3':
        return theme.typography.fontFamily.bold;
      case 'body':
        return theme.typography.fontFamily.regular;
      case 'caption':
        return theme.typography.fontFamily.regular;
      default:
        return theme.typography.fontFamily.regular;
    }
  };

  return (
    <RNText
      style={[
        styles.text,
        {
          fontSize: getFontSize(),
          fontFamily: getFontFamily(),
          color,
        },
        style,
      ]}
      numberOfLines={numberOfLines}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {
    includeFontPadding: false,
  },
});

export default Text; 