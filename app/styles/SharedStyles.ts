import { Platform, StyleSheet } from 'react-native';

// Layout constants for standardized positioning
export const LAYOUT = {
  // Title positioning - based on "Pick a symbol that feels like you" screen
  TITLE_TOP_MARGIN: Platform.OS === 'ios' ? 60 : 48,
  TITLE_BOTTOM_MARGIN: 40,
  
  // Button positioning - based on paywall "Try Free for 7 Days" button
  BUTTON_BOTTOM_MARGIN: 24,
  FOOTER_LINKS_MARGIN: 16,
  
  // Content padding
  CONTENT_HORIZONTAL_PADDING: 24,
  CONTENT_VERTICAL_PADDING: 24,
};

// Shared styles for consistent UI across screens
export const sharedStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: '#F8E1E7', // Blush Pink
  },
  
  // Content area styles
  content: {
    flex: 1,
    paddingHorizontal: LAYOUT.CONTENT_HORIZONTAL_PADDING,
    paddingTop: LAYOUT.CONTENT_VERTICAL_PADDING,
    paddingBottom: LAYOUT.CONTENT_VERTICAL_PADDING,
    alignItems: 'center',
  },
  
  // Title styles - standardized based on icon selection screen
  header: {
    alignItems: 'center',
    marginBottom: LAYOUT.TITLE_BOTTOM_MARGIN,
    width: '100%',
    marginTop: LAYOUT.TITLE_TOP_MARGIN,
  },
  
  // Button container styles - standardized based on paywall screen
  buttonContainer: {
    width: '100%',
    marginTop: 'auto',
    paddingBottom: LAYOUT.BUTTON_BOTTOM_MARGIN,
  },
  
  // Common text styles
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666666',
    textAlign: 'center',
    marginBottom: 32,
  },
  
  // Button styles
  primaryButton: {
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
    marginBottom: LAYOUT.FOOTER_LINKS_MARGIN,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#D0A9C5', // Lighter purple for disabled state
    opacity: 0.8,
  },
});
