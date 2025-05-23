import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProfileData {
  fullName?: string;
  dateOfBirth?: Date;
  sex?: 'male' | 'female' | 'other';
  height?: number;
  weight?: number;
  targetWeight?: number;
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'athlete';
  bedtime?: string;
  wakeTime?: string;
  chronicConditions?: string[];
  medications?: string;
  allergies?: string[];
  dietStyle?: string;
  foodsToAvoid?: string[];
  dislikes?: string[];
  cravings?: string[];
  calorieGoal?: number;
  macroSplit?: {
    carbs: number;
    protein: number;
    fat: number;
  };
  mealTiming?: {
    breakfastWindow: {
      start: string;
      end: string;
    };
    dinnerCutoff: string;
  };
  culturalConstraint?: string;
  healthGoals?: {
    primaryGoal: string;
    sleep?: {
      currentHours: number;
      targetHours: number;
      currentQuality: number;
      targetQuality: number;
    };
    stress?: {
      currentLevel: number;
      targetLevel: number;
      mindfulnessDays: number;
    };
    exercise?: {
      currentWorkouts: number;
      targetWorkouts: number;
      workoutLength: number;
    };
    hydration?: {
      currentGlasses: number;
      targetGlasses: number;
    };
    nutrition?: {
      targetCalories: number;
      restrictions: string[];
    };
  };
  notifications?: {
    darkMode: boolean;
    energyMode: boolean;
    dailySummary: boolean;
    mealTracking: boolean;
  };
}

interface ProfileContextType {
  profile: ProfileData;
  updateProfile: (data: Partial<ProfileData>) => Promise<void>;
  isLoading: boolean;
}

const defaultContext: ProfileContextType = {
  profile: {},
  updateProfile: async () => {},
  isLoading: true,
};

export const ProfileContext = createContext<ProfileContextType>(defaultContext);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<ProfileData>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const storedProfile = await AsyncStorage.getItem('profile');
      if (storedProfile) {
        const parsedProfile = JSON.parse(storedProfile);
        // Convert date strings back to Date objects
        if (parsedProfile.dateOfBirth) {
          parsedProfile.dateOfBirth = new Date(parsedProfile.dateOfBirth);
        }
        setProfile(parsedProfile);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<ProfileData>) => {
    try {
      const updatedProfile = { ...profile, ...data };
      await AsyncStorage.setItem('profile', JSON.stringify(updatedProfile));
      setProfile(updatedProfile);
    } catch (error) {
      console.error('Error saving profile:', error);
      throw error; // Re-throw to handle in the component
    }
  };

  const value = {
    profile,
    updateProfile,
    isLoading,
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
} 