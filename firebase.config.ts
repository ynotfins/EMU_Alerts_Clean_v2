import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// ---- Config from .env (expo reads EXPO_PUBLIC_* on boot) ----
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Validate required Firebase config
const requiredFields = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
const missingFields = requiredFields.filter(field => !firebaseConfig[field as keyof typeof firebaseConfig]);

if (missingFields.length > 0) {
  console.error('[FIREBASE] Missing required environment variables:', missingFields.map(f => `EXPO_PUBLIC_FIREBASE_${f.toUpperCase()}`));
  console.error('[FIREBASE] Please check your .env file contains all required Firebase credentials');
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// Auth: For managed Expo, just use getAuth - persistence is handled automatically
const auth = getAuth(app);

const db = getFirestore(app);

// TEMP DEBUG (remove later): verify env is loaded
console.log('[FIREBASE CONFIG]', {
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  hasMapsKey: !!process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
  allKeys: Object.keys(process.env).filter(k => k.startsWith('EXPO_PUBLIC_')),
});

console.log('[FIREBASE INITIALIZED]', {
  appName: app.name,
  projectId: app.options.projectId,
  authInitialized: !!auth,
  dbInitialized: !!db,
});

export { app, auth, db };