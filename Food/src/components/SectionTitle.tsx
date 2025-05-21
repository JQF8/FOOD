import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface SectionTitleProps {
  label: string;
  rightContent?: ReactNode;
  containerStyle?: object;
}

export default function SectionTitle({ label, rightContent, containerStyle }: SectionTitleProps) {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.title, { color: colors.text }]}>
        {label}
      </Text>
      {rightContent && (
        <View style={styles.rightContent}>
          {rightContent}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    flex: 1,
  },
  rightContent: {
    marginLeft: 8,
  },
}); 