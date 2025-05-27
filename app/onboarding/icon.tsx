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
import * as Haptics from 'expo-haptics';
import { Analytics } from '@/utils/analytics';

type IconOption = 'sparkle' | 'flower' | 'heel' | 'book' | 'diamond' | 'serenity';

// Map our icon types to emoji characters and labels
const iconMapping = {
  flower: { emoji: '🌸', label: 'Flower' },      // Growth
  sparkle: { emoji: '✨', label: 'Sparkle' },    // Shine
  heel: { emoji: '👠', label: 'Heel' },          // Feminine strength
  book: { emoji: '📚', label: 'Books' },         // Intellectual growth
  diamond: { emoji: '💎', label: 'Diamond' },    // Value, ambition
  serenity: { emoji: '🧘‍♀️', label: 'Serenity' }, // Balance
};

interface IconScreenProps {
  onContinue?: () => void;
}

export default function IconScreen({ onContinue }: IconScreenProps) {
  const { state, dispatch } = useAppContext();
  const [selectedIcon, setSelectedIcon] = useState<IconOption | null>(
    (state.user?.selectedIcon as IconOption) || null
  );
  
  const { width } = useWindowDimensions();
  
  // Track screen view
  useEffect(() => {
    Analytics.trackPageView('/onboarding/icon');
  }, []);

  const handleIconSelect = (icon: IconOption) => {
    // Trigger haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    setSelectedIcon(icon);
    Analytics.trackButtonClick(`select_icon_${icon}`, 'onboarding');
  };

  const handleContinue = () => {
    if (!state.user || !selectedIcon) return;
    
    // Trigger haptic feedback
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    // Track button click
    Analytics.trackButtonClick('icon_continue', 'onboarding');
    
    // Update user data in context
    dispatch({
      type: 'SET_USER',
      payload: {
        ...state.user,
        selectedIcon,
      },
    });
    
    // Navigate to next screen
    if (onContinue) {
      onContinue();
    } else {
      // Fallback to router navigation when used with Expo Router
      router.push('/onboarding/goals');
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
        <Text style={styles.title}>Pick a symbol that feels like you</Text>
        <Text style={styles.subtitle}>Your energy, your aesthetic — we all glow differently.</Text>
      </View>
      
      {/* Icon Grid */}
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.iconsContainer}>
          <View style={styles.iconsGrid}>
            {(Object.keys(iconMapping) as IconOption[]).map((icon) => (
              <Pressable
                key={icon}
                style={[
                  styles.iconButton,
                  selectedIcon === icon && styles.selectedIconButton
                ]}
                onPress={() => handleIconSelect(icon)}
                accessibilityLabel={`Select ${iconMapping[icon].label} icon`}
                accessibilityState={{ selected: selectedIcon === icon }}
                accessibilityRole="button"
              >
                <Text 
                  style={[
                    styles.iconText,
                    selectedIcon === icon && styles.selectedIconText
                  ]}
                >
                  {iconMapping[icon].emoji}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
      
      {/* Continue Button */}
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.continueButton, !selectedIcon && styles.buttonDisabled]}
          onPress={handleContinue}
          disabled={!selectedIcon}
          accessibilityLabel="Continue to personalized plan step"
          testID="icon-continue-button"
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
    backgroundColor: '#F8E1E7', // Blush pink background
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
    width: '15%', // 15% progress (step 1 of 6)
    backgroundColor: '#B56DA5', // Plum purple for filled progress
    borderRadius: 2,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
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
  iconsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  iconsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 320,
  },
  iconButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 24,
  },
  selectedIconButton: {
    backgroundColor: '#EED2E7', // Light purple background when selected
    borderColor: '#B56DA5', // Purple border when selected
    borderWidth: 2, // 2px border when selected
  },
  selectedIconText: {
    color: '#B56DA5', // Purple text color when selected
  },
  iconText: {
    fontSize: 32, // Emoji size to match image
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
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
    opacity: 0.5, // 50% opacity when disabled
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
  },
});
