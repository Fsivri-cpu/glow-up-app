export type UserProfile = {
  name: string;
  selectedIcon: 'sparkle' | 'flower' | 'heel' | 'serenity' | 'diamond' | 'book';
  selectedGoals: string[];
  notificationPreferences: {
    dailyHabitReminders: boolean;
    weeklyProgress: boolean;
    motivationalQuotes: boolean;
  };
  subscription: 'free' | 'pro';
};

export type GlowUpGoal = {
  id: string;
  title: string;
  description: string;
  iconName: string;
};

export type Challenge = {
  id: string;
  title: string;
  description: string;
  duration: number; // in days
  category: string;
  tasks: Task[];
};

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: Date;
};

export type AppState = {
  user: UserProfile | null;
  onboardingComplete: boolean;
  challenges: Challenge[];
  tasks: Task[];
};

export type AppAction = 
  | { type: 'SET_USER'; payload: UserProfile }
  | { type: 'COMPLETE_ONBOARDING' }
  | { type: 'ADD_CHALLENGE'; payload: Challenge }
  | { type: 'COMPLETE_CHALLENGE'; payload: string }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'COMPLETE_TASK'; payload: string }
  | { type: 'UPDATE_NOTIFICATION_PREFS'; payload: UserProfile['notificationPreferences'] }
  | { type: 'UPDATE_SUBSCRIPTION'; payload: 'free' | 'pro' }
  | { type: 'RESET_STATE' };
