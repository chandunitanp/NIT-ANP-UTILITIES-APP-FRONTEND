import { Stack } from "expo-router";
import { AuthProvider } from "./(auth)/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Auth flow */}
        <Stack.Screen name="(auth)" />

        {/* App flow */}
        <Stack.Screen name="(tabs)" />
      </Stack>
    </AuthProvider>
  );
}
