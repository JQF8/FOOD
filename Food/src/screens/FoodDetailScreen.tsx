import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';

interface FoodDetailScreenProps {
  route: {
    params: {
      food: {
        name: string;
        benefits: string;
        category: string;
      };
    };
  };
}

const FoodDetailScreen: React.FC<FoodDetailScreenProps> = ({ route }) => {
  const { food } = route.params;
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView>
        <View style={[styles.header, { backgroundColor: colors.gradient.start }]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>{food.name}</Text>
        </View>

        <View style={styles.content}>
          <View style={[styles.section, { backgroundColor: colors.card }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Benefits</Text>
            <Text style={[styles.benefitsText, { color: colors.text }]}>{food.benefits}</Text>
          </View>

          <View style={[styles.section, { backgroundColor: colors.card }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Category</Text>
            <Text style={[styles.categoryText, { color: colors.text }]}>{food.category}</Text>
          </View>

          <View style={[styles.section, { backgroundColor: colors.card }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Nutritional Information</Text>
            <View style={styles.nutritionGrid}>
              <View style={styles.nutritionItem}>
                <Text style={[styles.nutritionValue, { color: colors.primary }]}>120</Text>
                <Text style={[styles.nutritionLabel, { color: colors.text }]}>Calories</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={[styles.nutritionValue, { color: colors.primary }]}>5g</Text>
                <Text style={[styles.nutritionLabel, { color: colors.text }]}>Protein</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={[styles.nutritionValue, { color: colors.primary }]}>15g</Text>
                <Text style={[styles.nutritionLabel, { color: colors.text }]}>Carbs</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={[styles.nutritionValue, { color: colors.primary }]}>3g</Text>
                <Text style={[styles.nutritionLabel, { color: colors.text }]}>Fat</Text>
              </View>
            </View>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  section: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  benefitsText: {
    fontSize: 16,
    lineHeight: 24,
  },
  categoryText: {
    fontSize: 16,
  },
  nutritionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  nutritionItem: {
    width: '48%',
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  nutritionValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  nutritionLabel: {
    fontSize: 14,
  },
});

export default FoodDetailScreen; 