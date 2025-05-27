import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  useWindowDimensions, 
  ScrollView,
  ImageBackground,
  Image
} from 'react-native';
import { BlurView } from 'expo-blur';
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
import TitleBlock from './components/ui/TitleBlock';

interface PaywallScreenProps {
  onClose?: () => void;
}

/**
 * PaywallScreen - Displays subscription options with feature list
 */
export default function PaywallScreen({ onClose }: PaywallScreenProps) {
  const { dispatch } = useAppContext();
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('yearly');
  const [isLoading, setIsLoading] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { width } = useWindowDimensions();
  const maxWidth = Math.min(width - 48, 480);

  // Features list for Pro plan
  const features = [
    { icon: '📚', text: 'Unlimited habit & routine tracking' },
    { icon: '✨', text: 'Personalized glow-up challenges' },
    { icon: '💎', text: 'Premium themes & customization' },
    { icon: '🔔', text: 'Gentle reminders that keep you going' }
  ];

  // Track screen view
  useEffect(() => {
    Analytics.trackPageView('paywall');
    Analytics.trackButtonClick('paywall_viewed', 'paywall');
  }, []);

  // Handle subscription
  const handleSubscribe = async () => {
    // Track subscription attempt
    Analytics.trackButtonClick('subscribe_attempt', 'paywall', {
      plan: selectedPlan
    });

    // Provide haptic feedback
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    // Show loading state
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Track successful subscription
      Analytics.trackButtonClick('subscribe_success', 'paywall', {
        plan: selectedPlan
      });

      // Update app context
      dispatch({ type: 'UPDATE_SUBSCRIPTION', payload: 'pro' });

      // Navigate to home or previous screen
      if (onClose) {
        onClose();
      } else {
        router.replace('/(tabs)');
      }
    } catch (error) {
      // Handle error
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

  return (
    <View style={styles.rootContainer}>
      <Image
        source={require('../assets/images/realistic_background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <BlurView 
        intensity={35} 
        tint="light" 
        style={styles.blurContainer}
      />
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          {/* Close Button */}
          <View style={styles.header}>
            <Pressable
              onPress={handleDismiss}
              style={styles.closeButton}
              accessibilityLabel="Close paywall"
              accessibilityRole="button"
            >
              <Ionicons name="close" size={24} color="#333" />
            </Pressable>
            <Pressable
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
            {/* Header */}
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
              {features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Text style={styles.featureIcon}>{feature.icon}</Text>
                  <Text style={styles.featureText}>{feature.text}</Text>
                </View>
              ))}
            </Animated.View>

            {/* Pricing Cards */}
            <Animated.View
              style={{ width: '100%', alignItems: 'center' }}
              entering={FadeInDown.delay(600).duration(600)}
            >
              <PricingCards
                selectedPlan={selectedPlan}
                onSelectPlan={setSelectedPlan}
              />
            </Animated.View>


          </ScrollView>
          
          {/* Fixed Bottom Button and Footer */}
          <View style={styles.fixedBottomContainer}>
            {/* Try for Free Button */}
            <Animated.View 
              style={styles.buttonContainer}
              entering={FadeInDown.delay(800).duration(600)}
            >
              <Pressable 
                style={styles.tryButton}
                onPress={handleSubscribe}
                accessibilityLabel="Try for free"
                accessibilityRole="button"
              >
                <Text style={styles.tryButtonText}>{selectedPlan === 'yearly' ? 'Try for Free' : 'Start Now'}</Text>
              </Pressable>
            </Animated.View>

            {/* Terms and Payment Info */}
            <Animated.View 
              style={styles.termsContainer}
              entering={FadeInDown.delay(900).duration(600)}
            >
              <Text style={styles.termsText}>Terms | Privacy</Text>
              
              <View style={styles.paymentInfoContainer}>
                <View style={styles.checkmarkContainer}>
                  <Text style={styles.checkmark}>✓</Text>
                </View>
                <Text style={styles.paymentInfoText}>No Payment Now</Text>
              </View>
              
              <Text style={styles.cancelText}>Cancel Anytime</Text>
            </Animated.View>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#000',
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  blurContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.45)',
    zIndex: 2,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 16,
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Manrope',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    width: '100%',
  },
  closeButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  restoreButton: {
    padding: 8,
  },
  restoreText: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 120, // Daha fazla boşluk bırakarak alttaki buton ve footer için yer açıyoruz
    alignItems: 'center',
  },
  featuresContainer: {
    width: '100%',
    marginBottom: 24,
    marginTop: 0,
    backgroundColor: 'transparent',
    padding: 0,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 16,
    color: '#333333',
    width: 30,
  },
  featureText: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 24,
    position: 'relative',
    zIndex: 10,
  },
  tryButton: {
    backgroundColor: '#B56DA5',
    borderRadius: 28,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  tryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Manrope',
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
    color: '#FFFFFF',
  },
  fixedBottomContainer: {
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  termsContainer: {
    width: '100%',
    marginTop: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  termsText: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#666666',
    textAlign: 'left',
  },
  paymentInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkContainer: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
  checkmark: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  paymentInfoText: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#666666',
  },
  cancelText: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#666666',
    textAlign: 'right',
  },
});
