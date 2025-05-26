# Building a Project:
npx create-expo-app@latest ./
npm run reset-project
npm install nativewind tailwindcss react-native-reanimated react-native-safe-area-context react-native-modal
npx tailwindcss init
npx expo customize metro.config.js

# Clerk:
npx expo install react-dom react-native-web @expo/metro-runtime
npm install @clerk/clerk-expo
npm install expo-secure-store