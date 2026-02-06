import { Tabs, Redirect } from "expo-router";
import { useAuth } from "../(auth)/AuthContext";
import { canCreate } from "../utils/roleGuard";

export default function TabsLayout() {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="notices" />
      {canCreate(user.role) && <Tabs.Screen name="create" />}
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
