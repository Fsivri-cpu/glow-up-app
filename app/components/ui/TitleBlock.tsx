import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { sharedStyles } from '../../styles/SharedStyles';

interface TitleBlockProps {
  title: string;
  subtitle?: string;
}

/**
 * A standardized title block component that maintains consistent
 * positioning across onboarding screens
 */
export default function TitleBlock({ title, subtitle }: TitleBlockProps) {
  return (
    <View style={styles.titleBlock}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  titleBlock: {
    ...sharedStyles.header,
  },
  title: {
    ...sharedStyles.title,
  },
  subtitle: {
    ...sharedStyles.subtitle,
  },
});
