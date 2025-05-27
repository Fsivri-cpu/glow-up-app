import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  useWindowDimensions,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { Analytics } from '@/utils/analytics';
import PricingCards, { PlanType } from '@/components/ui/PricingCards';
import Button from '@/components/ui/Button';

/**
 * PaywallScreen - Displays subscription options with feature list
 */
export default function PaywallScreen() {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('yearly');
  const [isLoading, setIsLoading] = useState(false);
  const { width } = useWindowDimensions();
  const maxWidth = Math.min(width - 48, 480);

  // Features list for Pro plan
  const features = [
    'Unlimited habit tracking',
    'Personalized insights and analytics',
    'Premium content and guided journeys',
    'Priority customer support',
    'Ad-free experience',
    'Dark mode and custom themes'
  ];

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
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View 
          style={styles.header}
          entering={FadeIn.duration(600)}
        >
          <Image
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Unlock Your Full Potential</Text>
          <Text style={styles.subtitle}>
            Get premium features to accelerate your glow-up journey
          </Text>
        </Animated.View>

        {/* Features List */}
        <Animated.View 
          style={[styles.featuresContainer, { maxWidth }]}
          entering={FadeInDown.delay(300).duration(600)}
        >
          <Text style={styles.featuresTitle}>GlowUp Pro Includes:</Text>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Text style={styles.featureIcon}>✨</Text>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </Animated.View>

        {/* Pricing Cards */}
        <Animated.View
          entering={FadeInDown.delay(600).duration(600)}
        >
          <PricingCards
            selectedPlan={selectedPlan}
            onSelectPlan={setSelectedPlan}
          />
        </Animated.View>

        {/* CTA Button */}
        <Animated.View 
          style={[styles.ctaContainer, { maxWidth }]}
          entering={FadeInDown.delay(900).duration(600)}
        >
          <Button
            title={`Continue with ${selectedPlan === 'yearly' ? 'Yearly' : 'Weekly'} Plan`}
            onPress={handleSubscribe}
            isLoading={isLoading}
            style={styles.subscribeButton}
            accessibilityLabel="Subscribe to selected plan"
          />
          <Text 
            style={styles.dismissText}
            onPress={handleDismiss}
          >
            Maybe later
          </Text>
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
    backgroundColor: 'white',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Manrope',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222222',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  featuresContainer: {
    width: '100%',
    marginBottom: 24,
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
  dismissText: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#666666',
    marginTop: 16,
    padding: 8,
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
