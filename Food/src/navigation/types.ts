import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Main: undefined;
  Home: undefined;
  MoodCalendar: undefined;
  MoodDetail: { date: string };
  FoodDetail: { id: string };
  ExerciseOptions: undefined;
  ExerciseRecommendations: { type: 'Run' | 'Swim' | 'Bike' };
  SleepOptions: undefined;
  SleepRecommendations: { issue: 'Difficulty Falling Asleep' | 'Difficulty Staying Asleep' | 'Waking Too Early' };
  Profile: undefined;
  DietPreferences: undefined;
  PersonalInformation: undefined;
  InsightsFeed: undefined;
  InsightDetail: { id: string };
  IncreaseEating: undefined;
  DecreaseEating: undefined;
  FoodScreen: undefined;
  WellnessScreen: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Wellness: undefined;
  Food: undefined;
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