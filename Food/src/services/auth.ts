import { getAuth, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { useFirebaseStub } from '../firebase/config';

// Single email for development
const DEV_EMAIL = 'test@test.com';

export interface StubUser {
  uid: string;
  email: string | null;
}

export async function signIn(email: string, password: string): Promise<UserCredential | { user: StubUser }> {
  if (useFirebaseStub) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Only check email
    if (email === DEV_EMAIL) {
      console.log('Login successful with:', email);
      return { user: { uid: 'dev-user', email: DEV_EMAIL } };
    } else {
      throw new Error('Please use test@test.com to login');
    }
  }

  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signOut(): Promise<void> {
  if (useFirebaseStub) {
    console.log('Stub sign out');
    return;
  }

  const auth = getAuth();
  return auth.signOut();
} 