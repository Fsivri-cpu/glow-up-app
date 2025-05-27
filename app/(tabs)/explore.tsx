import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';
import { Analytics } from '@/utils/analytics';
import AnimatedCard from '@/components/ui/AnimatedCard';
import EmptyState from '@/components/ui/EmptyState';
import { useAppContext } from '@/context/AppContext';
import { Challenge } from '@/types';

type CategoryItem = {
  id: string;
  title: string;
  description: string;
  iconName: string;
  color: string;
  challengeCount: number;
};

export default function ExploreScreen() {
  const { state } = useAppContext();
  const { colors, spacing, shadows, borderRadius } = useTheme();
  const { width } = useWindowDimensions();
  const maxWidth = Math.min(width, 480);
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading state
  useEffect(() => {
    // Track screen view
    Analytics.trackPageView('/explore');
    
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleCategorySelect = (categoryName: string | null) => {
    setSelectedCategory(categoryName);
    
    // Track category selection
    if (categoryName) {
      Analytics.trackButtonClick(`category_${categoryName.toLowerCase()}`, 'explore');
    } else {
      Analytics.trackButtonClick('category_all', 'explore');
    }
  };
  
  const handleChallengePress = (challengeId: string, challengeTitle: string) => {
    // Track challenge selection
    Analytics.trackButtonClick(`challenge_${challengeId}`, 'explore', {
      challenge_title: challengeTitle,
    });
    
    // Navigate to challenge details (to be implemented)
    console.log(`Navigate to challenge ${challengeId}`);
  };
  
  const categories: CategoryItem[] = [
    {
      id: 'confidence',
      title: 'Confidence',
      description: 'Build your self-esteem and inner strength',
      iconName: 'star',
      color: '#F8C1D9', // Lighter pink
      challengeCount: 5,
    },
    {
      id: 'wellness',
      title: 'Wellness',
      description: 'Nurture your body and mind',
      iconName: 'heart',
      color: '#D8A1E4', // Light purple
      challengeCount: 7,
    },
    {
      id: 'mindfulness',
      title: 'Mindfulness',
      description: 'Practice being present and aware',
      iconName: 'leaf',
      color: '#A1E4C4', // Light green
      challengeCount: 4,
    },
    {
      id: 'beauty',
      title: 'Beauty',
      description: 'Enhance your natural beauty',
      iconName: 'sparkles',
      color: '#E4D1A1', // Light gold
      challengeCount: 6,
    },
    {
      id: 'fitness',
      title: 'Fitness',
      description: 'Strengthen your body',
      iconName: 'barbell',
      color: '#A1C9E4', // Light blue
      challengeCount: 8,
    },
    {
      id: 'knowledge',
      title: 'Knowledge',
      description: 'Expand your mind and learn new skills',
      iconName: 'book',
      color: '#E4A1A1', // Light coral
      challengeCount: 3,
    },
  ];
  
  const handleCategoryPress = (categoryId: string) => {
    // In a real app, this would navigate to a category detail screen
    console.log(`Navigate to category: ${categoryId}`);
  };
  
  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={[styles.content, { maxWidth }]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>
              Explore
            </Text>
            <Text style={[styles.subtitle, { color: colors.mediumGray }]}>
              Discover glow-up challenges by category
            </Text>
          </View>
          
          <View style={styles.loadingState}>
            {/* Skeleton loading UI */}
            {[1, 2, 3].map((_, index) => (
              <Animated.View 
                key={index}
                entering={FadeIn.delay(index * 200)}
                style={[styles.skeletonItem, { backgroundColor: colors.cardBackground }]}
              >
                <View style={styles.skeletonImagePlaceholder} />
                <View style={styles.skeletonContentArea}>
                  <View style={[styles.skeletonLine, { width: '30%' }]} />
                  <View style={[styles.skeletonLine, { width: '80%' }]} />
                  <View style={[styles.skeletonLine, { width: '60%' }]} />
                </View>
              </Animated.View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.content, { maxWidth }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Explore
          </Text>
          <Text style={[styles.subtitle, { color: colors.mediumGray }]}>
            Discover glow-up challenges by category
          </Text>
        </View>
        
        <View style={styles.searchContainer}>
          <View style={[styles.searchBar, { backgroundColor: colors.cardBackground }]}>
            <Ionicons name="search" size={20} color={colors.mediumGray} style={styles.searchIcon} />
            <Text style={[styles.searchPlaceholder, { color: colors.softGray }]}>
              Search challenges...
            </Text>
          </View>
        </View>
        
        <View style={styles.featuredContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Featured Challenge
          </Text>
          
          <Pressable 
            style={[styles.featuredCard, { backgroundColor: colors.primary }]}
            accessibilityLabel="21-Day Glow Up Challenge"
          >
            <View style={styles.featuredContent}>
              <Text style={styles.featuredTitle}>21-Day Glow Up Challenge</Text>
              <Text style={styles.featuredDescription}>
                Transform your habits and boost your confidence in just 3 weeks
              </Text>
              <View style={styles.featuredMeta}>
                <Text style={styles.featuredMetaText}>21 days</Text>
                <Text style={styles.featuredMetaText}>•</Text>
                <Text style={styles.featuredMetaText}>4.9 ★</Text>
              </View>
            </View>
          </Pressable>
        </View>
        
        <View style={styles.categoriesContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Categories
          </Text>
          
          <View style={styles.categoriesGrid}>
            {categories.map((category, index) => (
              <Animated.View key={category.id} entering={FadeIn.delay(index * 100)}>
                <Pressable
                  style={[styles.categoryCard, { backgroundColor: category.color }]}
                  onPress={() => handleCategoryPress(category.id)}
                >
                  <Ionicons name={category.iconName as any} size={24} color="white" />
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                  <Text style={styles.challengeCount}>{category.challengeCount} challenges</Text>
                </Pressable>
              </Animated.View>
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
  searchContainer: {
    marginBottom: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 24,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  // Skeleton loading styles
  loadingState: {
    marginBottom: 24,
  },
  skeletonItem: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    height: 200,
  },
  skeletonImagePlaceholder: {
    height: 120,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  skeletonContentArea: {
    padding: 16,
  },
  skeletonLine: {
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginBottom: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchPlaceholder: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#999999', // Soft Gray
  },
  sectionTitle: {
    fontFamily: 'Manrope',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333', // Charcoal
    marginBottom: 16,
  },
  featuredContainer: {
    marginBottom: 32,
  },
  featuredCard: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#B56DA5', // Plum Purple
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featuredContent: {
    padding: 24,
  },
  featuredTitle: {
    fontFamily: 'Manrope',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  featuredDescription: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 16,
  },
  featuredMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredMetaText: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
    marginRight: 8,
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
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
  },
  categoryIcon: {
    marginBottom: 12,
  },
  categoryTitle: {
    fontFamily: 'Manrope',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  challengeCount: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
    textAlign: 'center',
  },
});
