import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import './globals.css';

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
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
