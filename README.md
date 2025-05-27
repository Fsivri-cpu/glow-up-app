# Glow Up - Mobile App for Self-Growth and Wellness

![Glow Up Logo](./assets/images/glowup_logo.svg)

Glow Up is a mobile app designed for women focused on self-growth, wellness, and habit tracking. The app emphasizes elegance, motivation, and glow-up challenges. Built with React Native and Expo, it runs on both iOS and Android platforms.

## Features

- **Personalized Onboarding**: Customize your experience with name, icon selection, and goal setting
- **Daily Task Tracking**: Monitor your daily habits and routines
- **Glow-Up Challenges**: Discover and participate in various self-improvement challenges
- **Progress Tracking**: View your journey with streaks, badges, and weekly progress
- **Elegant UI**: Beautiful, responsive design that works across all device sizes

## Tech Stack

- **Framework**: React Native with TypeScript
- **Runtime**: Expo Managed Workflow
- **Navigation**: React Navigation (stack and tab navigators)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **State Management**: Context API with useReducer
- **Fonts**: Manrope for headings, Inter for body text
- **Icons**: Ionicons and SF Symbols

## Getting Started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

3. Open the app in your preferred environment:
   - iOS Simulator
   - Android Emulator
   - Physical device using Expo Go

## Project Structure

```plaintext
/app                  # Main application code using file-based routing
  /(tabs)             # Tab-based navigation screens
    index.tsx         # Home screen
    explore.tsx       # Explore challenges screen
    journey.tsx       # Progress tracking screen
    profile.tsx       # User profile and settings
  /onboarding         # Onboarding flow screens
  splash.tsx          # Splash screen
  welcome.tsx         # Welcome screen
  paywall.tsx         # Subscription options
/assets               # Images, fonts, and other static assets
/components           # Reusable UI components
/context              # Application state management
/constants            # App constants and theme
/hooks                # Custom React hooks
/types                # TypeScript type definitions
```

## Design System

- **Typography**:
  - Titles: Manrope, 28pt
  - Body: Inter, 16pt
  - Buttons: Inter SemiBold, 18pt

- **Color Palette**:
  - Blush Pink (#F8E1E7): App background
  - Plum Purple (#B56DA5): Primary color, buttons
  - Charcoal (#333333): Main text
  - Medium Gray (#666666): Secondary text
  - Soft Gray (#999999): Placeholders

## Roadmap

- Integration with RevenueCat for payments
- Push notifications via Expo Notifications
- Firebase analytics integration
- Social sharing features
- Community challenges

## License

This project is proprietary and confidential.
