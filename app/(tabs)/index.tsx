import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';
import { Analytics } from '@/utils/analytics';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { useAppContext } from '@/context/AppContext';
import { Task } from '@/types';

// Helper function to get greeting based on time of day
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function HomeScreen() {
  const { colors, typography, spacing, shadows, borderRadius } = useTheme();
  const { width } = useWindowDimensions();
  const maxWidth = Math.min(width, 480);
  
  // Track screen view
  useEffect(() => {
    Analytics.trackPageView('/home');
  }, []);
  
  const { state } = useAppContext();
  const [todaysTasks, setTodaysTasks] = useState<Task[]>([]);
  const userName = state.user?.name || 'there';
  const greeting = getGreeting();
  
  // Simulate loading today's tasks
  useEffect(() => {
    // In a real app, these would come from the app state or an API
    const sampleTasks: Task[] = [
      { id: '1', title: 'Morning meditation', completed: false },
      { id: '2', title: 'Drink 2 glasses of water', completed: true },
      { id: '3', title: 'Read for 20 minutes', completed: false },
      { id: '4', title: 'Apply skincare routine', completed: false },
    ];
    
    setTodaysTasks(sampleTasks);
  }, []);
  
  const handleCompleteTask = (taskId: string) => {
    setTodaysTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
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
          <Text style={[styles.greeting, { color: colors.text }]}>
            {greeting}, {userName}
          </Text>
          <Text style={[styles.subtitle, { color: colors.mediumGray }]}>
            Here's what's on your glow-up journey today
          </Text>
        </Animated.View>
        
        <View style={styles.tasksContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Today's Tasks
          </Text>
          
          {todaysTasks.map(task => (
            <Pressable
              key={task.id}
              style={[styles.taskItem, { backgroundColor: colors.cardBackground }]}
              onPress={() => handleCompleteTask(task.id)}
              accessibilityLabel={`${task.title}, ${task.completed ? 'completed' : 'not completed'}`}
              accessibilityState={{ checked: task.completed }}
            >
              <View style={[styles.checkbox, { 
                backgroundColor: task.completed ? colors.primary : 'transparent',
                borderColor: task.completed ? colors.primary : colors.mediumGray,
              }]}>
                {task.completed && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
              <Text style={[styles.taskText, { 
                color: colors.text,
                textDecorationLine: task.completed ? 'line-through' : 'none',
                opacity: task.completed ? 0.7 : 1,
              }]}>
                {task.title}
              </Text>
            </Pressable>
          ))}
        </View>
        
        <View style={styles.motivationContainer}>
          <View style={[styles.motivationCard, { backgroundColor: colors.primary }]}>
            <Ionicons name="sparkles" size={24} color="#FFFFFF" style={styles.motivationIcon} />
            <Text style={styles.motivationText}>
              "Every small step you take is progress toward your glow-up goals."
            </Text>
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
    marginBottom: 32,
  },
  greeting: {
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
  sectionTitle: {
    fontFamily: 'Manrope',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333', // Charcoal
    marginBottom: 16,
  },
  tasksContainer: {
    marginBottom: 32,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  taskText: {
    fontFamily: 'Inter',
    fontSize: 16,
    flex: 1,
  },
  motivationContainer: {
    marginBottom: 16,
  },
  motivationCard: {
    padding: 24,
    borderRadius: 16,
    backgroundColor: '#B56DA5', // Plum Purple
  },
  motivationIcon: {
    marginBottom: 16,
  },
  motivationText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
  },
});
