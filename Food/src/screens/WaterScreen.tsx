import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

export default function WaterScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [waterIntake, setWaterIntake] = useState(0);
  const dailyGoal = 2000; // ml

  const addWater = (amount: number) => {
    setWaterIntake(prev => Math.max(0, prev + amount));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Text style={[styles.title, { color: colors.text }]}>Water Tracking</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.progressContainer}>
          <Text style={[styles.progressText, { color: colors.text }]}>
            {waterIntake}ml / {dailyGoal}ml
          </Text>
          <View style={[styles.progressBar, { backgroundColor: colors.card }]}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  backgroundColor: colors.primary,
                  width: `${(waterIntake / dailyGoal) * 100}%` 
                }
              ]} 
            />
          </View>
        </View>

        <View style={styles.quickAddContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Add</Text>
          <View style={styles.quickAddButtons}>
            <TouchableOpacity 
              style={[styles.quickAddButton, { backgroundColor: colors.card }]}
              onPress={() => addWater(250)}
            >
              <Text style={[styles.quickAddText, { color: colors.text }]}>250ml</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.quickAddButton, { backgroundColor: colors.card }]}
              onPress={() => addWater(500)}
            >
              <Text style={[styles.quickAddText, { color: colors.text }]}>500ml</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.quickAddButton, { backgroundColor: colors.card }]}
              onPress={() => addWater(750)}
            >
              <Text style={[styles.quickAddText, { color: colors.text }]}>750ml</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
  },
  progressBar: {
    height: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 10,
  },
  quickAddContainer: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  quickAddButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAddButton: {
    flex: 1,
    marginHorizontal: 8,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  quickAddText: {
    fontSize: 16,
    fontWeight: '500',
  },
}); 