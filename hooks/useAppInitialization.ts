import { useEffect, useState, useCallback } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { usePersistence } from './usePersistence';
import { Analytics } from '@/utils/analytics';
import { Platform, AppState, AppStateStatus } from 'react-native';
import { useColorScheme } from 'react-native';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

/**
 * Custom hook to handle app initialization including:
 * - Font loading
 * - State persistence
 * - Analytics tracking
 * - Theme management
 * - App lifecycle events
 */
export function useAppInitialization() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [persistenceLoaded, setPersistenceLoaded] = useState(false);
  const { loadPersistedState } = usePersistence();
  const colorScheme = useColorScheme();

  // Handle app state changes (foreground, background, etc.)
  const handleAppStateChange = useCallback((nextAppState: AppStateStatus) => {
    if (nextAppState === 'active') {
      // App came to foreground
      Analytics.trackAppOpen();
    } else if (nextAppState === 'background') {
      // App went to background - track as button click with app_state location
      Analytics.trackButtonClick('app_background', 'app_state');
    }
  }, []);

  // Load fonts
  useEffect(() => {
    async function loadFonts() {
      try {
        // Load fonts based on moodboard
        await Font.loadAsync({
          // Using the available SpaceMono font as a fallback for all font variants
          'SpaceMono': require('@/assets/fonts/SpaceMono-Regular.ttf'),
          'Inter': require('@/assets/fonts/SpaceMono-Regular.ttf'),
          'Manrope': require('@/assets/fonts/SpaceMono-Regular.ttf'),
          
          // In a production app, we would load all font weights:
          // 'Inter-Regular': require('@/assets/fonts/Inter-Regular.ttf'),
          // 'Inter-Medium': require('@/assets/fonts/Inter-Medium.ttf'),
          // 'Inter-SemiBold': require('@/assets/fonts/Inter-SemiBold.ttf'),
          // 'Inter-Bold': require('@/assets/fonts/Inter-Bold.ttf'),
          // 'Manrope-Regular': require('@/assets/fonts/Manrope-Regular.ttf'),
          // 'Manrope-Medium': require('@/assets/fonts/Manrope-Medium.ttf'),
          // 'Manrope-SemiBold': require('@/assets/fonts/Manrope-SemiBold.ttf'),
          // 'Manrope-Bold': require('@/assets/fonts/Manrope-Bold.ttf'),
        });
        setFontsLoaded(true);
      } catch (e) {
        console.warn('Error loading fonts:', e);
        // Continue even if fonts fail to load
        setFontsLoaded(true);
      }
    }
    
    loadFonts();
  }, []);
  
  // Load persisted state
  useEffect(() => {
    async function loadState() {
      try {
        await loadPersistedState();
        setPersistenceLoaded(true);
      } catch (e) {
        console.warn('Error loading persisted state:', e);
        // Continue even if persistence fails
        setPersistenceLoaded(true);
      }
    }
    
    loadState();
  }, [loadPersistedState]);
  
  // Track app open event
  useEffect(() => {
    Analytics.trackAppOpen();
    
    // Set up app state change listener
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    
    return () => {
      subscription.remove();
    };
  }, [handleAppStateChange]);
  
  // Set app ready when all initialization is complete
  useEffect(() => {
    if (fontsLoaded && persistenceLoaded) {
      // Add a short delay for a smoother transition
      const timer = setTimeout(() => {
        setAppIsReady(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [fontsLoaded, persistenceLoaded]);

  // Hide splash screen when app is ready
  useEffect(() => {
    if (appIsReady) {
      // Hide splash screen with a slight delay for smoother transition
      const timer = setTimeout(() => {
        SplashScreen.hideAsync().catch(e => {
          console.warn('Error hiding splash screen:', e);
        });
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [appIsReady]);

  return { 
    appIsReady,
    colorScheme,
    fontsLoaded,
    persistenceLoaded
  };
}
