import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  useWindowDimensions, 
  ScrollView,
  ImageBackground,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAppContext } from '@/context/AppContext';
import { Analytics } from '@/utils/analytics';
import Button from './components/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import PricingCards, { PlanType } from './components/ui/PricingCards';

interface PaywallScreenProps {
  onClose?: () => void;
}

/**
 * PaywallScreen - Displays subscription options with feature list
 * Updated design with background image and luxury aesthetic
 */
export default function PaywallScreen({ onClose }: PaywallScreenProps) {
  const { dispatch } = useAppContext();
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('yearly');
  const [isLoading, setIsLoading] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { width } = useWindowDimensions();
  const maxWidth = Math.min(width - 48, 480);

  // Track screen view
  useEffect(() => {
    Analytics.trackPageView('paywall');
    Analytics.trackButtonClick('paywall_viewed', 'paywall');
  }, []);

  // Handle subscription purchase
  const handleSubscribe = async () => {
    try {
      setIsLoading(true);
      
      // Track subscription attempt
      Analytics.trackButtonClick('subscribe_button', 'paywall', {
        plan_type: selectedPlan
      });
      
      // Provide haptic feedback
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      // In a real app, this would initiate the purchase flow
      // For demo purposes, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update subscription status in app context
      dispatch({ type: 'UPDATE_SUBSCRIPTION', payload: 'pro' });
      
      // Navigate to success screen or home
      router.push('/');
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle dismissing the paywall
  const handleDismiss = () => {
    // Track dismiss action
    Analytics.trackButtonClick('dismiss_paywall', 'paywall');
    
    // Provide haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    // Navigate back or to home
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  // Handle restore purchases
  const handleRestorePurchases = async () => {
    try {
      setIsLoading(true);
      
      // Track restore attempt
      Analytics.trackButtonClick('restore_purchases', 'paywall');
      
      // Provide haptic feedback
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      
      // In a real app, this would trigger the purchase restore flow
      // For demo purposes, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      Alert.alert(
        'Purchases Restored',
        'Your purchases have been successfully restored.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Restore error:', error);
      Alert.alert(
        'Restore Failed',
        'There was an error restoring your purchases. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/realistic_background.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          {/* Top Buttons */}
          <View style={styles.header}>
            <Pressable
              onPress={handleDismiss}
              style={styles.closeButton}
              accessibilityLabel="Close paywall"
              accessibilityRole="button"
            >
              <Ionicons name="close" size={24} color="#333333" />
            </Pressable>
            
            <Pressable
              onPress={handleRestorePurchases}
              style={styles.restoreButton}
              accessibilityLabel="Restore purchases"
              accessibilityRole="button"
            >
              <Text style={styles.restoreText}>Restore</Text>
            </Pressable>
          </View>
          
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Title */}
            <Animated.View 
              entering={FadeIn.duration(600)}
              style={styles.titleContainer}
            >
              <Text style={styles.title}>Why upgrade to Pro?</Text>
            </Animated.View>
              
            {/* Feature List */}
            <Animated.View 
              style={styles.featuresContainer}
              entering={FadeInDown.delay(300).duration(600)}
            >
              <View style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <Text style={styles.featureEmoji}>📚</Text>
                </View>
                <Text style={styles.featureText}>Unlimited habit & routine tracking</Text>
              </View>
              
              <View style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <Text style={styles.featureEmoji}>✨</Text>
                </View>
                <Text style={styles.featureText}>Personalized glow-up challenges</Text>
              </View>
              
              <View style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <Text style={styles.featureEmoji}>💎</Text>
                </View>
                <Text style={styles.featureText}>Premium themes & customization</Text>
              </View>
              
              <View style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <Text style={styles.featureEmoji}>🔔</Text>
                </View>
                <Text style={styles.featureText}>Gentle reminders that keep you going</Text>
              </View>
            </Animated.View>

            {/* Pricing Cards with CTA Button */}
            <Animated.View
              style={{ width: '100%', alignItems: 'center' }}
              entering={FadeInDown.delay(600).duration(600)}
            >
              <PricingCards
                selectedPlan={selectedPlan}
                onSelectPlan={setSelectedPlan}
                onSubscribe={handleSubscribe}
              />
            </Animated.View>
            
            {/* Maybe Later Button */}
            <Animated.View 
              style={styles.dismissContainer}
              entering={FadeInDown.delay(900).duration(600)}
            >
              <Pressable 
                onPress={handleDismiss}
                style={styles.dismissButton}
              >
                <Text style={styles.dismissText}>Maybe later</Text>
              </Pressable>
            </Animated.View>

            {/* Terms and Conditions */}
            <Text style={styles.termsText}>
              By continuing, you agree to our Terms of Service and Privacy Policy. 
              Subscription automatically renews unless auto-renew is turned off at 
              least 24 hours before the end of the current period.
            </Text>
          </ScrollView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.65)', // Daha az bulanık overlay
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  closeButton: {
    padding: 8,
  },
  restoreButton: {
    padding: 8,
  },
  restoreText: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#333333',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Manrope',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },
  featuresContainer: {
    width: '100%',
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8E1E7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureEmoji: {
    fontSize: 20,
  },
  featureText: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#333333',
    flex: 1,
    lineHeight: 24,
  },
  dismissContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
  },
  dismissButton: {
    padding: 12,
    marginTop: 8,
  },
  dismissText: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#666666',
  },
  termsText: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
    marginTop: 24,
    lineHeight: 18,
  },
});
