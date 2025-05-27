import { Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

/**
 * Layout for the onboarding flow
 * Defines a nested Stack navigator for all onboarding screens
 */
export default function OnboardingLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: colors.background },
        gestureEnabled: false, // Disable swipe back during onboarding
      }}
    >
      <Stack.Screen name="name" />
      <Stack.Screen name="icon" />
      <Stack.Screen name="goals" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="rating" />
      <Stack.Screen name="loading" />
    </Stack>
  );
}
