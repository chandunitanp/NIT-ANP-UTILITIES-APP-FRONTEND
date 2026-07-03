import {
  View,
  TextInput,
  Button,
  Alert,
  Text,
} from "react-native";

import { useState } from "react";

import { useRouter } from "expo-router";

import api from "../../api/axios";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");

  const router = useRouter();

  const sendCode = async () => {

    if (!email.trim()) {

      Alert.alert(
        "Error",
        "Email is required"
      );

      return;
    }

    try {

      await api.post(
        "/auth/forgot-password",
        null,
        {
          params: {
            email: email
              .trim()
              .toLowerCase(),
          },
        }
      );

      Alert.alert(
        "Success",
        "Reset code sent to email"
      );

      // ✅ CORRECT ROUTE

  router.push({
        pathname: "/(auth)/reset-password",
        params: { email: email.trim().toLowerCase() },
      });


    } catch (error: any) {

      console.log(
        error?.response?.data
      );

      Alert.alert(
        "Error",
        "Email not registered"
      );
    }
  };

  return (

    <View style={{ padding: 24 }}>

      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 16,
        }}
      >
        Reset Password
      </Text>

      <TextInput
        placeholder="Registered Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{
          borderWidth: 1,
          marginBottom: 20,
          padding: 10,
          borderRadius: 6,
        }}
      />

      <Button
        title="Send Reset Code"
        onPress={sendCode}
      />

    </View>
  );
}