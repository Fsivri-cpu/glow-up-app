import { useEffect, useCallback } from 'react';
import { usePathname } from 'expo-router';
import { Analytics } from '@/utils/analytics';

/**
 * Custom hook for tracking analytics events throughout the app
 * Provides convenient methods for tracking various events
 */
export function useAnalytics() {
  const pathname = usePathname();
  
  // Automatically track page views when the pathname changes
  useEffect(() => {
    if (pathname) {
      Analytics.trackPageView(pathname);
    }
  }, [pathname]);
  
  // Track button clicks
  const trackButtonClick = useCallback((buttonId: string, location?: string) => {
    Analytics.trackButtonClick(buttonId, location || pathname || 'unknown');
  }, [pathname]);
  
  // Track goal selection
  const trackGoalSelected = useCallback((goalId: string) => {
    Analytics.trackButtonClick(`select_goal_${goalId}`, 'goal_selection');
  }, []);
  
  // Track habit creation
  const trackHabitCreated = useCallback((habitId: string, habitName: string) => {
    Analytics.trackButtonClick(`create_habit_${habitId}`, 'habit_creation', { habitName });
  }, []);
  
  // Track paywall view
  const trackPaywallViewed = useCallback(() => {
    Analytics.trackPaywallViewed();
  }, []);
  
  // Track subscription start
  const trackSubscriptionStart = useCallback((plan: string, price: number) => {
    Analytics.trackButtonClick('start_subscription', 'paywall', { plan, price: price.toString() });
  }, []);
  
  // Track trial start
  const trackTrialStart = useCallback((plan: string) => {
    Analytics.trackButtonClick('start_trial', 'paywall', { plan });
  }, []);
  
  // Track trial cancellation
  const trackCancelTrial = useCallback(() => {
    Analytics.trackButtonClick('cancel_trial', 'subscription');
  }, []);
  
  // Track notification opt-in
  const trackNotificationOptIn = useCallback((types: string[]) => {
    Analytics.trackButtonClick('notification_opt_in', 'notifications', { types: types.join(',') });
  }, []);
  
  // Track rating prompt shown
  const trackRatingPromptShown = useCallback(() => {
    Analytics.trackPageView('rating_prompt');
  }, []);
  
  // Track purchase completion
  const trackPurchaseCompleted = useCallback((plan: string, price: number) => {
    Analytics.trackButtonClick('purchase_completed', 'paywall', { plan, price: price.toString() });
  }, []);
  
  return {
    trackButtonClick,
    trackGoalSelected,
    trackHabitCreated,
    trackPaywallViewed,
    trackSubscriptionStart,
    trackTrialStart,
    trackCancelTrial,
    trackNotificationOptIn,
    trackRatingPromptShown,
    trackPurchaseCompleted,
  };
}
