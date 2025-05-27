import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'expo-router';
import { useAppContext } from '@/context/AppContext';
import { Analytics } from '@/utils/analytics';

/**
 * Navigation guard component that handles redirects based on app state
 * This ensures users follow the proper flow through the app
 */
function NavigationGuard({ children }: { children: React.ReactNode }) {
  const { state } = useAppContext();
  const router = useRouter();
  const pathname = usePathname();
  
  const isOnboardingComplete = state.onboardingComplete;
  const isAuthenticated = !!state.user;
  
  // Public routes that don't require authentication
  const publicRoutes = ['/splash', '/welcome'];
  
  // Onboarding routes
  const onboardingRoutes = [
    '/onboarding/name',
    '/onboarding/icon',
    '/onboarding/goals',
    '/onboarding/loading',
    '/onboarding/notifications',
    '/onboarding/rating',
  ];
  
  useEffect(() => {
    // Track app open event on initial load
    Analytics.trackAppOpen();
    
    // Skip navigation logic during initial render
    if (!pathname) return;
    
    // Handle navigation based on app state
    if (publicRoutes.includes(pathname)) {
      // Allow access to public routes
      return;
    }
    
    if (!isAuthenticated) {
      // If not authenticated, redirect to welcome screen
      if (pathname !== '/welcome' && pathname !== '/splash') {
        router.replace('/welcome');
      }
      return;
    }
    
    if (!isOnboardingComplete) {
      // If authenticated but onboarding not complete
      if (!onboardingRoutes.includes(pathname) && pathname !== '/paywall') {
        // Redirect to first onboarding step if not on an onboarding route
        router.replace('/onboarding/name');
      }
      return;
    }
    
    // If onboarding is complete but user is still on onboarding routes
    if (isOnboardingComplete && (onboardingRoutes.includes(pathname) || pathname === '/paywall')) {
      // Redirect to main app
      router.replace('/(tabs)');
    }
  }, [pathname, isAuthenticated, isOnboardingComplete]);
  
  return <>{children}</>;
}

export default NavigationGuard;
