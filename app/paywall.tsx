import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  useWindowDimensions, 
  ScrollView 
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Close Button */}
      <View style={styles.header}>
        <Pressable
          onPress={handleDismiss}
          style={styles.closeButton}
          accessibilityLabel="Close paywall"
          accessibilityRole="button"
        >
          <Ionicons name="close" size={24} color="#666" />
        </Pressable>
      </View>
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View 
          entering={FadeIn.duration(600)}
        >
          <TitleBlock 
            title="Unlock Premium Features"
            subtitle="Take your glow-up journey to the next level"
          />
        </Animated.View>
          
        {/* Feature List */}
        <Animated.View 
          style={styles.featuresContainer}
          entering={FadeInDown.delay(300).duration(600)}
        >
          <Text style={styles.featuresTitle}>GlowUp Pro Includes:</Text>
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

        {/* CTA Button */}
        <Animated.View 
          style={styles.ctaContainer}
          entering={FadeInDown.delay(900).duration(600)}
        >
          <Button
            title={`Continue with ${selectedPlan === 'yearly' ? 'Yearly' : 'Weekly'} Plan`}
            onPress={handleSubscribe}
            isLoading={isLoading}
            style={styles.subscribeButton}
          />
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8E1E7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
  },
  closeButton: {
    padding: 8,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
    alignItems: 'center',
  },
  featuresContainer: {
    width: '100%',
    marginBottom: 24,
    marginTop: 16,
  },
  featuresTitle: {
    fontFamily: 'Manrope',
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 16,
    marginRight: 12,
    color: '#D671A1',
  },
  featureText: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#333333',
  },
  ctaContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
  },
  subscribeButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#B56DA5',
    borderRadius: 28,
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
