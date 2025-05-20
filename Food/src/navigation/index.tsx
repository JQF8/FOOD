import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

import HomeScreen from '../screens/HomeScreen';
import WellnessScreen from '../screens/WellnessScreen';
import FoodScreen from '../screens/FoodScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FoodDetailScreen from '../screens/FoodDetailScreen';
import IncreaseEatingScreen from '../screens/IncreaseEatingScreen';

import { RootStackParamList, MainTabParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = () => {
  const { colors } = useTheme();
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 65,
          paddingBottom: 10,
          paddingTop: 10,
        },
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.tabIconContainer, focused && { backgroundColor: `${colors.primary}20` }]}>
              <Icon name="home" size={focused ? 28 : 24} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Wellness"
        component={WellnessScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.tabIconContainer, focused && { backgroundColor: `${colors.primary}20` }]}>
              <Icon name="heart-pulse" size={focused ? 28 : 24} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Food"
        component={FoodScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.tabIconContainer, focused && { backgroundColor: `${colors.primary}20` }]}>
              <Icon name="food-apple" size={focused ? 28 : 24} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.tabIconContainer, focused && { backgroundColor: `${colors.primary}20` }]}>
              <Icon name="account" size={focused ? 28 : 24} color={color} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 20,
  },
});

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen 
          name="Main" 
          component={MainTabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="FoodDetail" 
          component={FoodDetailScreen}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen 
          name="IncreaseEating" 
          component={IncreaseEatingScreen}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation; 