import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet, LogBox } from 'react-native';

// Ignore specific warnings that might be related to the manifest JSON parsing error
LogBox.ignoreLogs(['Failed to parse manifest JSON']);

// Import screens directly
import SplashScreen from './app/splash';
import WelcomeScreen from './app/welcome';
import NameScreen from './app/onboarding/name';
import IconScreen from './app/onboarding/icon';
import GoalsScreen from './app/onboarding/goals';
import LoadingScreen from './app/onboarding/loading';
import NotificationsScreen from './app/onboarding/notifications';
import RatingScreen from './app/onboarding/rating';
import PaywallScreen from './app/paywall';
import { AppProvider } from './context/AppContext';
import { Colors } from './constants/Colors';

// Define all possible screens in the app
type AppScreen = 'splash' | 'welcome' | 'name' | 'icon' | 'goals' | 'loading' | 'notifications' | 'rating' | 'paywall' | 'tabs';

/**
 * Standalone app with reliable navigation between screens
 * This eliminates manifest JSON parsing errors by not relying on Expo Router
 */
export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('splash');
  
  // Handle splash screen timing
  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('welcome');
      }, 2800);
      
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);
  
  // Navigation handlers
  const navigateToScreen = (screen: AppScreen) => {
    setCurrentScreen(screen);
  };
  
  // Render the appropriate screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onComplete={() => navigateToScreen('welcome')} />;
      
      case 'welcome':
        return <WelcomeScreen onContinue={() => navigateToScreen('name')} />;
      
      case 'name':
        return <NameScreen onContinue={() => navigateToScreen('icon')} />;
      
      case 'icon':
        return <IconScreen onContinue={() => navigateToScreen('goals')} />;
      
      case 'goals':
        return <GoalsScreen onContinue={() => navigateToScreen('loading')} />;
        
      case 'loading':
        return <LoadingScreen onContinue={() => navigateToScreen('notifications')} />;
      
      case 'notifications':
        return <NotificationsScreen onContinue={() => navigateToScreen('rating')} />;
        
      case 'rating':
        return <RatingScreen onContinue={() => navigateToScreen('paywall')} />;
        
      case 'paywall':
        return <PaywallScreen onClose={() => navigateToScreen('tabs')} />;
      
      case 'tabs':
        // This would normally navigate to the main app tabs
        // For now, we'll just return to the welcome screen
        return <WelcomeScreen onContinue={() => navigateToScreen('name')} />;
      
      default:
        return <WelcomeScreen onContinue={() => navigateToScreen('name')} />;
    }
  };
  
  return (
    <SafeAreaProvider>
      <AppProvider>
        {renderScreen()}
        <StatusBar style="auto" />
      </AppProvider>
    </SafeAreaProvider>
  );
}
