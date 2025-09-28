import { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useAuth } from '../hooks/useAuth';
import ToastHost from './_toast-host';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { user, loading, error } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('[LAYOUT] Auth state:', { user: !!user, loading, error });
    
    if (!loading) {
      SplashScreen.hideAsync();
      
      // TEMP: Skip auth for debugging - remove this later
      const devMode = process.env.EXPO_PUBLIC_DEV_MODE === 'true';
      console.log('[LAYOUT] Dev mode:', devMode);
      
      if (devMode) {
        console.log('[LAYOUT] Dev mode enabled, going to tabs');
        router.replace('/(tabs)');
        return;
      }
      
      // Normal auth flow
      if (!user) {
        console.log('[LAYOUT] No user, redirecting to login');
        router.replace('/login');
      } else {
        console.log('[LAYOUT] User authenticated, redirecting to tabs');
        router.replace('/(tabs)');
      }
    }
  }, [user, loading, error, router]);

  // Show nothing while checking authentication
  if (loading) {
    console.log('[LAYOUT] Still loading auth...');
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