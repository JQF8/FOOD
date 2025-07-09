import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import PersonalInformationScreen from '../screens/PersonalInformationScreen';
import DietPreferencesScreen from '../screens/DietPreferencesScreen';
import HealthGoalsScreen from '../screens/HealthGoalsScreen';
import WaterScreen from '../screens/WaterScreen';
import TrackMealScreen from '../screens/TrackMealScreen';
import IncreaseEatingScreen from '../screens/IncreaseEatingScreen';
import DecreaseEatingScreen from '../screens/DecreaseEatingScreen';
import { MoodCalendarScreen } from '../screens/MoodCalendarScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="PersonalInformation" component={PersonalInformationScreen} />
        <Stack.Screen name="DietPreferences" component={DietPreferencesScreen} />
        <Stack.Screen name="HealthGoals" component={HealthGoalsScreen} />
        <Stack.Screen name="WaterScreen" component={WaterScreen} />
        <Stack.Screen name="TrackMeal" component={TrackMealScreen} />
        <Stack.Screen name="IncreaseEating" component={IncreaseEatingScreen} />
        <Stack.Screen name="DecreaseEating" component={DecreaseEatingScreen} />
        <Stack.Screen name="MoodCalendar" component={MoodCalendarScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 