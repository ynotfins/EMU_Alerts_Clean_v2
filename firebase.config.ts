import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// ---- Config from .env (expo reads EXPO_PUBLIC_* on boot) ----
// Development fallback configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || "emu-alerts-demo.firebaseapp.com",
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || "emu-alerts-demo",
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || "emu-alerts-demo.appspot.com",
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:demo",
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-DEMO",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// Auth: For managed Expo, just use getAuth - persistence is handled automatically
const auth = getAuth(app);

const db = getFirestore(app);

// TEMP DEBUG (remove later): verify env is loaded
console.log('[ENV CHECK]', {
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  hasMapsKey: !!process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
});

export { app, auth, db };