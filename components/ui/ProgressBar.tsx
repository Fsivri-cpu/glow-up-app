import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ProgressBarProps {
  /**
   * Current step (1-indexed)
   */
  currentStep: number;
  
  /**
   * Total number of steps
   */
  totalSteps: number;
  
  /**
   * Optional custom height for the progress bar
   */
  height?: number;
  
  /**
   * Optional custom styles for the container
   */
  style?: object;
}

/**
 * A reusable progress bar component for the onboarding flow
 */
export default function ProgressBar({ 
  currentStep, 
  totalSteps, 
  height = 4,
  style = {}
}: ProgressBarProps) {
  // Calculate progress percentage
  const progressPercentage = (currentStep / totalSteps) * 100;
  
  return (
    <View style={[styles.container, style]}>
      <View style={[
        styles.progressBar, 
        { height }
      ]}>
        <View 
          style={[
            styles.progressIndicator, 
            { 
              width: `${progressPercentage}%`,
              height
            }
          ]} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
  progressBar: {
    backgroundColor: 'rgba(181, 109, 165, 0.2)', // Plum with opacity
    borderRadius: 2,
    width: '100%',
  },
  progressIndicator: {
    backgroundColor: '#B56DA5', // Plum
    borderRadius: 2,
  },
});
