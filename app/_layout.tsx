import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useAppInitialization } from '@/hooks/useAppInitialization';
import { AppProvider } from '@/context/AppContext';
import NavigationGuard from '@/components/navigation/NavigationGuard';
import { Colors } from '@/constants/Colors';

// Note: Firebase is now initialized in the analytics.ts file

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { appIsReady } = useAppInitialization();
  
  // Show a loading screen while the app is initializing
  if (!appIsReady) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <AppProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          {/* NavigationGuard handles auth and routing */}
          <NavigationGuard>
            <Stack screenOptions={{ 
              headerShown: false,
              animation: 'fade',
              contentStyle: { backgroundColor: colors.background }
            }}>
              <Stack.Screen name="splash" options={{ animation: 'none' }} />
              <Stack.Screen name="welcome" />
              <Stack.Screen name="onboarding" />
              <Stack.Screen name="paywall" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="+not-found" />
            </Stack>
          </NavigationGuard>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        </ThemeProvider>
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
