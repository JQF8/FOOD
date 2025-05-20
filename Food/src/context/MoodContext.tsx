import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Mood } from '../types/mood';

interface MoodContextType {
  moods: Record<string, Mood>;
  setMood: (date: string, mood: Mood) => Promise<void>;
  getMood: (date: string) => Mood | undefined;
  isInitialized: boolean;
}

const defaultContext: MoodContextType = {
  moods: {},
  setMood: async () => {},
  getMood: () => undefined,
  isInitialized: false
};

const MoodContext = createContext<MoodContextType>(defaultContext);

export const MoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  console.log('[MoodContext] Provider mounting...');
  const [moods, setMoods] = useState<Record<string, Mood>>({});
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    console.log('[MoodContext] Provider mounted');
    const loadMoods = async () => {
      try {
        const storedMoods = await AsyncStorage.getItem('moods');
        console.log('[MoodContext] Loaded moods from storage:', storedMoods);
        if (storedMoods) {
          setMoods(JSON.parse(storedMoods));
        }
        setIsInitialized(true);
      } catch (error) {
        console.error('[MoodContext] Error loading moods:', error);
        setIsInitialized(true); // Still mark as initialized even if there's an error
      }
    };
    loadMoods();
    return () => console.log('[MoodContext] Provider unmounted');
  }, []);

  const setMood = async (date: string, mood: Mood) => {
    console.log('[MoodContext] Setting mood:', { date, mood });
    try {
      const newMoods = { ...moods, [date]: mood };
      await AsyncStorage.setItem('moods', JSON.stringify(newMoods));
      setMoods(newMoods);
      console.log('[MoodContext] Mood set successfully');
    } catch (error) {
      console.error('[MoodContext] Error saving mood:', error);
    }
  };

  const getMood = (date: string): Mood | undefined => {
    const mood = moods[date];
    console.log('[MoodContext] Getting mood for', date, ':', mood);
    return mood;
  };

  const value = { moods, setMood, getMood, isInitialized };
  console.log('[MoodContext] Current context value:', value);

  if (!isInitialized) {
    console.log('[MoodContext] Not yet initialized, rendering with default context');
    return (
      <MoodContext.Provider value={defaultContext}>
        {children}
      </MoodContext.Provider>
    );
  }

  return (
    <MoodContext.Provider value={value}>
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = () => {
  const context = useContext(MoodContext);
  console.log('[MoodContext] useMood hook called, context:', context);
  
  if (!context.isInitialized) {
    console.log('[MoodContext] Context not yet initialized');
    return context; // Return the default context instead of throwing
  }
  
  return context;
}; 