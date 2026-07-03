import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";

import api from "../../api/axios";

export default function ResetPassword() {

  const router = useRouter();

  const { email } = useLocalSearchParams<{
    email: string;
  }>();

  const [code, setCode] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleReset = async () => {

    if (!code.trim()) {

      Alert.alert(
        "Error",
        "Enter reset code"
      );

      return;
    }

    if (!newPassword.trim()) {

      Alert.alert(
        "Error",
        "Enter new password"
      );

      return;
    }

    try {

      setLoading(true);

      await api.post(
        "/auth/reset-password",
        {
          email,
          randomString: code.trim(),
          newPassword: newPassword.trim(),
        }
      );

      Alert.alert(
        "Success",
        "Password updated successfully",
        [
          {
            text: "OK",
            onPress: () =>
              router.replace("/login"),
          },
        ]
      );

    } catch (error: any) {

      console.log(
        error?.response?.data
      );

      Alert.alert(
        "Error",
        error?.response?.data?.message ||
          error?.response?.data ||
          "Password reset failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Reset Password
      </Text>

      <Text style={styles.email}>
        {email}
      </Text>

      <TextInput
        placeholder="Enter Reset Code"
        value={code}
        onChangeText={setCode}
        autoCapitalize="characters"
        style={styles.input}
      />

      <TextInput
        placeholder="Enter New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        style={styles.input}
      />

      {loading ? (

        <ActivityIndicator size="large" />

      ) : (

        <TouchableOpacity
          style={styles.button}
          onPress={handleReset}
        >

          <Text style={styles.buttonText}>
            Update Password
          </Text>

        </TouchableOpacity>

      )}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  email: {
    textAlign: "center",
    color: "gray",
    marginBottom: 25,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },

  button: {
    backgroundColor: "#1976d2",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});