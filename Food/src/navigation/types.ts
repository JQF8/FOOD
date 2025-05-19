export type RootStackParamList = {
  Main: undefined;
  FoodDetail: {
    food: {
      name: string;
      benefits: string;
      category: string;
    };
  };
};

export type MainTabParamList = {
  Home: undefined;
  Wellness: undefined;
  Food: undefined;
  IncreaseEating: undefined;
  Profile: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
}; 