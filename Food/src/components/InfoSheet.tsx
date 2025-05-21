import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface InfoSheetProps {
  visible: boolean;
  onClose: () => void;
  field: string;
}

const FIELD_INFO: Record<string, string> = {
  fullName: 'We use your name to personalize your experience and greet you throughout the app.',
  dateOfBirth: 'Your age helps us calculate appropriate nutrient recommendations and adjust our suggestions based on your life stage.',
  sex: 'This information helps us provide more accurate nutritional recommendations and track hormone-related patterns.',
  height: 'Your height is used to calculate BMI and determine appropriate portion sizes and calorie needs.',
  weight: 'Current weight helps us calculate your daily calorie needs and track progress towards your health goals.',
  targetWeight: 'Optional target weight helps us adjust recommendations to support your health goals.',
  activityLevel: 'Your activity level helps us calculate your daily calorie needs and adjust protein requirements.',
  bedtime: 'Sleep schedule helps us optimize nutrient timing and suggest foods that support better sleep.',
  wakeTime: 'Wake time helps us plan your meal timing and ensure you get the right nutrients at the right time.',
  chronicConditions: 'This information helps us avoid suggesting foods that might interact with your conditions and provide more targeted recommendations.',
  medications: 'Knowing your medications helps us avoid suggesting foods that might interact with them.',
  allergies: 'This information helps us filter out foods that could cause allergic reactions.',
};

export function InfoSheet({ visible, onClose, field }: InfoSheetProps) {
  const { colors } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={[styles.container, { backgroundColor: colors.background + '99' }]}>
        <View style={[styles.sheet, { backgroundColor: colors.card }]}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>Why we ask?</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={24} color={colors.text} />
            </Pressable>
          </View>
          <ScrollView style={styles.content}>
            <Text style={[styles.info, { color: colors.text }]}>
              {FIELD_INFO[field] || 'No information available for this field.'}
            </Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  info: {
    fontSize: 16,
    lineHeight: 24,
  },
}); 