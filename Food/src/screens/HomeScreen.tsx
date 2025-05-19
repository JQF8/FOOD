import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { ThemeToggle } from '../components/ThemeToggle';
import { MoodToFood } from '../components/MoodToFood';

const HomeScreen: React.FC = () => {
  const { colors, mode, toggleMode } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.gradient.start }]}>
        <View style={styles.headerRow}>
          <View style={{ width: 32 }} />
          <Text style={[styles.title, styles.title3D]}>Food × Mood</Text>
          <ThemeToggle />
        </View>
        <TouchableOpacity 
          style={[styles.modeToggle, { backgroundColor: colors.primary }]}
          onPress={toggleMode}
        >
          <Text style={styles.modeText}>
            {mode === 'eat-more' ? '🍽️ Eat More' : '🥗 Diet'}
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={[styles.content, { backgroundColor: colors.background }]}>
        <MoodToFood />
        
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Coming Soon</Text>
          <Text style={[styles.sectionSubtitle, { color: colors.text }]}>
            Track your mood-food journey
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  title3D: {
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 2, height: 4 },
    textShadowRadius: 8,
    elevation: 10,
    letterSpacing: 1.5,
  },
  modeToggle: {
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  modeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  section: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
});

export default HomeScreen; 