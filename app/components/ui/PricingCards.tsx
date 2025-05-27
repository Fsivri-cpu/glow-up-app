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

export type PlanType = 'weekly' | 'yearly';

interface PricingCardsProps {
  selectedPlan: PlanType;
  onSelectPlan: (plan: PlanType) => void;
}

/**
 * PricingCards component for displaying subscription options
 * with clear comparison and aesthetic layout
 */
export default function PricingCards({ selectedPlan, onSelectPlan }: PricingCardsProps) {
  const { width } = useWindowDimensions();
  const maxWidth = Math.min(width - 48, 480);
  
  // Animation values
  const yearlyScale = useSharedValue(selectedPlan === 'yearly' ? 1.02 : 1);
  const weeklyScale = useSharedValue(selectedPlan === 'weekly' ? 1.02 : 1);
  
  // Handle plan selection
  const handleSelectPlan = (plan: PlanType) => {
    // Provide haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    // Track selection
    Analytics.trackButtonClick(`select_${plan}_plan`, 'paywall');
    
    // Update animations
    yearlyScale.value = withTiming(plan === 'yearly' ? 1.02 : 1, { duration: 200 });
    weeklyScale.value = withTiming(plan === 'weekly' ? 1.02 : 1, { duration: 200 });
    
    // Call the parent callback
    onSelectPlan(plan);
  };
  
  // Animated styles
  const yearlyCardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: yearlyScale.value }],
    };
  });
  
  const weeklyCardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: weeklyScale.value }],
    };
  });
  
  return (
    <View style={[styles.container, { maxWidth }]}>
      {/* Yearly Plan Card (Highlighted) */}
      <Animated.View style={[
        styles.card, 
        styles.yearlyCard,
        selectedPlan === 'yearly' && styles.selectedCard,
        yearlyCardStyle
      ]}>
        <Pressable 
          style={styles.cardContent}
          onPress={() => handleSelectPlan('yearly')}
          accessibilityLabel="Select yearly plan"
          accessibilityRole="radio"
          accessibilityState={{ checked: selectedPlan === 'yearly' }}
        >
          <View style={styles.cardRow}>
            <Text style={styles.planTitle}>Yearly Plan</Text>
            <Text style={styles.planPrice}>$0.77/week</Text>
          </View>
          
          <View style={styles.cardRow}>
            <View style={styles.subInfoContainer}>
              <Text style={styles.subInfo}>$39.99/year</Text>
              <View style={styles.saveBadge}>
                <Text style={styles.saveBadgeText}>SAVE 89%</Text>
              </View>
            </View>
            <Text style={styles.trialInfo}>3 Days Free Trial</Text>
          </View>
        </Pressable>
      </Animated.View>
      
      {/* Weekly Plan Card */}
      <Animated.View style={[
        styles.card, 
        styles.weeklyCard,
        selectedPlan === 'weekly' && styles.selectedCard,
        weeklyCardStyle
      ]}>
        <Pressable 
          style={styles.cardContent}
          onPress={() => handleSelectPlan('weekly')}
          accessibilityLabel="Select weekly plan"
          accessibilityRole="radio"
          accessibilityState={{ checked: selectedPlan === 'weekly' }}
        >
          <View style={styles.cardRow}>
            <Text style={styles.planTitle}>Weekly Plan</Text>
            <Text style={styles.planPrice}>$6.99/week</Text>
          </View>
          
          <View style={styles.cardRow}>
            <View />
            <Text style={styles.weeklyBillingInfo}>Billed Weekly</Text>
          </View>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 16,
  },
  card: {
    width: '100%',
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
  },
  yearlyCard: {
    backgroundColor: '#FDE6EE',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  weeklyCard: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#B56DA5',
    shadowColor: '#B56DA5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  cardContent: {
    padding: 20,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  planTitle: {
    fontFamily: 'Manrope',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222222',
  },
  planPrice: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#333333',
  },
  subInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subInfo: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#666666',
    marginRight: 8,
  },
  saveBadge: {
    backgroundColor: '#D671A1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  saveBadgeText: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  trialInfo: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#D671A1',
    textAlign: 'right',
  },
  weeklyBillingInfo: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#D671A1',
  },
});
