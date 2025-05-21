import React from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Card from '../components/Card';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type SleepOptionsNavigationProp = NativeStackNavigationProp<RootStackParamList>;

type SleepIssue = 'Difficulty Falling Asleep' | 'Difficulty Staying Asleep' | 'Waking Too Early';

const SleepOptions = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<SleepOptionsNavigationProp>();
  const insets = useSafeAreaInsets();

  const issues: SleepIssue[] = [
    'Difficulty Falling Asleep',
    'Difficulty Staying Asleep',
    'Waking Too Early',
  ];

  const getIconForIssue = (issue: SleepIssue) => {
    switch (issue) {
      case 'Difficulty Falling Asleep':
        return 'power-sleep';
      case 'Difficulty Staying Asleep':
        return 'sleep-off';
      case 'Waking Too Early':
        return 'alarm-check';
      default:
        return 'moon-waning-crescent';
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView 
        contentContainerStyle={{ 
          padding: 16,
          paddingTop: insets.top + 16,
        }}
      >
        <View style={styles.grid}>
          {issues.map(issue => (
            <Card
              key={issue}
              style={{
                width: '48%',
                marginBottom: 16,
                backgroundColor: colors.card,
              }}
              onPress={() => navigation.navigate('SleepRecommendations', { issue })}
            >
              <View style={styles.cardContent}>
                <Icon 
                  name={getIconForIssue(issue)} 
                  size={24} 
                  color={colors.primary} 
                />
                <Text style={[styles.cardText, { color: colors.text }]}>
                  {issue}
                </Text>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default SleepOptions; 