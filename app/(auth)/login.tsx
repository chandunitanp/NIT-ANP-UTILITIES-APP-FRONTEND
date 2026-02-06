import { View, TextInput, Button, Alert, Image, Text } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "./AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and password required");
      return;
    }

    try {
      await login(email, password);
      // ✅ NO manual navigation needed
    } catch {
      Alert.alert("Invalid credentials");
    }
  };

  return (
    <View style={{ padding: 24 }}>
      <Image
        source={require("../../assets/nitlogo.png")}
        style={{
          width: 120,
          height: 120,
          alignSelf: "center",
          marginBottom: 20,
        }}
      />

      <Text
        style={{
          textAlign: "center",
          fontSize: 22,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        NIT Notice Board
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{
          borderWidth: 1,
          marginBottom: 12,
          padding: 10,
          borderRadius: 6,
        }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          marginBottom: 20,
          padding: 10,
          borderRadius: 6,
        }}
      />

      <Button title="Login" onPress={handleLogin} />

      <Text
        style={{
          color: "blue",
          marginTop: 18,
          textAlign: "center",
        }}
        onPress={() => router.push("/(auth)/forgot-password")}
      >
        Forgot / Reset Password?
      </Text>
    </View>
  );
}
