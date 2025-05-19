import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from '../context/ThemeContext';

const WellnessScreen: React.FC = () => {
  const { colors } = useTheme();
  
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [65, 70, 75, 72, 80, 85, 82],
        color: () => colors.primary,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView>
        <View style={[styles.header, { backgroundColor: colors.gradient.start }]}>
          <Text style={[styles.title, { color: colors.text }]}>Wellness Metrics</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Energy Level Trend</Text>
          <LineChart
            data={chartData}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={{
              backgroundColor: colors.background,
              backgroundGradientFrom: colors.background,
              backgroundGradientTo: colors.background,
              decimalPlaces: 0,
              color: (opacity = 1) => `${colors.primary}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Current Status</Text>
          <View style={[styles.statusCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.statusTitle, { color: colors.text }]}>Sleep Quality</Text>
            <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
              <View style={[styles.progress, { width: '75%', backgroundColor: colors.primary }]} />
            </View>
            <Text style={[styles.statusValue, { color: colors.text }]}>75%</Text>
          </View>

          <View style={[styles.statusCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.statusTitle, { color: colors.text }]}>Stress Level</Text>
            <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
              <View style={[styles.progress, { width: '30%', backgroundColor: colors.success }]} />
            </View>
            <Text style={[styles.statusValue, { color: colors.text }]}>30%</Text>
          </View>

          <View style={[styles.statusCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.statusTitle, { color: colors.text }]}>Hydration</Text>
            <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
              <View style={[styles.progress, { width: '60%', backgroundColor: colors.info }]} />
            </View>
            <Text style={[styles.statusValue, { color: colors.text }]}>60%</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recommendations</Text>
          <View style={[styles.recommendationCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.recommendationTitle, { color: colors.text }]}>Sleep Improvement</Text>
            <Text style={[styles.recommendationText, { color: colors.text }]}>
              • Try to maintain a consistent sleep schedule{'\n'}
              • Avoid caffeine after 2 PM{'\n'}
              • Create a relaxing bedtime routine
            </Text>
          </View>
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
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  statusCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
  },
  statusValue: {
    fontSize: 14,
    marginTop: 5,
    textAlign: 'right',
  },
  recommendationCard: {
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recommendationText: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default WellnessScreen; 