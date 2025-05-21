import React from 'react';
import { ScrollView, View, StyleSheet, Text, ViewStyle } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import Card from '../components/Card';
import { SafeAreaView } from 'react-native-safe-area-context';

type ExerciseOptionsNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ExerciseOptions = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<ExerciseOptionsNavigationProp>();

  const exercises = [
    { type: 'Run' as const, icon: 'run' },
    { type: 'Swim' as const, icon: 'swim' },
    { type: 'Bike' as const, icon: 'bike' }
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 24 }}>
        <View style={styles.grid}>
          {exercises.map(({ type, icon }) => (
            <Card
              key={type}
              style={{
                width: '48%',
                marginBottom: 16,
                backgroundColor: colors.card,
              }}
              onPress={() => navigation.navigate('ExerciseRecommendations', { type })}
            >
              <View style={styles.cardContent}>
                <Icon name={icon} size={24} color={colors.primary} />
                <Text style={[styles.cardText, { color: colors.text }]}>{type}</Text>
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
  },
});

export default ExerciseOptions; 