import React from 'react';
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
  FadeIn,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Analytics } from '@/utils/analytics';

export type PlanType = 'monthly' | 'yearly';

interface PricingCardsProps {
  selectedPlan: PlanType;
  onSelectPlan: (plan: PlanType) => void;
}

/**
 * PricingCards component displays subscription options
 * with clear comparison and aesthetic layout
 */
export default function PricingCards({ selectedPlan, onSelectPlan }: PricingCardsProps) {
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
  

  
  return (
    <View style={[styles.container, { maxWidth }]}>
      <Text style={styles.chooseText}>Choose your plan</Text>
      
      {/* Yearly Plan Card */}
      <Pressable 
        style={[
          styles.card, 
          selectedPlan === 'yearly' && styles.selectedCard,
        ]}
        onPress={() => handleSelectPlan('yearly')}
        accessibilityLabel="Select yearly plan"
        accessibilityRole="radio"
        accessibilityState={{ checked: selectedPlan === 'yearly' }}
      >
        <View style={styles.cardContent}>
          {/* SAVE Badge - Full Width */}
          <View style={styles.saveBadgeContainer}>
            <View style={styles.saveBadge}>
              <Text style={styles.saveBadgeText}>SAVE 46%</Text>
            </View>
          </View>
          
          {/* Card Content - Below the badge */}
          <View style={styles.cardContentBelow}>
            <View style={styles.leftSection}>
              <Text style={styles.planTitle}>Yearly Plan</Text>
              <Text style={styles.yearlyPrice}>$44.99/year</Text>
            </View>
            
            <View style={styles.rightSection}>
              <Text style={styles.planPrice}>$3.75/month</Text>
              <Text style={styles.trialInfo}>7 Days Free Trial</Text>
            </View>
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
          {/* Card Content - No badge for monthly plan */}
          <View style={[styles.cardContentBelow, { marginTop: 16 }]}>
            <View style={styles.leftSection}>
              <Text style={styles.planTitle}>Monthly Plan</Text>
            </View>
            
            <View style={styles.rightSection}>
              <Text style={styles.planPrice}>$6.99/month</Text>
              <Text style={styles.billingInfo}>Billed Monthly</Text>
            </View>
          </View>
        </View>
      </Pressable>
      


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
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedCard: {
    backgroundColor: '#EED2E7',
    borderWidth: 2,
    borderColor: '#B56DA5',
    shadowColor: '#B56DA5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  cardContent: {
    padding: 0,
    position: 'relative',
    paddingBottom: 16,
  },
  cardContentBelow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 36,
    paddingHorizontal: 16,
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  middleSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  planTitle: {
    fontFamily: 'Manrope',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  yearlyPrice: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  planPrice: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    color: '#333333',
  },
  saveBadgeContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  saveBadge: {
    backgroundColor: '#B56DA5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: '100%',
    alignItems: 'center',
  },
  saveBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Inter',
  },
  trialInfo: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#B56DA5',
    fontWeight: 'bold',
    marginTop: 4,
  },
  billingInfo: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  }
});
