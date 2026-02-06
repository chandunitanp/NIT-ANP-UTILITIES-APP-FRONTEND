import { View, Button, Text } from "react-native";
import { useAuth } from "../(auth)/AuthContext";
import { useRouter } from "expo-router";

export default function Profile() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <View style={{ padding: 20 }}>
      <Text>Name: {user?.name}</Text>
      <Text>Email: {user?.email}</Text>
      <Text>Role: {user?.role}</Text>

      <Button
        title="Logout"
        color="red"
        onPress={async () => {
          await logout();
          router.replace("/(auth)/login");
        }}
      />
    </View>
  );
}
