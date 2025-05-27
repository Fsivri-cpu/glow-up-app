import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { sharedStyles } from '../../styles/SharedStyles';

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  isLoading?: boolean;
  testID?: string;
}

/**
 * A standardized button component that maintains consistent
 * styling across all screens
 */
export default function Button({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  isLoading = false,
  testID,
}: ButtonProps) {
  return (
    <Pressable
      style={[
        styles.button,
        disabled && styles.disabledButton,
        style
      ]}
      onPress={onPress}
      disabled={disabled || isLoading}
      accessibilityLabel={title}
      accessibilityState={{ disabled: disabled || isLoading }}
      testID={testID}
    >
      {isLoading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    ...sharedStyles.primaryButton,
  },
  disabledButton: {
    ...sharedStyles.disabledButton,
  },
  buttonText: {
    ...sharedStyles.buttonText,
  },
});
