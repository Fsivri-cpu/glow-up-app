/**
 * Mock Analytics Implementation
 * 
 * This file provides a mock implementation of analytics tracking
 * that doesn't require Firebase credentials. In a production app,
 * this would be replaced with a real Firebase implementation.
 */
import { Platform } from 'react-native';

// Enable this flag to see analytics logs in the console
const ENABLE_ANALYTICS_LOGS = true;

// Custom event parameters type
export type EventParams = {
  [key: string]: string | number | boolean;
};

/**
 * Log an analytics event to the console in development
 */
const logAnalyticsEvent = (eventName: string, params?: Record<string, any>) => {
  if (ENABLE_ANALYTICS_LOGS) {
    console.log(`📊 ANALYTICS EVENT: ${eventName}`, params || {});
  }
};

/**
 * Safe wrapper for logging events
 */
const safeLogEvent = (eventName: string, params?: Record<string, any>) => {
  logAnalyticsEvent(eventName, params);
};

/**
 * Track when a user views a screen
 */
const trackPageView = (screenName: string, params?: EventParams) => {
  safeLogEvent('screen_view', {
    screen_name: screenName,
    ...params,
  });
};

/**
 * Track a button click event
 */
const trackButtonClick = (
  buttonId: string, 
  location?: string,
  params?: EventParams
) => {
  safeLogEvent('button_click', {
    button_id: buttonId,
    location: location || 'unknown',
    ...params,
  });
};

/**
 * Track when a user selects a goal during onboarding
 */
const trackGoalSelected = (goalId: string) => {
  safeLogEvent('goal_selected', {
    goal_id: goalId,
  });
};

/**
 * Track when a user creates a new habit
 */
const trackHabitCreated = (habitId: string, habitName: string) => {
  safeLogEvent('habit_created', {
    habit_id: habitId,
    habit_name: habitName,
  });
};

/**
 * Track when a user completes a habit
 */
const trackHabitCompleted = (habitId: string) => {
  safeLogEvent('habit_completed', {
    habit_id: habitId,
  });
};

/**
 * Track when the paywall is viewed
 */
export function trackPaywallViewed() {
  safeLogEvent('paywall_viewed');
}

/**
 * Track when a user starts a subscription
 */
const trackSubscriptionStarted = (plan: string) => {
  safeLogEvent('subscription_start', {
    plan,
  });
};

/**
 * Track when a purchase is completed
 */
const trackPurchaseCompleted = (plan: string, price: number) => {
  safeLogEvent('purchase', {
    plan,
    price,
    currency: 'USD',
  });
};

/**
 * Track when a user opts in for notifications
 * @param types Array of notification types opted in for
 */
const trackNotificationOptIn = (types: string[]) => {
  safeLogEvent('notification_opt_in', {
    types: types.join(','),
  });
};

/**
 * Track when the rating prompt is shown
 */
const trackRatingPromptShown = () => {
  safeLogEvent('rating_prompt_shown');
};

/**
 * Track when the app is opened
 */
const trackAppOpen = () => {
  safeLogEvent('app_open');
};

/**
 * Track when a trial starts
 * @param plan The subscription plan for the trial
 */
const trackTrialStart = (plan: string) => {
  safeLogEvent('trial_start', {
    plan,
  });
};

/**
 * Track when a trial is canceled
 */
const trackCancelTrial = () => {
  safeLogEvent('cancel_trial');
};

export const Analytics = {
  trackPageView,
  trackButtonClick,
  trackGoalSelected,
  trackHabitCreated,
  trackHabitCompleted,
  trackPaywallViewed,
  trackSubscriptionStarted,
  trackPurchaseCompleted,
  trackNotificationOptIn,
  trackRatingPromptShown,
  trackAppOpen,
  trackTrialStart,
  trackCancelTrial,
};
