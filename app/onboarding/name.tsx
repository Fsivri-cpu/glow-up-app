import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Pressable, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  Keyboard,
  Animated,
  useWindowDimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAppContext } from '@/context/AppContext';
import { Analytics } from '@/utils/analytics';
import ProgressBar from '@/components/ui/ProgressBar';
import * as Haptics from 'expo-haptics';
import { sharedStyles, LAYOUT } from '../styles/SharedStyles';
import TitleBlock from '../components/ui/TitleBlock';
import ButtonBlock from '../components/ui/ButtonBlock';

interface NameScreenProps {
  onContinue?: () => void;
}

export default function NameScreen({ onContinue }: NameScreenProps) {
  const [name, setName] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showError, setShowError] = useState(false);
  const { dispatch } = useAppContext();
  // Define colors directly for simplicity
  const colors = {
    text: '#333333',
    background: '#F8E1E7',
    primary: '#B56DA5',
    error: '#E53935',
    placeholder: '#999999',
    mediumGray: '#666666',
  };
  const { width, height } = useWindowDimensions();
  const inputRef = useRef<TextInput>(null);
  
  // Animation values
  const errorOpacity = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  
  const maxWidth = Math.min(width, 480);
  const isValid = name.trim().length > 0;
  
  // Auto-focus input when screen loads
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
    
    // Track screen view
    Analytics.trackPageView('/onboarding/name');
    
    return () => clearTimeout(timer);
  }, []);
  
  // Animate error message
  useEffect(() => {
    if (showError) {
      Animated.sequence([
        Animated.timing(errorOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.delay(3000),
        Animated.timing(errorOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        })
      ]).start(() => setShowError(false));
    }
  }, [showError, errorOpacity]);

  // Button press animation
  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true
      })
    ]).start();
  };
  
  const handleContinue = () => {
    if (!isValid) {
      setShowError(true);
      inputRef.current?.focus();
      return;
    }
    
    // Animate button press
    animateButton();
    
    // Track event
    Analytics.trackButtonClick('name_continue', 'onboarding');
    
    // Store user data
    dispatch({
      type: 'SET_USER',
      payload: {
        name: name.trim(),
        selectedIcon: 'sparkle',
        selectedGoals: [],
        notificationPreferences: {
          dailyHabitReminders: true,
          weeklyProgress: true,
          motivationalQuotes: true,
        },
        subscription: 'free',
      },
    });
    
    // Navigate to next screen
    if (onContinue) {
      onContinue();
    } else {
      // Fallback to router navigation when used with Expo Router
      router.push('/onboarding/icon');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Pressable style={styles.dismissKeyboard} onPress={Keyboard.dismiss}>
            {/* Progress Bar */}
            <ProgressBar currentStep={1} totalSteps={6} />
            
            {/* Title Section */}
            <TitleBlock 
              title="What's your first name?" 
              subtitle="Glow-ups start by knowing who you are."
            />
            
            {/* Content Section */}
            <View style={[styles.inputSection, { maxWidth }]}>
              <Text style={styles.inputLabel}>First Name</Text>
              
              <TextInput
                ref={inputRef}
                style={[
                  styles.input,
                  isFocused && styles.inputFocused
                ]}
                placeholder="Enter your name"
                placeholderTextColor="#999999"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (showError && text.trim().length > 0) {
                    setShowError(false);
                  }
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                autoCapitalize="words"
                textContentType="name"
                accessibilityLabel="Enter your first name"
              />
              
              {/* Error Message */}
              <Animated.Text 
                style={[styles.errorText, { opacity: errorOpacity }]}
              >
                Please enter your name to continue.
              </Animated.Text>
            </View>
            
            {/* Fixed Bottom Button */}
            <ButtonBlock
              primaryButtonTitle="Continue"
              onPrimaryPress={handleContinue}
              primaryDisabled={!isValid}
              testID="name-continue-button"
            />
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8E1E7', // Blush pink per spec
  },
  keyboardAvoidView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    alignItems: 'center',
  },
  dismissKeyboard: {
    flex: 1,
    width: '100%',
  },
  header: {
    ...sharedStyles.header,
    backgroundColor: '#F8E1E7',
    zIndex: 1,
  },
  title: {
    ...sharedStyles.title,
  },
  inputSection: {
    width: '100%',
    marginTop: 24,
    alignItems: 'flex-start',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 56,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333333',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  inputFocused: {
    borderColor: '#B56DA5', 
    borderWidth: 2,
  },
  errorText: {
    color: '#E53935', 
    fontSize: 14,
    marginTop: 8,
    marginLeft: 4,
  },
  buttonContainer: {
    ...sharedStyles.buttonContainer,
  },
  primaryButton: {
    ...sharedStyles.primaryButton,
  },
  disabledButton: {
    ...sharedStyles.disabledButton,
  },
  buttonText: {
    ...sharedStyles.buttonText,
  },
});
