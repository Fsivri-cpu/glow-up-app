import React, { useEffect, useCallback } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSequence, 
  withDelay,
  Easing,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';
import { Analytics } from '@/utils/analytics';

export default function SplashScreen({ onComplete }: { onComplete?: () => void } = {}) {
  const { colors } = useTheme();
  
  // Animation values
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.8);
  const sparkleOpacity = useSharedValue(0);
  const sparkleScale = useSharedValue(0.5);
  const sparkleRotate = useSharedValue(0);
  
  // Safe navigation function that works in both TestApp and Expo Router contexts
  const navigateToWelcome = useCallback(() => {
    if (onComplete) {
      // If onComplete is provided (TestApp context), use it
      onComplete();
    } else {
      // In Expo Router context, we need to dynamically import the router
      // to avoid the "isReady" error
      try {
        // Only import in web/native contexts where expo-router is available
        if (Platform.OS !== 'web') {
          const { router } = require('expo-router');
          router.replace('/welcome');
        }
      } catch (error) {
        console.log('Navigation not available');
      }
    }
  }, [onComplete]);
  
  // Track app open event
  useEffect(() => {
    Analytics.trackAppOpen();
  }, []);

  useEffect(() => {
    // Start logo animations with elegant easing
    logoOpacity.value = withTiming(1, { 
      duration: 800, 
      easing: Easing.bezier(0.25, 0.1, 0.25, 1) 
    });
    
    logoScale.value = withSequence(
      withTiming(1.05, { 
        duration: 700,
        easing: Easing.bezier(0.34, 1.56, 0.64, 1) // Soft overshoot
      }),
      withTiming(1, { 
        duration: 500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1)
      })
    );
    
    // Add sparkle effect animation
    sparkleOpacity.value = withDelay(400, withTiming(1, { duration: 600 }));
    sparkleScale.value = withDelay(400, withTiming(1, { duration: 800 }));
    sparkleRotate.value = withDelay(400, withTiming(1, { duration: 1000 }));
    
    // Auto-navigate to welcome screen after animations
    const timer = setTimeout(() => {
      navigateToWelcome();
    }, 2800);

    return () => clearTimeout(timer);
  }, []);
  
  // Animated styles
  const logoAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: logoOpacity.value,
      transform: [{ scale: logoScale.value }]
    };
  });
  
  // Sparkle effect animation
  const sparkleAnimatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      sparkleRotate.value,
      [0, 1],
      [0, 15],
      Extrapolate.CLAMP
    );
    
    return {
      opacity: sparkleOpacity.value,
      transform: [
        { scale: sparkleScale.value },
        { rotate: `${rotate}deg` }
      ]
    };
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.logoContainer}>
        {/* Main logo */}
        <Animated.Image
          source={require('../assets/images/glowup_logo.png')}
          style={[styles.logo, logoAnimatedStyle]}
          resizeMode="contain"
        />
        
        {/* Sparkle effect overlay */}
        <Animated.View style={[styles.sparkleContainer, sparkleAnimatedStyle]}>
          <View style={styles.sparkle} />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEEF2', // Updated to match welcome screen
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  logo: {
    width: 240,
    height: 240,
  },
  sparkleContainer: {
    position: 'absolute',
    width: 280,
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sparkle: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    top: 70,
    right: 70,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 5,
  },
});
