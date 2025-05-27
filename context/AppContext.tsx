import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, AppAction, UserProfile } from '../types';

// Storage keys
const STORAGE_KEYS = {
  APP_STATE: 'glowup:app_state',
  USER_PROFILE: 'glowup:user_profile',
  ONBOARDING_COMPLETE: 'glowup:onboarding_complete',
};

// Initial state
const initialState: AppState = {
  user: null,
  onboardingComplete: false,
  challenges: [],
  tasks: [],
};

// Create context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Reducer function
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'COMPLETE_ONBOARDING':
      return {
        ...state,
        onboardingComplete: true,
      };
    case 'ADD_CHALLENGE':
      return {
        ...state,
        challenges: [...state.challenges, action.payload],
      };
    case 'COMPLETE_CHALLENGE':
      return {
        ...state,
        challenges: state.challenges.map(challenge =>
          challenge.id === action.payload
            ? { ...challenge, completed: true }
            : challenge
        ),
      };
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case 'COMPLETE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: true }
            : task
        ),
      };
    case 'UPDATE_NOTIFICATION_PREFS':
      return {
        ...state,
        user: state.user
          ? {
              ...state.user,
              notificationPreferences: action.payload,
            }
          : null,
      };
    case 'UPDATE_SUBSCRIPTION':
      return {
        ...state,
        user: state.user
          ? {
              ...state.user,
              subscription: action.payload,
            }
          : null,
      };
    case 'RESET_STATE':
      // Reset to initial state when user logs out
      return initialState;
    default:
      return state;
  }
}

// Provider component
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load persisted state on mount
  useEffect(() => {
    const loadPersistedState = async () => {
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
    };

    loadPersistedState();
  }, []);

  // Save state changes to AsyncStorage
  useEffect(() => {
    const saveState = async () => {
      try {
        // Save user profile
        if (state.user) {
          await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(state.user));
        }
        
        // Save onboarding status
        await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETE, String(state.onboardingComplete));
      } catch (error) {
        console.error('Error saving app state:', error);
      }
    };

    saveState();
  }, [state.user, state.onboardingComplete]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the app context
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  
  // Add logout functionality that clears persisted data
  const logout = async () => {
    try {
      // Clear AsyncStorage data
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.APP_STATE,
        STORAGE_KEYS.USER_PROFILE,
        STORAGE_KEYS.ONBOARDING_COMPLETE,
      ]);
      
      // Reset app state
      context.dispatch({ type: 'RESET_STATE' });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  
  return {
    ...context,
    logout,
  };
}
