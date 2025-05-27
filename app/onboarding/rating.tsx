import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  useWindowDimensions, 
  Linking, 
  Platform, 
  Pressable,
  KeyboardAvoidingView,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAppContext } from '@/context/AppContext';
import { Analytics } from '@/utils/analytics';
import { sharedStyles, LAYOUT } from '../styles/SharedStyles';
import StandardLayout from '../components/layout/StandardLayout';
import TitleBlock from '../components/ui/TitleBlock';
import ButtonBlock from '../components/ui/ButtonBlock';
import * as Haptics from 'expo-haptics';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

interface RatingScreenProps {
  onContinue?: () => void;
}

export default function RatingScreen({ onContinue }: RatingScreenProps) {
  const { dispatch } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { width, height } = useWindowDimensions();
  
  // For responsive layout
  const maxWidth = Math.min(width, 480);
  const isSmallDevice = height < 700;
  
  // Track rating prompt shown on component mount
  useEffect(() => {
    Analytics.trackPageView('onboarding_rating');
    Analytics.trackRatingPromptShown();
  }, []);

  const handleRateApp = async () => {
    try {
      setIsLoading(true);
      
      // Track rating button click
      Analytics.trackButtonClick('rate_app', 'rating_screen');
      
      // Provide haptic feedback
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      // Platform-specific store URLs
      // For iOS: App Store
      if (Platform.OS === 'ios') {
        Linking.openURL('https://apps.apple.com/app/id1234567890');
      }
      // For Android: Play Store
      else if (Platform.OS === 'android') {
        Linking.openURL('https://play.google.com/store/apps/details?id=com.glowup.app');
      }
      
      // Complete onboarding and navigate to the next screen
      await completeOnboarding();
    } catch (error) {
      console.error('Error opening store URL:', error);
      // Navigate anyway if there's an error
      await completeOnboarding();
    } finally {
      setIsLoading(false);
    }
  };

  const handleMaybeLater = async () => {
    try {
      setIsLoading(true);
      
      // Track skip button click
      Analytics.trackButtonClick('maybe_later', 'rating_screen');
      
      // Provide haptic feedback
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      
      // Complete onboarding and navigate to paywall
      await completeOnboarding();
    } catch (error) {
      console.error('Error skipping rating:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const completeOnboarding = async () => {
    // Mark onboarding as complete
    dispatch({ type: 'COMPLETE_ONBOARDING' });
    
    // Small delay to ensure state is updated
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Navigate to home screen
    if (onContinue) {
      onContinue();
    } else {
      router.push('/');
    }
  };

  return (
    <StandardLayout
      currentStep={6}
      totalSteps={6}
    >
      {/* Title */}
      <TitleBlock 
        title="How are you enjoying GlowUp?" 
        subtitle="Your feedback helps us improve"
      />
      
      {/* Heart Icon */}
      <View style={styles.heartIconContainer}>
        <Animated.Image
          source={require('@/assets/images/heart_icon_transparent.png')}
          style={styles.heartIcon}
          resizeMode="contain"
          entering={FadeIn.delay(300).duration(800)}
        />
      </View>
      
      {/* Rating Text */}
      <Text style={styles.bodyText}>
        Tap the heart to rate us 5 stars!
      </Text>
      
      {/* Bottom Actions */}
      <ButtonBlock
        primaryButtonTitle="Rate GlowUp"
        onPrimaryPress={handleRateApp}
        secondaryButtonTitle="Maybe Later"
        onSecondaryPress={handleMaybeLater}
        testID="rating-button"
      />
    </StandardLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8E1E7', // Blush Pink per spec
  },
  keyboardAvoidView: {
    flex: 1,
  },
  content: {
    ...sharedStyles.content,
    alignItems: 'center',
  },
  bodyContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    maxWidth: 320, // 320px max width per spec
    marginBottom: 32, // 32px margin bottom per spec
  },
  header: {
    ...sharedStyles.header,
  },
  heartIconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32, // 32px margin bottom per spec
  },
  title: {
    ...sharedStyles.title,
  },
  heartIcon: {
    width: 160, // 160px width per spec (20% of screen height)
    height: 160, // 160px height per spec (20% of screen height)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  bodyText: {
    fontFamily: 'Inter',
    fontSize: 16, // 16pt per spec
    fontStyle: 'italic', // Italic per spec
    color: '#666666', // Medium gray per spec
    textAlign: 'center',
    lineHeight: 24, // 24pt line height per spec
  },
  actionsContainer: {
    ...sharedStyles.buttonContainer,
    alignItems: 'center',
  },
  rateButton: {
    ...sharedStyles.primaryButton,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  rateButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#FFFFFF', // White per spec
    textAlign: 'center',
  },
  maybeLaterButton: {
    padding: 12,
    minHeight: 44, // Minimum tap target size per spec
    minWidth: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  maybeLaterText: {
    fontFamily: 'Inter',
    fontSize: 14, // 14pt per spec
    color: '#999999', // Soft gray per spec
    textAlign: 'center',
  },
});
