import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle, Pressable } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  interpolateColor,
  useSharedValue,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';

interface AnimatedCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  disabled?: boolean;
  delay?: number;
  animationType?: 'fade' | 'scale' | 'slide' | 'none';
  slideDirection?: 'left' | 'right' | 'top' | 'bottom';
}

/**
 * An animated card component that supports various entrance animations
 * and interactive feedback when pressed
 */
function AnimatedCard({
  children,
  style,
  onPress,
  disabled = false,
  delay = 0,
  animationType = 'fade',
  slideDirection = 'bottom',
}: AnimatedCardProps) {
  const { colors, shadows, borderRadius } = useTheme();
  
  // Animation values
  const opacity = useSharedValue(animationType === 'fade' ? 0 : 1);
  const scale = useSharedValue(animationType === 'scale' ? 0.9 : 1);
  const translateX = useSharedValue(
    animationType === 'slide' && slideDirection === 'left' ? -20 :
    animationType === 'slide' && slideDirection === 'right' ? 20 : 0
  );
  const translateY = useSharedValue(
    animationType === 'slide' && slideDirection === 'top' ? -20 :
    animationType === 'slide' && slideDirection === 'bottom' ? 20 : 0
  );
  const pressed = useSharedValue(0);
  
  // Entrance animation
  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      opacity.value = withTiming(1, { duration: 300 });
      scale.value = withSpring(1, { damping: 12 });
      translateX.value = withTiming(0, { duration: 300 });
      translateY.value = withTiming(0, { duration: 300 });
    }, delay);
    
    return () => clearTimeout(animationTimeout);
  }, [opacity, scale, translateX, translateY, delay]);
  
  // Animated styles
  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      pressed.value,
      [0, 1],
      [colors.cardBackground, colors.cardBackgroundPressed]
    );
    
    return {
      opacity: opacity.value,
      transform: [
        { scale: scale.value - pressed.value * 0.05 },
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
      backgroundColor,
    };
  });
  
  // Press handlers
  const handlePressIn = () => {
    if (disabled) return;
    pressed.value = withTiming(1, { duration: 100 });
  };
  
  const handlePressOut = () => {
    if (disabled) return;
    pressed.value = withTiming(0, { duration: 200 });
  };
  
  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || !onPress}
    >
      <Animated.View
        style={[
          styles.card,
          shadows.small,
          { borderRadius: borderRadius.md },
          animatedStyle,
          style,
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginVertical: 8,
    overflow: 'hidden',
  },
});

export default AnimatedCard;
