import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ResearchPaper } from '../types/research';

export type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
  Notifications: undefined;
  PersonalInformation: undefined;
  DietPreferences: undefined;
  HealthGoals: undefined;
  MoodCalendar: { initialDate?: string };
  MoodDetail: { date: string };
  FoodDetail: { id: string };
  ExerciseOptions: undefined;
  ExerciseRecommendations: { type: 'Run' | 'Swim' | 'Bike' };
  SleepOptions: undefined;
  SleepRecommendations: { issue: 'Difficulty Falling Asleep' | 'Difficulty Staying Asleep' | 'Waking Too Early' };
  Profile: undefined;
  InsightsFeed: undefined;
  InsightDetail: { id: string };
  IncreaseEating: undefined;
  DecreaseEating: undefined;
  TrackMeal: undefined;
  WaterScreen: undefined;
  ResearchDetail: { paper: ResearchPaper };
  ResearchList: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Mood: undefined;
  Food: undefined;
  Wellness: undefined;
  Profile: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>; 