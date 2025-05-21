import AsyncStorage from '@react-native-async-storage/async-storage';
import { Mood } from '../types/mood';

type Entry = { mood: Mood; note?: string };

export async function saveMood(date: string, mood: Mood, note?: string) {
  const entries: Record<string, Entry> = await loadMoods();
  entries[date] = { mood, note };
  await AsyncStorage.setItem('@moodEntries', JSON.stringify(entries));
}

export async function loadMoods(): Promise<Record<string, Entry>> {
  const raw = await AsyncStorage.getItem('@moodEntries');
  return raw ? JSON.parse(raw) : {};
}

// 🤖 convert "So-so", "so so", "Stressed " → "soso", "stressed"
export function normMood(mood: string): Mood {
  return mood.trim().toLowerCase().replace(/[_\s-]/g, '') as Mood;
} 