import React from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAppContext } from '@/context/AppContext';

export default function JourneyScreen() {
  const { state } = useAppContext();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { width } = useWindowDimensions();
  const maxWidth = Math.min(width, 480);
  
  // Sample data for the journey screen
  const streakDays = 7;
  const completedTasks = 23;
  const badges = [
    { id: '1', title: 'Early Bird', description: 'Complete morning routine for 5 days', icon: 'sunny', earned: true },
    { id: '2', title: 'Hydration Hero', description: 'Track water intake for 7 days', icon: 'water', earned: true },
    { id: '3', title: 'Bookworm', description: 'Read for 10 days straight', icon: 'book', earned: false },
    { id: '4', title: 'Glow Master', description: 'Complete a 21-day challenge', icon: 'sparkles', earned: false },
  ];
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.content, { maxWidth }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Your Journey
          </Text>
          <Text style={[styles.subtitle, { color: colors.mediumGray }]}>
            Track your progress and achievements
          </Text>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: colorScheme === 'dark' ? '#444444' : '#FFFFFF' }]}>
            <View style={[styles.statIconContainer, { backgroundColor: colors.primary }]}>
              <Ionicons name="flame" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.statContent}>
              <Text style={[styles.statValue, { color: colors.text }]}>{streakDays}</Text>
              <Text style={[styles.statLabel, { color: colors.mediumGray }]}>Day Streak</Text>
            </View>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: colorScheme === 'dark' ? '#444444' : '#FFFFFF' }]}>
            <View style={[styles.statIconContainer, { backgroundColor: colors.primary }]}>
              <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.statContent}>
              <Text style={[styles.statValue, { color: colors.text }]}>{completedTasks}</Text>
              <Text style={[styles.statLabel, { color: colors.mediumGray }]}>Tasks Completed</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.progressContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Weekly Progress
          </Text>
          
          <View style={[styles.progressCard, { backgroundColor: colorScheme === 'dark' ? '#444444' : '#FFFFFF' }]}>
            <View style={styles.progressHeader}>
              <Text style={[styles.progressTitle, { color: colors.text }]}>This Week</Text>
              <Text style={[styles.progressSubtitle, { color: colors.mediumGray }]}>May 15 - May 21</Text>
            </View>
            
            <View style={styles.progressBars}>
              <View style={styles.progressItem}>
                <View style={styles.progressLabelContainer}>
                  <Text style={[styles.progressLabel, { color: colors.text }]}>Mindfulness</Text>
                  <Text style={[styles.progressPercentage, { color: colors.mediumGray }]}>80%</Text>
                </View>
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBarBackground, { backgroundColor: colors.softGray }]}>
                    <View 
                      style={[styles.progressBarFill, { backgroundColor: colors.primary, width: '80%' }]} 
                    />
                  </View>
                </View>
              </View>
              
              <View style={styles.progressItem}>
                <View style={styles.progressLabelContainer}>
                  <Text style={[styles.progressLabel, { color: colors.text }]}>Fitness</Text>
                  <Text style={[styles.progressPercentage, { color: colors.mediumGray }]}>60%</Text>
                </View>
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBarBackground, { backgroundColor: colors.softGray }]}>
                    <View 
                      style={[styles.progressBarFill, { backgroundColor: colors.primary, width: '60%' }]} 
                    />
                  </View>
                </View>
              </View>
              
              <View style={styles.progressItem}>
                <View style={styles.progressLabelContainer}>
                  <Text style={[styles.progressLabel, { color: colors.text }]}>Self-Care</Text>
                  <Text style={[styles.progressPercentage, { color: colors.mediumGray }]}>90%</Text>
                </View>
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBarBackground, { backgroundColor: colors.softGray }]}>
                    <View 
                      style={[styles.progressBarFill, { backgroundColor: colors.primary, width: '90%' }]} 
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.badgesContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Badges
          </Text>
          
          <View style={styles.badgesGrid}>
            {badges.map((badge) => (
              <View 
                key={badge.id}
                style={[
                  styles.badgeCard, 
                  { 
                    backgroundColor: colorScheme === 'dark' ? '#444444' : '#FFFFFF',
                    opacity: badge.earned ? 1 : 0.6,
                  }
                ]}
              >
                <View 
                  style={[
                    styles.badgeIconContainer, 
                    { backgroundColor: badge.earned ? colors.primary : colors.softGray }
                  ]}
                >
                  <Ionicons 
                    name={badge.icon as any} 
                    size={24} 
                    color="#FFFFFF" 
                  />
                </View>
                <Text 
                  style={[
                    styles.badgeTitle, 
                    { color: colors.text }
                  ]}
                >
                  {badge.title}
                </Text>
                <Text 
                  style={[
                    styles.badgeDescription, 
                    { color: colors.mediumGray }
                  ]}
                  numberOfLines={2}
                >
                  {badge.description}
                </Text>
                {!badge.earned && (
                  <View style={styles.badgeLocked}>
                    <Ionicons name="lock-closed" size={16} color={colors.mediumGray} />
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
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
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Manrope',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333', // Charcoal
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#666666', // Medium Gray
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#B56DA5', // Plum Purple
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontFamily: 'Manrope',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333', // Charcoal
  },
  statLabel: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#666666', // Medium Gray
  },
  sectionTitle: {
    fontFamily: 'Manrope',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333', // Charcoal
    marginBottom: 16,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressCard: {
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  progressHeader: {
    marginBottom: 16,
  },
  progressTitle: {
    fontFamily: 'Manrope',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333', // Charcoal
    marginBottom: 4,
  },
  progressSubtitle: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#666666', // Medium Gray
  },
  progressBars: {
    gap: 16,
  },
  progressItem: {
    marginBottom: 12,
  },
  progressLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#333333', // Charcoal
  },
  progressPercentage: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#666666', // Medium Gray
  },
  progressBarContainer: {
    height: 8,
    width: '100%',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarBackground: {
    height: '100%',
    width: '100%',
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#B56DA5', // Plum Purple
    borderRadius: 4,
  },
  badgesContainer: {
    marginBottom: 16,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badgeCard: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  badgeIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#B56DA5', // Plum Purple
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  badgeTitle: {
    fontFamily: 'Manrope',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333', // Charcoal
    marginBottom: 4,
    textAlign: 'center',
  },
  badgeDescription: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#666666', // Medium Gray
    textAlign: 'center',
  },
  badgeLocked: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});
