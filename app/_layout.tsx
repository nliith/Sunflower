import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import './globals.css'
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env file'
  );
}

export default function RootLayout() {
  useFrameworkReady();
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <StatusBar hidden={true} />
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(auth)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="movies/[id]"
          options={{ headerShown: false }}
        />
      </Stack>
    </ClerkProvider>
  )
}