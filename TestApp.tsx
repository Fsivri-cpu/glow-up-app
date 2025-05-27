import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import our actual screens
import WelcomeScreenComponent from './app/welcome';
import SplashScreenComponent from './app/splash';

/**
 * TestApp component
 * 
 * A standalone test app that allows us to test our screens without relying on Expo Router.
 * This app handles navigation between the splash screen and welcome screen.
 */
export default function TestApp() {
  const [screen, setScreen] = useState<'splash' | 'welcome'>('splash');
  
  useEffect(() => {
    // Auto-navigate to welcome screen after animations
    const timer = setTimeout(() => {
      setScreen('welcome');
    }, 2800); // Match the timing in the splash screen

    return () => clearTimeout(timer);
  }, []);
  
  return (
    <SafeAreaProvider>
      {screen === 'splash' ? (
        <SplashScreenComponent onComplete={() => setScreen('welcome')} />
      ) : (
        <WelcomeScreenComponent />
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  // No styles needed as we're using the components directly
});
