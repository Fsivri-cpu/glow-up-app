import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, useWindowDimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Analytics } from '@/utils/analytics';
import { useAppContext } from '@/context/AppContext';
import Button from '@/components/ui/Button';
import * as Notifications from 'expo-notifications';
import * as Haptics from 'expo-haptics';
import Animated, { FadeIn } from 'react-native-reanimated';
import { sharedStyles, LAYOUT } from '../styles/SharedStyles';
import StandardLayout from '../components/layout/StandardLayout';
import TitleBlock from '../components/ui/TitleBlock';
import ButtonBlock from '../components/ui/ButtonBlock';

interface NotificationsScreenProps {
  onContinue?: () => void;
}

export default function NotificationsScreen({ onContinue }: NotificationsScreenProps) {
  const { state, dispatch } = useAppContext();
  const [notificationPrefs, setNotificationPrefs] = useState({
    dailyHabitReminders: true,
    weeklyProgress: true,
    motivationalQuotes: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  
  // Define colors directly for simplicity
  const colors = {
    text: '#333333',
    background: '#F8E1E7',
    primary: '#B56DA5',
    error: '#E53935',
    softGray: '#EEEEEE',
    mediumGray: '#666666',
  };
  const { width } = useWindowDimensions();
  
  const maxWidth = Math.min(width, 480);
  
  // Track screen view
  useEffect(() => {
    Analytics.trackPageView('onboarding_notifications');
  }, []);

  const toggleSwitch = (key: keyof typeof notificationPrefs) => {
    setNotificationPrefs(prev => {
      const newValue = !prev[key];
      
      // Track notification preference change
      Analytics.trackButtonClick(
        `notification_${key}_${newValue ? 'enabled' : 'disabled'}`,
        'onboarding_notifications'
      );
      
      // Provide haptic feedback
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      
      return {
        ...prev,
        [key]: newValue,
      };
    });
  };

  const requestNotificationPermission = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      
      if (status === 'granted') {
        // Set up notification channels/categories if needed
        console.log('Notification permission granted');
        
        // Track successful notification opt-in
        const enabledTypes = Object.entries(notificationPrefs)
          .filter(([_, enabled]) => enabled)
          .map(([type]) => type);
        
        Analytics.trackNotificationOptIn(enabledTypes);
        
        return true;
      } else {
        // Permission denied
        console.log('Notification permission denied');
        return false;
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  };

  const handleContinue = async () => {
    if (!state.user) return;
    
    try {
      setIsLoading(true);
      
      // Track button click
      Analytics.trackButtonClick('enable_notifications', 'onboarding_notifications');
      
      // Provide haptic feedback
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      // Update notification preferences in app state
      dispatch({
        type: 'UPDATE_NOTIFICATION_PREFS',
        payload: notificationPrefs,
      });
      
      // Request system permission if at least one notification type is enabled
      const hasEnabledNotifications = Object.values(notificationPrefs).some(value => value);
      if (hasEnabledNotifications) {
        const permissionGranted = await requestNotificationPermission();
        
        if (!permissionGranted) {
          // Show a helpful message if permission was denied
          Alert.alert(
            'Notifications Disabled',
            'You can enable notifications later in your device settings if you change your mind.',
            [{ text: 'OK', onPress: () => navigateToNextScreen() }]
          );
          return;
        }
      }
      
      navigateToNextScreen();
    } catch (error) {
      console.error('Error setting up notifications:', error);
      navigateToNextScreen();
    } finally {
      setIsLoading(false);
    }
  };
  
  const navigateToNextScreen = () => {
    // Mark onboarding as complete in app state
    dispatch({
      type: 'COMPLETE_ONBOARDING',
    });
    
    // Navigate to the next screen
    if (onContinue) {
      onContinue();
    } else {
      // Fallback to router navigation when used with Expo Router
      router.push('/onboarding/rating');
    }
  };
  
  const handleSkip = () => {
    // Track skip event
    Analytics.trackButtonClick('skip_notifications', 'onboarding_notifications');
    
    // Provide haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    navigateToNextScreen();
  };

  return (
    <StandardLayout
      currentStep={5}
      totalSteps={6}
    >
      <TitleBlock 
        title="Stay on track" 
        subtitle="Enable notifications to help with your glow-up journey"
      />
      
      <View style={styles.optionsContainer}>
        <View style={styles.optionItem}>
          <View style={styles.optionTextContainer}>
            <Text style={[styles.optionTitle, { color: colors.text }]}>
              Daily habit reminders
            </Text>
            <Text style={[styles.optionDescription, { color: colors.mediumGray }]}>
              Gentle nudges to complete your daily habits
            </Text>
          </View>
          <Switch
            trackColor={{ false: colors.softGray, true: colors.primary }}
            thumbColor="#FFFFFF"
            ios_backgroundColor={colors.softGray}
            onValueChange={() => toggleSwitch('dailyHabitReminders')}
            value={notificationPrefs.dailyHabitReminders}
            accessibilityLabel="Toggle daily habit reminders"
          />
        </View>
        
        <View style={styles.optionItem}>
          <View style={styles.optionTextContainer}>
            <Text style={[styles.optionTitle, { color: colors.text }]}>
              Weekly progress
            </Text>
            <Text style={[styles.optionDescription, { color: colors.mediumGray }]}>
              Updates on your weekly achievements
            </Text>
          </View>
          <Switch
            trackColor={{ false: colors.softGray, true: colors.primary }}
            thumbColor="#FFFFFF"
            ios_backgroundColor={colors.softGray}
            onValueChange={() => toggleSwitch('weeklyProgress')}
            value={notificationPrefs.weeklyProgress}
            accessibilityLabel="Toggle weekly progress notifications"
          />
        </View>
        
        <View style={styles.optionItem}>
          <View style={styles.optionTextContainer}>
            <Text style={[styles.optionTitle, { color: colors.text }]}>
              Motivational quotes
            </Text>
            <Text style={[styles.optionDescription, { color: colors.mediumGray }]}>
              Inspirational quotes to keep you motivated
            </Text>
          </View>
          <Switch
            trackColor={{ false: colors.softGray, true: colors.primary }}
            thumbColor="#FFFFFF"
            ios_backgroundColor={colors.softGray}
            onValueChange={() => toggleSwitch('motivationalQuotes')}
            value={notificationPrefs.motivationalQuotes}
            accessibilityLabel="Toggle motivational quotes notifications"
          />
        </View>
      </View>
      
      <ButtonBlock
        primaryButtonTitle="Enable Notifications"
        onPrimaryPress={handleContinue}
        secondaryButtonTitle="Skip for now"
        onSecondaryPress={handleSkip}
        testID="notifications-enable-button"
      />
    </StandardLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8E1E7', // Blush Pink
  },
  content: {
    ...sharedStyles.content,
  },
  header: {
    ...sharedStyles.header,
  },
  title: {
    ...sharedStyles.title,
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'italic', // Italic per spec
    color: '#666666', // Medium Gray
    textAlign: 'center',
  },
  optionsContainer: {
    flex: 1,
    marginBottom: 40,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  optionTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  optionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  optionDescription: {
    fontFamily: 'Inter',
    fontSize: 14,
  },
  footer: {
    ...sharedStyles.buttonContainer,
  },
  skipText: {
    fontFamily: 'Inter',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
    textDecorationLine: 'underline',
  },
});
