/**
 * Glow Up App Color Palette
 * These colors are used throughout the app for consistent theming.
 */

const plumPurple = '#B36B9F'; // Updated to match reference image
const blushPink = '#FFEEF2'; // Lighter pink from reference image

export const Colors = {
  light: {
    // Base colors
    background: '#FFEEF2', // Lighter Blush Pink from reference image
    text: '#333333', // Charcoal
    primary: '#B36B9F', // Updated Plum Purple from reference image
    secondary: '#F4B5C6', // Light Pink
    accent: '#E8B4BC', // Dusty Rose
    
    // Text colors
    textSecondary: '#666666', // Medium Gray
    textTertiary: '#999999', // Soft Gray
    textInverted: '#FFFFFF', // White text on dark backgrounds
    
    // UI colors
    mediumGray: '#666666',
    softGray: '#999999',
    border: '#E0E0E0',
    divider: '#EEEEEE',
    
    // Card colors
    cardBackground: '#FFFFFF',
    cardBackgroundPressed: '#F8F8F8',
    
    // Status colors
    success: '#4CAF50', // Green
    error: '#F44336', // Red
    warning: '#FF9800', // Orange
    info: '#2196F3', // Blue
    
    // Additional colors
    highlight: '#FFF9C4', // Soft yellow highlight
    overlay: 'rgba(0, 0, 0, 0.5)', // Modal overlay
    
    // Tab navigation colors
    tabIconDefault: '#999999', // Default tab icon color
    tabIconSelected: '#B36B9F' // Selected tab icon color
  },
  dark: {
    // Base colors
    background: '#1A1A1A', // Dark Gray
    text: '#FFFFFF', // White
    primary: '#B36B9F', // Updated to match reference image
    secondary: '#F4B5C6', // Light Pink
    accent: '#E8B4BC', // Dusty Rose
    
    // Text colors
    textSecondary: '#AAAAAA', // Medium Gray
    textTertiary: '#777777', // Soft Gray
    textInverted: '#333333', // Dark text on light backgrounds
    
    // UI colors
    mediumGray: '#AAAAAA',
    softGray: '#777777',
    border: '#444444',
    divider: '#333333',
    
    // Card colors
    cardBackground: '#2A2A2A',
    cardBackgroundPressed: '#333333',
    
    // Status colors
    success: '#66BB6A', // Lighter Green
    error: '#EF5350', // Lighter Red
    warning: '#FFA726', // Lighter Orange
    info: '#42A5F5', // Lighter Blue
    
    // Additional colors
    highlight: '#4A4A26', // Dark yellow highlight
    overlay: 'rgba(0, 0, 0, 0.7)', // Modal overlay
    
    // Tab navigation colors
    tabIconDefault: '#888888', // Default tab icon color
    tabIconSelected: '#B36B9F' // Selected tab icon color
  },
};
