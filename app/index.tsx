import { Redirect } from 'expo-router';

/**
 * Root index file for the app
 * Redirects to the splash screen as the entry point
 */
export default function Index() {
  return <Redirect href="/splash" />;
}
