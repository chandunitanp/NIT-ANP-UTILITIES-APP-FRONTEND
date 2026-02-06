import { View, TextInput, Button, Alert, Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";

export default function ResetPassword() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const resetPassword = async () => {
    if (!code || !newPassword) {
      Alert.alert("Error", "All fields required");
      return;
    }

    try {
      await api.post("/auth/reset-password", {
        email,
        randomString: code,
        newPassword,
      });

      // 🔥 AUTO LOGIN AFTER RESET
      const res = await api.post("/auth/login", {
        email,
        password: newPassword,
      });

      const { token, ...user } = res.data;
      await login(user, token);

      router.replace("/(tabs)/notices");

    } catch {
      Alert.alert("Invalid reset code");
    }
  };

  return (
    <View style={{ padding: 24 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 16,
          textAlign: "center",
        }}
      >
        Set New Password
      </Text>

      <TextInput
        placeholder="Reset Code"
        value={code}
        onChangeText={setCode}
        style={{
          borderWidth: 1,
          marginBottom: 12,
          padding: 10,
          borderRadius: 6,
        }}
      />

      <TextInput
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
        style={{
          borderWidth: 1,
          marginBottom: 20,
          padding: 10,
          borderRadius: 6,
        }}
      />

      <Button title="Update Password" onPress={resetPassword} />
    </View>
  );
}
