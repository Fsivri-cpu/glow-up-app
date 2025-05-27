import React, { useEffect } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Pressable, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';
import { Analytics } from '@/utils/analytics';
import ButtonBlock from './components/ui/ButtonBlock';

interface WelcomeScreenProps {
  onContinue?: () => void;
}

export default function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  const { colors, typography, spacing } = useTheme();
  const { width, height } = useWindowDimensions();
  const maxWidth = Math.min(width, 480);
  const buttonWidth = width * 0.85; // 85% of screen width
  
  // Track screen view
  useEffect(() => {
    Analytics.trackPageView('/welcome');
  }, []);

  const handleContinue = () => {
    Analytics.trackButtonClick('welcome_continue', 'welcome');
    
    // Use the provided onContinue prop if available, otherwise use router
    if (onContinue) {
      onContinue();
    } else {
      // Fallback to router navigation when used with Expo Router
      router.navigate('/onboarding/name');
    }
  };
  
  // Privacy policy and terms handlers removed

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#F8E1E7', '#F8E1E7']}
        style={styles.container}
      >
        <View style={styles.content}>
          {/* Logo at the top */}
          <View style={styles.topSpace} />
          
          <View style={styles.logoContainer}>
            <Image 
              source={require('../assets/images/glowup_logo.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          
          {/* Title and subtitle positioned closer to the button */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              Glow Up
            </Text>
            
            <Text style={styles.subtitle}>
              Where consistency becomes confidence.
              <Text style={styles.emoji}> 💫</Text>
            </Text>
          </View>
          
          {/* Standardized Button Block for consistent positioning */}
          <ButtonBlock
            primaryButtonTitle="Start Your Journey"
            onPrimaryPress={handleContinue}
            testID="welcome-button"
            showSecondaryButton={true}
          />
          
          {/* Terms & Privacy Footer */}
          <Text style={styles.footerText}>
            By continuing, you agree to our Terms & Privacy.
          </Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topSpace: {
    flex: 0.1, // Small space at the top
  },
  logoContainer: {
    flex: 0.4, // Takes up more space for the logo
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 180, // Larger logo
    height: 180, // Larger logo
    borderRadius: 36, // Proportionally larger border radius
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  textContainer: {
    flex: 0.3, // Text container takes less space
    alignItems: 'center',
    justifyContent: 'flex-end', // Align to bottom of its container
    marginBottom: 20, // Space between text and button
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333030',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'italic',
    color: '#5E5E5E',
    textAlign: 'center',
  },
  emoji: {
    fontSize: 16,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 16,
  },
  journeyButton: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    backgroundColor: '#B7659D',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  termsText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#5E5E5E',
    opacity: 0.6,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 8,
  },
  footerText: {
    fontFamily: 'Inter',
    fontSize: 10,
    color: '#999999',
    textAlign: 'center',
    marginTop: 8,
  },
  termsLink: {
    textDecorationLine: 'underline',
  },
});
