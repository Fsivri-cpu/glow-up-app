import { useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, UserProfile } from '@/types';
import { useAppContext } from '@/context/AppContext';

// Storage keys
const STORAGE_KEYS = {
  APP_STATE: 'glowup:app_state',
  USER_PROFILE: 'glowup:user_profile',
  ONBOARDING_COMPLETE: 'glowup:onboarding_complete',
};

/**
 * Custom hook for persisting app state to AsyncStorage
 * and retrieving it on app startup
 */
export function usePersistence() {
  const { state, dispatch } = useAppContext();

  // Load persisted state on mount
  useEffect(() => {
    loadPersistedState();
  }, []);

  // Save state changes to AsyncStorage
  useEffect(() => {
    if (state.user) {
      saveUserProfile(state.user);
    }
    
    saveOnboardingStatus(state.onboardingComplete);
  }, [state.user, state.onboardingComplete]);

  /**
   * Load all persisted state from AsyncStorage
   */
  const loadPersistedState = useCallback(async () => {
    try {
      // Load user profile
      const userProfileJson = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      if (userProfileJson) {
        const userProfile = JSON.parse(userProfileJson) as UserProfile;
        dispatch({ type: 'SET_USER', payload: userProfile });
      }

      // Load onboarding status
      const onboardingCompleteJson = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETE);
      if (onboardingCompleteJson === 'true') {
        dispatch({ type: 'COMPLETE_ONBOARDING' });
      }
    } catch (error) {
      console.error('Error loading persisted state:', error);
    }
  }, [dispatch]);

  /**
   * Save user profile to AsyncStorage
   */
  const saveUserProfile = useCallback(async (userProfile: UserProfile) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(userProfile));
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  }, []);

  /**
   * Save onboarding status to AsyncStorage
   */
  const saveOnboardingStatus = useCallback(async (isComplete: boolean) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETE, String(isComplete));
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  }, []);

  /**
   * Clear all persisted data (for logout)
   */
  const clearPersistedData = useCallback(async () => {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.APP_STATE,
        STORAGE_KEYS.USER_PROFILE,
        STORAGE_KEYS.ONBOARDING_COMPLETE,
      ]);
    } catch (error) {
      console.error('Error clearing persisted data:', error);
    }
  }, []);

  return {
    loadPersistedState,
    saveUserProfile,
    saveOnboardingStatus,
    clearPersistedData,
  };
}
