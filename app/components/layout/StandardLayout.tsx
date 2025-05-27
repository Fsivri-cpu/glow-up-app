import React, { ReactNode } from 'react';
import { 
  View, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  useWindowDimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressBar from '../ui/ProgressBar';
import { sharedStyles, LAYOUT } from '../../styles/SharedStyles';

interface StandardLayoutProps {
  children: ReactNode;
  currentStep?: number;
  totalSteps?: number;
  keyboardAvoiding?: boolean;
  scrollable?: boolean;
}

/**
 * A standardized layout component that enforces consistent positioning
 * of elements across all onboarding screens
 */
export default function StandardLayout({
  children,
  currentStep,
  totalSteps,
  keyboardAvoiding = false,
  scrollable = false,
}: StandardLayoutProps) {
  const { width } = useWindowDimensions();
  const maxWidth = Math.min(width, 480);
  
  const content = (
    <>
      {currentStep && totalSteps && (
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      )}
      
      <View style={[styles.contentContainer, { maxWidth }]}>
        {children}
      </View>
    </>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      {keyboardAvoiding ? (
        <KeyboardAvoidingView
          style={styles.keyboardAvoidView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
        >
          {scrollable ? (
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {content}
            </ScrollView>
          ) : (
            content
          )}
        </KeyboardAvoidingView>
      ) : (
        <>
          {scrollable ? (
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {content}
            </ScrollView>
          ) : (
            content
          )}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8E1E7', // Blush Pink
    paddingHorizontal: 24,
  },
  keyboardAvoidView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: LAYOUT.CONTENT_HORIZONTAL_PADDING,
  },
});
