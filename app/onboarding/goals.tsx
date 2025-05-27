import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  ScrollView, 
  useWindowDimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAppContext } from '@/context/AppContext';
import { Analytics } from '@/utils/analytics';
import * as Haptics from 'expo-haptics';

const GOALS = [
  { id: 'morning', title: 'Build a soft morning routine', emoji: '🌅' },
  { id: 'reading', title: 'Read more and grow intellectually', emoji: '📚' },
  { id: 'selflove', title: 'Practice self-love daily', emoji: '💗' },
  { id: 'skincare', title: 'Create my ideal skincare routine', emoji: '🧴' },
  { id: 'fitness', title: 'Reach my goal body', emoji: '🏃‍♀️' },
];

interface GoalsScreenProps {
  onContinue?: () => void;
}

export default function GoalsScreen({ onContinue }: GoalsScreenProps) {
  const { state, dispatch } = useAppContext();
  const [selectedGoals, setSelectedGoals] = useState<string[]>(
    state.user?.selectedGoals || []
  );
  const [isLoading, setIsLoading] = useState(false);
  
  const { width } = useWindowDimensions();
  const isValid = selectedGoals.length > 0 && selectedGoals.length <= 3;

  const toggleGoal = (goalId: string) => {
    // Provide haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    setSelectedGoals(prev => {
      // Track goal selection/deselection
      const isSelected = prev.includes(goalId);
      if (isSelected) {
        Analytics.trackButtonClick(`deselect_goal_${goalId}`, 'onboarding_goals');
        return prev.filter(id => id !== goalId);
      } else {
        if (prev.length >= 3) {
          // Provide error haptic feedback if trying to select more than 3
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          return prev;
        }
        Analytics.trackButtonClick(`select_goal_${goalId}`, 'onboarding_goals');
        return [...prev, goalId];
      }
    });
  };

  const handleContinue = async () => {
    if (!isValid || !state.user) return;
    
    try {
      setIsLoading(true);
      
      // Provide success haptic feedback
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      // Track button click
      Analytics.trackButtonClick('continue_goals', 'onboarding_goals');
      selectedGoals.forEach(goalId => {
        Analytics.trackButtonClick(`selected_goal_${goalId}`, 'onboarding_goals_summary');
      });
      
      dispatch({
        type: 'SET_USER',
        payload: {
          ...state.user,
          selectedGoals,
        },
      });
      
      // Small delay to ensure state is updated
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Navigate to next screen
      if (onContinue) {
        onContinue();
      } else {
        // Fallback to router navigation when used with Expo Router
        router.push('/onboarding/loading');
      }
    } catch (error) {
      console.error('Error saving goals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>
      </View>
      
      {/* Title */}
      <View style={styles.header}>
        <Text style={styles.title}>What's part of your glow-up right now?</Text>
        <Text style={styles.subtitle}>Pick up to 3. Let's make it yours.</Text>
      </View>
      
      {/* Goals List */}
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.goalsContainer}>
          {GOALS.map(goal => (
            <Pressable
              key={goal.id}
              style={[
                styles.goalItem,
                selectedGoals.includes(goal.id) && styles.selectedGoalItem
              ]}
              onPress={() => toggleGoal(goal.id)}
              accessibilityLabel={`Select goal: ${goal.title}`}
              accessibilityState={{ selected: selectedGoals.includes(goal.id) }}
              accessibilityRole="checkbox"
            >
              <View style={styles.goalIconContainer}>
                <Text style={[
                  styles.goalEmoji,
                  selectedGoals.includes(goal.id) && styles.selectedGoalEmoji
                ]}>{goal.emoji}</Text>
              </View>
              
              <Text 
                style={[
                  styles.goalText,
                  selectedGoals.includes(goal.id) && styles.selectedGoalText
                ]}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {goal.title}
              </Text>
              
              <View style={[
                styles.checkContainer,
                selectedGoals.includes(goal.id) && styles.selectedCheckContainer,
              ]}>
                {selectedGoals.includes(goal.id) && (
                  <View style={styles.checkCircleFilled} />
                )}
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      
      {/* Continue Button */}
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.continueButton, !isValid && styles.buttonDisabled]}
          onPress={handleContinue}
          disabled={!isValid || isLoading}
          accessibilityLabel="Continue"
          testID="goals-continue-button"
        >
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8E1E7', // Blush Pink
    paddingHorizontal: 24,
  },
  progressBarContainer: {
    paddingTop: 16,
    paddingBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5C1D7', // Light pink for progress bar background
    borderRadius: 2,
    width: '100%',
  },
  progressFill: {
    height: '100%',
    width: '30%', // 30% progress (step 3 of 6)
    backgroundColor: '#B56DA5', // Plum purple for filled progress
    borderRadius: 2,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333030',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'italic',
    color: '#666666',
    textAlign: 'center',
    opacity: 0.8,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  goalsContainer: {
    width: '100%',
  },
  goalIconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  goalEmoji: {
    fontSize: 20,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // White background
    borderRadius: 24, // Rounded corners
    padding: 16,
    minHeight: 64,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedGoalItem: {
    backgroundColor: '#EED2E7', // Light purple background when selected
    borderColor: '#B56DA5', // Purple border when selected
    borderWidth: 2, // 2px border when selected
  },
  goalText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  selectedGoalText: {
    color: '#B56DA5', // Purple text color when selected
    fontWeight: '600',
  },
  selectedGoalEmoji: {
    color: '#B56DA5', // Purple emoji color when selected
  },
  checkContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  selectedCheckContainer: {
    borderColor: '#B56DA5',
  },
  checkCircleFilled: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#B56DA5',
  },
  buttonContainer: {
    width: '100%',
    paddingBottom: 24,
  },
  continueButton: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    backgroundColor: '#B56DA5', // Plum Purple
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  warningContainer: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  warningText: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#F44336',
    textAlign: 'center',
  },
});
