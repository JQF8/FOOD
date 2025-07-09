import { initializeApp } from 'firebase/app';
import Constants from 'expo-constants';

let firebaseApp: ReturnType<typeof initializeApp> | null = null;
export const useFirebaseStub = !Constants.expoConfig?.extra?.firebase?.apiKey;

if (!useFirebaseStub) {
  try {
    const firebaseConfig = Constants.expoConfig?.extra?.firebase;
    console.log('Initializing Firebase with config:', { ...firebaseConfig, apiKey: '***' });
    firebaseApp = initializeApp(firebaseConfig);
  } catch (err) {
    console.warn('Firebase init failed, falling back to stub', err);
    firebaseApp = null;
  }
} else {
  console.info('Dev stub auth: no Firebase API key found');
}

export { firebaseApp }; 