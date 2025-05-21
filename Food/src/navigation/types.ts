import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Main: undefined;
  Home: undefined;
  MoodCalendar: { initialDate?: string };
  IncreaseEating: undefined;
  InsightsFeed: undefined;
  InsightDetail: { id: string };
  PersonalInformation: undefined;
  DietPreferences: undefined;
  FoodDetail: { id: string };
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