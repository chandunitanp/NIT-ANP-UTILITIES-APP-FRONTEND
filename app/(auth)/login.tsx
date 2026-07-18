import React, {
  useState,
} from "react";

import {
  View,
  TextInput,
  Alert,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { useRouter } from "expo-router";
import { useEffect } from "react";

import {
  useFocusEffect,
} from "@react-navigation/native";

import { useAuth } from "../../context/AuthContext";

export default function Login() {

  // =========================================================
  // ROUTER
  // =========================================================

  const router = useRouter();

  // =========================================================
  // STATE
  // =========================================================

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // AUTH
  // =========================================================

  const { login } = useAuth();

  // =========================================================
  // RESET FORM WHEN SCREEN OPENS
  // =========================================================

  useFocusEffect(
    React.useCallback(() => {

      setEmail("");

      setPassword("");

      return () => {};

    }, [])
  );


  // =========================================================
  // LOGIN FUNCTION
  // =========================================================

  const handleLogin = async () => {

    const cleanEmail =
      email.trim().toLowerCase();

    const cleanPassword =
      password.trim();

    // =====================================================
    // VALIDATION
    // =====================================================

    if (!cleanEmail || !cleanPassword) {

      Alert.alert(
        "Error",
        "Email and Password required"
      );

      return;
    }

    try {

      setLoading(true);

      if (__DEV__) {

        console.log(
          "🚀 LOGIN BUTTON CLICKED"
        );
      }

      // =================================================
      // LOGIN API
      // =================================================

      await login(
        cleanEmail,
        cleanPassword
      );

      if (__DEV__) {

        console.log(
          "✅ LOGIN SUCCESS"
        );
      }

      // =================================================
      // CLEAR INPUTS AFTER LOGIN
      // =================================================

      setEmail("");

      setPassword("");

      // =================================================
      // NO MANUAL NAVIGATION
      // =================================================
      // index.tsx handles role-based redirects

    } catch (error: any) {

      if (__DEV__) {

        console.log(
          "❌ LOGIN FAILED"
        );

        console.log(
          "❌ STATUS:",
          error?.response?.status
        );

        console.log(
          "❌ MESSAGE:",
          error?.response?.data?.message
        );
      }

      const message =

        error?.response?.data?.message ||

        error?.response?.data ||

        "Invalid credentials";

      Alert.alert(
        "Login Failed",
        String(message)
      );

    } finally {

      setLoading(false);
    }
  };

  // =========================================================
  // UI
  // =========================================================

  return (

    <KeyboardAvoidingView

      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }

      style={{ flex: 1 }}
    >

      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >

        {/* ================================================= */}
        {/* LOGO */}
        {/* ================================================= */}

        <Image
          source={require("../../assets/nitlogo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* ================================================= */}
        {/* TITLE */}
        {/* ================================================= */}

        <Text style={styles.title}>
          NIT ANDHRA PRADESH
        </Text>

        <Text style={styles.subTitle}>
          UTILITIES APP
        </Text>

        {/* ================================================= */}
        {/* EMAIL */}
        {/* ================================================= */}

        <TextInput
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
          placeholderTextColor="#777"
        />

        {/* ================================================= */}
        {/* PASSWORD */}
        {/* ================================================= */}

        <TextInput
          placeholder="Enter Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholderTextColor="#777"
        />

        {/* ================================================= */}
        {/* LOGIN BUTTON */}
        {/* ================================================= */}

        {loading ? (

          <ActivityIndicator
            size="large"
            color="#0d47a1"
          />

        ) : (

         <>
  <TouchableOpacity
    style={styles.loginButton}
    onPress={handleLogin}
  >
    <Text style={styles.loginButtonText}>
      Login
    </Text>
  </TouchableOpacity>

</>
        )}
        {/* ================================================= */}
        {/* FORGOT PASSWORD */}
        {/* ================================================= */}

        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() =>
            router.push("/(auth)/forgot-password")
          }
        >

          <Text style={styles.link}>
            Forgot Password?
          </Text>

        </TouchableOpacity>

        {/* ================================================= */}
        {/* CREATE ACCOUNT */}
        {/* ================================================= */}

        <TouchableOpacity
          style={{ marginTop: 15 }}
          onPress={() =>
            router.push("/(auth)/register")
          }
        >

          <Text style={styles.registerLink}>
            Create New Account
          </Text>

        </TouchableOpacity>

        {/* ================================================= */}
        {/* FOOTER */}
        {/* ================================================= */}

        <Text style={styles.footerText}>
          Developed by SWNT
        </Text>

      </ScrollView>

    </KeyboardAvoidingView>
  );
}

// =========================================================
// STYLES
// =========================================================

const styles = StyleSheet.create({

  container: {

    flexGrow: 1,

    justifyContent: "center",

    padding: 24,

    backgroundColor: "#ffffff",
  },

  logo: {

    width: 400,

    height: 400,

    alignSelf: "center",

    marginTop: -40,

    marginBottom: -60,
  },

  title: {

    textAlign: "center",

    fontSize: 30,

    fontWeight: "bold",

    color: "#0d47a1",
  },

  subTitle: {

    textAlign: "center",

    fontSize: 20,

    fontWeight: "600",

    color: "#1565c0",

    marginBottom: 35,

    marginTop: 5,
  },

  input: {

    borderWidth: 1,

    borderColor: "#cfd8dc",

    borderRadius: 12,

    padding: 14,

    marginBottom: 18,

    fontSize: 16,

    backgroundColor: "#f9fbfc",
  },

  loginButton: {

    backgroundColor: "#1976d2",

    paddingVertical: 16,

    borderRadius: 12,

    alignItems: "center",

    elevation: 3,
  },

  loginButtonText: {

    color: "#fff",

    fontWeight: "bold",

    fontSize: 18,
  },

  link: {

    textAlign: "center",

    color: "#1976d2",

    fontWeight: "600",

    fontSize: 16,
  },

  footerText: {

    textAlign: "center",

    marginTop: 25,

    color: "#757575",

    fontSize: 14,

    fontStyle: "italic",
  },

  registerLink: {

    textAlign: "center",

    color: "#0d47a1",

    fontWeight: "bold",

    fontSize: 17,
  },




});
