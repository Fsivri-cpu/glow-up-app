import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import Button from './Button';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  buttonText?: string;
  onButtonPress?: () => void;
  style?: ViewStyle;
}

/**
 * A reusable empty state component for displaying when there's no content
 * Follows the Glow Up design system with consistent styling
 */
function EmptyState({
  title,
  description,
  icon = 'sparkles',
  buttonText,
  onButtonPress,
  style,
}: EmptyStateProps) {
  const { colors, typography, spacing } = useTheme();
  
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.iconContainer, { backgroundColor: colors.primary }]}>
        <Ionicons name={icon} size={32} color="#FFFFFF" />
      </View>
      
      <Text style={[styles.title, { color: colors.text }]}>
        {title}
      </Text>
      
      {description && (
        <Text style={[styles.description, { color: colors.mediumGray }]}>
          {description}
        </Text>
      )}
      
      {buttonText && onButtonPress && (
        <Button
          title={buttonText}
          onPress={onButtonPress}
          style={styles.button}
          variant="primary"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#B56DA5', // Plum Purple
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Manrope',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontFamily: 'Inter',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  button: {
    minWidth: 180,
  },
});

export default EmptyState;
