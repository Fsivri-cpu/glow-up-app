import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  useWindowDimensions 
} from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Analytics } from '@/utils/analytics';

export type PlanType = 'monthly' | 'yearly';

interface PricingCardsProps {
  selectedPlan: PlanType;
  onSelectPlan: (plan: PlanType) => void;
  onSubscribe: () => void;
}

/**
 * PricingCards component for displaying subscription options
 * with clear comparison and aesthetic layout
 */
export default function PricingCards({ selectedPlan, onSelectPlan, onSubscribe }: PricingCardsProps) {
  const { width } = useWindowDimensions();
  const maxWidth = Math.min(width - 48, 480);
  
  // Handle plan selection
  const handleSelectPlan = (plan: PlanType) => {
    // Provide haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    // Track selection
    Analytics.trackButtonClick(`select_${plan}_plan`, 'paywall');
    
    // Call the parent callback
    onSelectPlan(plan);
  };
  
  // Determine button text based on selected plan
  const getButtonText = () => {
    return selectedPlan === 'yearly' ? 'Try for Free' : 'Start Now';
  };
  
  return (
    <View style={[styles.container, { maxWidth }]}>
      <Text style={styles.chooseText}>Choose your plan</Text>
      
      {/* Yearly Plan Card */}
      <Pressable 
        style={[styles.card, selectedPlan === 'yearly' && styles.selectedCard]}
        onPress={() => handleSelectPlan('yearly')}
        accessibilityLabel="Select yearly plan"
        accessibilityRole="radio"
        accessibilityState={{ checked: selectedPlan === 'yearly' }}
      >
        <View style={styles.cardContent}>
          <View style={styles.planTitleContainer}>
            <Text style={styles.planTitle}>Yearly Plan</Text>
          </View>
          
          <View style={styles.priceContainer}>
            <Text style={styles.planPrice}>$3.75/month</Text>
            <Text style={styles.yearlyPrice}>$44.99/year</Text>
            <Text style={styles.trialInfo}>7 Days Free Trial</Text>
          </View>
          
          <View style={styles.saveBadge}>
            <Text style={styles.saveBadgeText}>SAVE 46%</Text>
          </View>
        </View>
      </Pressable>
      
      {/* Monthly Plan Card */}
      <Pressable 
        style={[styles.card, selectedPlan === 'monthly' && styles.selectedCard]}
        onPress={() => handleSelectPlan('monthly')}
        accessibilityLabel="Select monthly plan"
        accessibilityRole="radio"
        accessibilityState={{ checked: selectedPlan === 'monthly' }}
      >
        <View style={styles.cardContent}>
          <View style={styles.planTitleContainer}>
            <Text style={styles.planTitle}>Monthly Plan</Text>
          </View>
          
          <View style={styles.priceContainer}>
            <Text style={styles.planPrice}>$6.99/month</Text>
            <Text style={styles.billingInfo}>Billed Monthly</Text>
          </View>
        </View>
      </Pressable>
      
      {/* CTA Button */}
      <Pressable 
        style={styles.ctaButton}
        onPress={onSubscribe}
        accessibilityLabel={getButtonText()}
        accessibilityRole="button"
      >
        <Text style={styles.ctaButtonText}>{getButtonText()}</Text>
      </Pressable>
      
      {/* Terms and Payment Info */}
      <View style={styles.termsContainer}>
        <View style={styles.termsTextContainer}>
          <Text style={styles.termsText}>Terms | Privacy</Text>
        </View>
        
        <View style={styles.paymentInfoContainer}>
          <View style={styles.checkmarkContainer}>
            <Text style={styles.checkmark}>✓</Text>
          </View>
          <Text style={styles.paymentInfoText}>No Payment Now</Text>
        </View>
        
        <View style={styles.cancelContainer}>
          <Text style={styles.cancelText}>Cancel Anytime</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 16,
  },
  chooseText: {
    fontFamily: 'Manrope',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#D671A1',
    shadowColor: '#D671A1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  cardContent: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  planTitleContainer: {
    flex: 1,
  },
  planTitle: {
    fontFamily: 'Manrope',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  priceContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  planPrice: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  yearlyPrice: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  trialInfo: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  billingInfo: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#D671A1',
    marginTop: 4,
  },
  saveBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#D671A1',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  saveBadgeText: {
    fontFamily: 'Inter',
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  ctaButton: {
    width: '100%',
    backgroundColor: '#D671A1',
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  ctaButtonText: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  termsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  termsTextContainer: {
    flex: 1,
  },
  termsText: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#666666',
  },
  paymentInfoContainer: {
    flex: 1,
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
  cancelContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  cancelText: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#666666',
  },
});
