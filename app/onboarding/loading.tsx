import React, { useEffect } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, withSequence, FadeIn, FadeInDown } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAppContext } from '@/context/AppContext';
import { Analytics } from '@/utils/analytics';

interface LoadingScreenProps {
  onContinue?: () => void;
}

export default function LoadingScreen({ onContinue }: LoadingScreenProps) {
  const { state } = useAppContext();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { width } = useWindowDimensions();
  
  const maxWidth = Math.min(width, 480);
  const userName = state.user?.name || '';
  
  // Animation values
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.6);

  useEffect(() => {
    // Track screen view
    Analytics.trackPageView('/onboarding/loading');
    
    // Start pulse animation
    scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 800 }),
        withTiming(1, { duration: 800 })
      ),
      -1, // Infinite repeat
      true // Reverse
    );
    
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 800 }),
        withTiming(0.6, { duration: 800 })
      ),
      -1, // Infinite repeat
      true // Reverse
    );
    
    // Auto-navigate to notifications screen after 2.5 seconds
    const timer = setTimeout(() => {
      if (onContinue) {
        onContinue();
      } else {
        // Fallback to router navigation when used with Expo Router
        router.push('/onboarding/notifications');
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, []);
  
  // Animated styles
  const logoAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress bar removed */}
      <View style={[styles.content, { maxWidth }]}>
        <View style={styles.centerContainer}>
          <Animated.Image
            source={require('../../assets/images/glowup_logo.png')}
            style={[styles.logoImage, logoAnimatedStyle]}
            resizeMode="contain"
          />
          
          <Animated.Text 
            style={[styles.titleText, { color: colors.text }]}
            entering={FadeInDown.delay(300).duration(600)}
          >
            Creating your personalized plan
          </Animated.Text>
          
          {userName ? (
            <Animated.Text 
              style={[styles.subtitleText, { color: colors.mediumGray }]}
              entering={FadeIn.delay(600).duration(600)}
            >
              Just a moment, {userName}...
            </Animated.Text>
          ) : null}
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} style={styles.spinner} />
          <Text style={[styles.loadingText, { color: colors.text }]}>
            Almost ready, {userName}...
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8E1E7', // Blush Pink
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  logoImage: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  titleText: {
    fontFamily: 'Manrope',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitleText: {
    fontFamily: 'Inter',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    marginBottom: 24,
  },
  loadingText: {
    fontFamily: 'Manrope',
    fontSize: 20,
    color: '#333333', // Charcoal
    textAlign: 'center',
  },
});
