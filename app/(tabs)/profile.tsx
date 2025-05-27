import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';
import { Analytics } from '@/utils/analytics';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { useAppContext } from '@/context/AppContext';

export default function ProfileScreen() {
  const { colors, typography, spacing, shadows, borderRadius } = useTheme();
  const { state } = useAppContext();
  const { width } = useWindowDimensions();
  const maxWidth = Math.min(width, 480);
  
  // Track screen view
  useEffect(() => {
    Analytics.trackPageView('/profile');
  }, []);
  
  const userName = state.user?.name || 'User';
  const userIcon = state.user?.selectedIcon || 'sparkle';
  const subscription = state.user?.subscription || 'free';
  
  // Map icon names to Ionicons
  const iconMapping: Record<string, string> = {
    sparkle: 'sparkles',
    flower: 'flower',
    heart: 'heart',
    tree: 'leaf',
    diamond: 'diamond',
    book: 'book',
  };
  
  const handleSubscriptionManagement = () => {
    // In a real app, this would navigate to subscription management screen
    console.log('Navigate to subscription management');
  };
  
  const handleEditProfile = () => {
    // In a real app, this would navigate to profile edit screen
    console.log('Navigate to edit profile');
  };
  
  const handleHelp = () => {
    // In a real app, this would navigate to help screen
    console.log('Navigate to help screen');
  };
  
  const handleLogout = () => {
    // In a real app, this would handle logout functionality
    console.log('Logout');
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.content, { maxWidth }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          style={styles.header}
          entering={FadeInDown.duration(600).springify()}
        >
          <Animated.View 
            style={[styles.profileIconContainer, { backgroundColor: colors.primary }]}
            entering={FadeIn.delay(300).duration(500)}
          >
            <Ionicons 
              name={iconMapping[userIcon] as any} 
              size={40} 
              color="#FFFFFF" 
            />
          </Animated.View>
          <Text style={[styles.profileName, { color: colors.text }]}>
            {userName}
          </Text>
          <View style={[
            styles.subscriptionBadge, 
            { backgroundColor: subscription === 'pro' ? '#F8C1D9' : colors.softGray }
          ]}>
            <Text style={[
              styles.subscriptionText, 
              { color: subscription === 'pro' ? colors.primary : colors.mediumGray }
            ]}>
              {subscription === 'pro' ? 'PRO' : 'FREE'}
            </Text>
          </View>
          
          <Pressable 
            style={[styles.editButton, { borderColor: colors.primary }]}
            onPress={handleEditProfile}
            accessibilityLabel="Edit profile"
          >
            <Text style={[styles.editButtonText, { color: colors.primary }]}>
              Edit Profile
            </Text>
          </Pressable>
        </Animated.View>
        
        <Animated.View 
          style={styles.settingsContainer}
          entering={FadeInDown.delay(200).duration(600).springify()}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Settings
          </Text>
          
          <Pressable 
            style={[styles.settingItem, { borderBottomColor: colors.divider }]}
            onPress={handleSubscriptionManagement}
            accessibilityLabel="Subscription Management"
          >
            <View style={styles.settingIconContainer}>
              <Ionicons name="card" size={24} color={colors.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>
                Subscription Management
              </Text>
              <Text style={[styles.settingDescription, { color: colors.mediumGray }]}>
                {subscription === 'pro' ? 'Manage your Pro subscription' : 'Upgrade to Pro'}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.mediumGray} />
          </Pressable>
          
          <Pressable 
            style={[styles.settingItem, { borderBottomColor: colors.divider }]}
            onPress={() => {}}
            accessibilityLabel="Notification Settings"
          >
            <View style={styles.settingIconContainer}>
              <Ionicons name="notifications" size={24} color={colors.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>
                Notification Settings
              </Text>
              <Text style={[styles.settingDescription, { color: colors.mediumGray }]}>
                Manage your notification preferences
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.mediumGray} />
          </Pressable>
          
          <Pressable 
            style={[styles.settingItem, { borderBottomColor: colors.divider }]}
            onPress={() => {}}
            accessibilityLabel="Appearance"
          >
            <View style={styles.settingIconContainer}>
              <Ionicons name="color-palette" size={24} color={colors.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>
                Appearance
              </Text>
              <Text style={[styles.settingDescription, { color: colors.mediumGray }]}>
                {colors.background === '#1A1A1A' ? 'Dark mode' : 'Light mode'}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.mediumGray} />
          </Pressable>
        </Animated.View>
        
        <Animated.View 
          style={styles.supportContainer}
          entering={FadeInDown.delay(400).duration(600).springify()}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Support
          </Text>
          
          <Pressable 
            style={[styles.settingItem, { borderBottomColor: colors.divider }]}
            onPress={handleHelp}
            accessibilityLabel="Help & Support"
          >
            <View style={styles.settingIconContainer}>
              <Ionicons name="help-circle" size={24} color={colors.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>
                Help & Support
              </Text>
              <Text style={[styles.settingDescription, { color: colors.mediumGray }]}>
                Get assistance and answers
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.mediumGray} />
          </Pressable>
          
          <Pressable 
            style={[styles.settingItem, { borderBottomColor: colors.divider }]}
            onPress={() => {}}
            accessibilityLabel="Terms & Privacy"
          >
            <View style={styles.settingIconContainer}>
              <Ionicons name="document-text" size={24} color={colors.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>
                Terms & Privacy
              </Text>
              <Text style={[styles.settingDescription, { color: colors.mediumGray }]}>
                Legal information
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.mediumGray} />
          </Pressable>
          
          <Pressable 
            style={[styles.settingItem, { borderBottomColor: colors.divider }]}
            onPress={() => {}}
            accessibilityLabel="About"
          >
            <View style={styles.settingIconContainer}>
              <Ionicons name="information-circle" size={24} color={colors.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: colors.text }]}>
                About
              </Text>
              <Text style={[styles.settingDescription, { color: colors.mediumGray }]}>
                App version 1.0.0
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.mediumGray} />
          </Pressable>
        </Animated.View>
        
        <Animated.View 
          style={styles.logoutContainer}
          entering={FadeInDown.delay(600).duration(600).springify()}
        >
          <Pressable 
            style={[styles.logoutButton, { borderColor: colors.error }]}
            onPress={handleLogout}
            accessibilityLabel="Log out"
          >
            <Text style={[styles.logoutButtonText, { color: colors.error }]}>
              Log out
            </Text>
          </Pressable>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8E1E7', // Blush Pink
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  profileIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#B56DA5', // Plum Purple
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileName: {
    fontFamily: 'Manrope',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333', // Charcoal
    marginBottom: 8,
  },
  subscriptionBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#F8C1D9', // Light Pink
    marginBottom: 16,
  },
  subscriptionText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#B56DA5', // Plum Purple
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#B56DA5', // Plum Purple
  },
  editButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#B56DA5', // Plum Purple
  },
  sectionTitle: {
    fontFamily: 'Manrope',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333', // Charcoal
    marginBottom: 16,
  },
  settingsContainer: {
    marginBottom: 32,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#333333', // Charcoal
    marginBottom: 4,
  },
  settingDescription: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#666666', // Medium Gray
  },
  supportContainer: {
    marginBottom: 32,
  },
  logoutContainer: {
    marginBottom: 32,
  },
  logoutButton: {
    paddingVertical: 12,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#B56DA5', // Plum Purple
    alignItems: 'center',
    marginTop: 16,
  },
  logoutButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#B56DA5', // Plum Purple
  },
});
