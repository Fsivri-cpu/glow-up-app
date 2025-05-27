import React from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { sharedStyles, LAYOUT } from '../../styles/SharedStyles';

interface ButtonBlockProps {
  primaryButtonTitle: string;
  onPrimaryPress: () => void;
  primaryDisabled?: boolean;
  secondaryButtonTitle?: string;
  onSecondaryPress?: () => void;
  secondaryDisabled?: boolean;
  isLoading?: boolean;
  testID?: string;
  footerLinks?: Array<{
    title: string;
    onPress: () => void;
  }>;
  showFooterLinks?: boolean;
  showSecondaryButton?: boolean;
}

/**
 * A standardized button block component that maintains consistent
 * positioning across all screens
 */
export default function ButtonBlock({
  primaryButtonTitle,
  onPrimaryPress,
  primaryDisabled = false,
  secondaryButtonTitle,
  onSecondaryPress,
  secondaryDisabled = false,
  isLoading = false,
  testID,
  footerLinks,
  showFooterLinks = false,
  showSecondaryButton = false,
}: ButtonBlockProps) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={[
          styles.primaryButton,
          primaryDisabled && styles.disabledButton
        ]}
        onPress={onPrimaryPress}
        disabled={primaryDisabled || isLoading}
        accessibilityLabel={primaryButtonTitle}
        accessibilityState={{ disabled: primaryDisabled || isLoading }}
        testID={testID}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>{primaryButtonTitle}</Text>
        )}
      </Pressable>

      {showSecondaryButton && secondaryButtonTitle && onSecondaryPress && (
        <Pressable
          style={[
            styles.secondaryButton,
            secondaryDisabled && styles.disabledSecondaryButton
          ]}
          onPress={onSecondaryPress}
          disabled={secondaryDisabled || isLoading}
          accessibilityLabel={secondaryButtonTitle}
          accessibilityState={{ disabled: secondaryDisabled || isLoading }}
        >
          <Text style={styles.secondaryButtonText}>{secondaryButtonTitle}</Text>
        </Pressable>
      )}
      
      {/* Footer Links - only shown on welcome and paywall screens */}
      {showFooterLinks && footerLinks && footerLinks.length > 0 && (
        <View style={styles.footerLinks}>
          {footerLinks.map((link, index) => (
            <Text
              key={index}
              style={styles.footerLink}
              onPress={link.onPress}
            >
              {link.title}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    marginTop: 'auto',
    paddingBottom: LAYOUT.BUTTON_BOTTOM_MARGIN, // Exact bottom margin from paywall screen
  },
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
    marginBottom: LAYOUT.FOOTER_LINKS_MARGIN, // Exact spacing above footer links from paywall
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: LAYOUT.FOOTER_LINKS_MARGIN,
  },
  disabledSecondaryButton: {
    opacity: 0.6,
  },
  secondaryButtonText: {
    color: '#B56DA5', // Plum Purple
    fontSize: 18,
    fontWeight: '600',
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerLink: {
    fontSize: 14,
    color: '#666666', // Medium Gray
    marginHorizontal: 8,
    textDecorationLine: 'underline',
  },
});
