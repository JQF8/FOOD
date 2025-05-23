import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface Metric {
  name: string;
  current: number;
  goal: number;
  avgDailyChange: number;
}

interface Props {
  metrics: Metric[];
}

export const ProgressCard: React.FC<Props> = ({ metrics }) => {
  const { colors } = useTheme();
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth - 40; // Accounting for screen padding

  const calculateETA = (current: number, goal: number, avgDailyChange: number): number => {
    if (avgDailyChange === 0) return 0;
    const remaining = goal - current;
    return Math.ceil(Math.abs(remaining / avgDailyChange));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Text style={[styles.title, { color: colors.text }]}>Progress vs. Goal</Text>
      
      {metrics.map((metric, index) => {
        const eta = calculateETA(metric.current, metric.goal, metric.avgDailyChange);
        const remaining = metric.goal - metric.current;
        
        return (
          <View key={metric.name} style={styles.metricContainer}>
            <View style={styles.metricHeader}>
              <Text style={[styles.metricName, { color: colors.text }]}>{metric.name}</Text>
              <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        width: `${metric.current}%`,
                        backgroundColor: colors.primary 
                      }
                    ]} 
                  />
                  <View 
                    style={[
                      styles.goalMarker, 
                      { 
                        left: `${metric.goal}%`,
                        backgroundColor: colors.primary 
                      }
                    ]} 
                  />
                </View>
                <View style={styles.progressLabels}>
                  <Text style={[styles.progressValue, { color: colors.text }]}>
                    {metric.current}%
                  </Text>
                  <Text style={[styles.progressValue, { color: colors.text }]}>
                    {metric.goal}%
                  </Text>
                </View>
              </View>
            </View>
            
            <Text style={[styles.goalText, { color: colors.text }]}>
              Goal: {metric.goal}% • Remaining: {remaining}% to go
            </Text>
            
            <Text style={[styles.etaText, { color: colors.text }]}>
              ETA @ {metric.avgDailyChange > 0 ? '+' : ''}{metric.avgDailyChange}%/day: {eta}d
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  metricContainer: {
    marginBottom: 12,
  },
  metricHeader: {
    marginBottom: 4,
  },
  metricName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  progressContainer: {
    height: 24,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    position: 'relative',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
    position: 'absolute',
    left: 0,
  },
  goalMarker: {
    width: 2,
    height: 16,
    position: 'absolute',
    top: -4,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  progressValue: {
    fontSize: 12,
  },
  goalText: {
    fontSize: 12,
    marginTop: 4,
  },
  etaText: {
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 2,
  },
}); 