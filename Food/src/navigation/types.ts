import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Main: undefined;
  FoodDetail: {
    food: {
      name: string;
      benefits: string;
      category: string;
    };
  };
  IncreaseEating: undefined;
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

export type FoodDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'FoodDetail'>; 