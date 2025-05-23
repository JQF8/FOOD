import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { HIGH_WATER_FOODS } from './constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (amount: number, type: 'water' | 'food') => void;
}

export const LogWaterModal: React.FC<Props> = ({ visible, onClose, onSave }) => {
  const { colors } = useTheme();
  const [amount, setAmount] = useState('');
  const [selectedFood, setSelectedFood] = useState<typeof HIGH_WATER_FOODS[number] | null>(null);
  const [portionSize, setPortionSize] = useState('');
  const [activeTab, setActiveTab] = useState<'water' | 'food'>('water');

  const calculateWaterFromFood = (food: typeof HIGH_WATER_FOODS[number], grams: number): number => {
    return (grams / 1000) * (food.waterPct / 100);
  };

  const handlePortionChange = (text: string) => {
    setPortionSize(text);
    if (selectedFood && text) {
      const grams = parseFloat(text);
      if (!isNaN(grams)) {
        const waterAmount = calculateWaterFromFood(selectedFood, grams);
        setAmount(waterAmount.toFixed(2));
      }
    }
  };

  const handleSave = () => {
    if (amount) {
      onSave(parseFloat(amount), activeTab);
      setAmount('');
      setSelectedFood(null);
      setPortionSize('');
      setActiveTab('water');
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={[styles.modalContainer, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
        <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>Log Water Intake</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.tabs}>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'water' && { borderBottomColor: colors.primary }
              ]}
              onPress={() => setActiveTab('water')}
            >
              <Text style={[styles.tabText, { color: colors.text }]}>Water</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'food' && { borderBottomColor: colors.primary }
              ]}
              onPress={() => setActiveTab('food')}
            >
              <Text style={[styles.tabText, { color: colors.text }]}>Food</Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'water' ? (
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.text }]}>Enter amount in liters</Text>
              <TextInput
                style={[styles.input, { 
                  backgroundColor: colors.card,
                  color: colors.text,
                  borderColor: colors.border
                }]}
                value={amount}
                onChangeText={setAmount}
                keyboardType="decimal-pad"
                placeholder="0.0"
                placeholderTextColor={colors.text + '80'}
              />
            </View>
          ) : (
            <View style={styles.foodContainer}>
              <Text style={[styles.label, { color: colors.text }]}>Select a food</Text>
              <View style={styles.foodList}>
                {HIGH_WATER_FOODS.map((food) => (
                  <TouchableOpacity
                    key={food.name}
                    style={[
                      styles.foodItem,
                      selectedFood?.name === food.name && { backgroundColor: colors.primary + '20' }
                    ]}
                    onPress={() => setSelectedFood(food)}
                  >
                    <Text style={[styles.foodName, { color: colors.text }]}>{food.name}</Text>
                    <Text style={[styles.waterPct, { color: colors.primary }]}>{food.waterPct}%</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {selectedFood && (
                <View style={styles.portionContainer}>
                  <Text style={[styles.label, { color: colors.text }]}>Enter portion size (grams)</Text>
                  <TextInput
                    style={[styles.input, { 
                      backgroundColor: colors.card,
                      color: colors.text,
                      borderColor: colors.border
                    }]}
                    value={portionSize}
                    onChangeText={handlePortionChange}
                    keyboardType="decimal-pad"
                    placeholder="0"
                    placeholderTextColor={colors.text + '80'}
                  />
                </View>
              )}
            </View>
          )}

          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: colors.primary }]}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    borderRadius: 16,
    padding: 20,
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
  tabs: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  foodContainer: {
    marginBottom: 20,
  },
  foodList: {
    maxHeight: 200,
    marginBottom: 16,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  foodName: {
    fontSize: 16,
  },
  waterPct: {
    fontSize: 16,
    fontWeight: '500',
  },
  portionContainer: {
    marginTop: 16,
  },
  saveButton: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 