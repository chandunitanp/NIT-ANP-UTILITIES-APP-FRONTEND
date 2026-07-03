import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>

      <Stack screenOptions={{ headerShown: false }}>

        {/* ================= INDEX ================= */}

        <Stack.Screen name="index" />

        {/* ================= AUTH ================= */}

        <Stack.Screen name="(auth)" />

        {/* ================= ADMIN ================= */}

        <Stack.Screen name="(admin-tabs)" />

        {/* ================= FACULTY ================= */}

        <Stack.Screen name="(faculty-tabs)" />

        {/* ================= STUDENT ================= */}

        <Stack.Screen name="(student-tabs)" />

        {/* ================= TEAM MEMBER ================= */}

        <Stack.Screen name="(team-member-tabs)" />

        {/* ================= ADMIN MODULES ================= */}

        <Stack.Screen name="module-selection" />

        <Stack.Screen name="notice-board" />

        {/* ================= NOTICES ================= */}

        <Stack.Screen name="create-notice" />

        <Stack.Screen name="admin-notices" />

        <Stack.Screen name="edit-notice" />

      </Stack>

    </AuthProvider>
  );
}