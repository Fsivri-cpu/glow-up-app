import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

/**
 * Custom hook that provides theme-related values and utilities
 * based on the app's design system
 */
export function useTheme() {
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme];
  
  // Typography styles based on design system
  const typography = {
    title: {
      fontFamily: 'Manrope',
      fontSize: 28,
      fontWeight: 'bold' as const,
      color: colors.text,
    },
    subtitle: {
      fontFamily: 'Manrope',
      fontSize: 20,
      fontWeight: 'bold' as const,
      color: colors.text,
    },
    body: {
      fontFamily: 'Inter',
      fontSize: 16,
      color: colors.text,
    },
    bodySmall: {
      fontFamily: 'Inter',
      fontSize: 14,
      color: colors.mediumGray,
    },
    button: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 18,
      color: '#FFFFFF',
    },
    placeholder: {
      fontFamily: 'Inter',
      fontSize: 14,
      color: colors.softGray,
    },
  };
  
  // Spacing values based on design system (in 4pt increments)
  const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
  };
  
  // Border radius values based on design system
  const borderRadius = {
    sm: 8,
    md: 16,
    lg: 24,
    pill: 28,
    circle: 999,
  };
  
  // Shadow styles based on design system
  const shadows = {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
  };
  
  return {
    colorScheme,
    colors,
    typography,
    spacing,
    borderRadius,
    shadows,
    isDark: colorScheme === 'dark',
  };
}
