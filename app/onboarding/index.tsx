import { Redirect } from 'expo-router';

/**
 * Default entry point for the onboarding flow
 * Redirects to the first onboarding screen (name)
 */
export default function OnboardingIndex() {
  return <Redirect href="/onboarding/name" />;
}
