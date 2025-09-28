import { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useAuth } from '../hooks/useAuth';
import ToastHost from './_toast-host';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Development mode - skip authentication for now
  const DEVELOPMENT_MODE = true;
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // In development mode, skip authentication and go directly to tabs
    if (DEVELOPMENT_MODE) {
      SplashScreen.hideAsync();
      router.replace('/(tabs)');
      return;
    }

    // Production authentication flow
    if (!loading) {
      SplashScreen.hideAsync();
      
      // Redirect based on authentication state
      if (!user) {
        router.replace('/login');
      } else {
        router.replace('/(tabs)');
      }
    }
  }, [user, loading, router]);

  // In development mode, don't block on loading
  if (!DEVELOPMENT_MODE && loading) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1f2937',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="incident/[id]" 
          options={{ 
            title: 'Incident Details',
            presentation: 'modal' 
          }} 
        />
        <Stack.Screen name="chat/[id]" options={{ headerShown: true, title: 'Chat' }} />
      </Stack>
      <ToastHost />
    </>
  );
}