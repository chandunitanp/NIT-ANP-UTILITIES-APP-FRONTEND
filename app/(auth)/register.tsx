import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import { Picker } from "@react-native-picker/picker";

import axios from "axios";

import { useRouter } from "expo-router";

export default function Register() {

  // =========================================================
  // ROUTER
  // =========================================================

  const router = useRouter();

  // =========================================================
  // LOADING
  // =========================================================

  const [loading, setLoading] =
    useState(false);

  // =========================================================
  // FORM STATES
  // =========================================================

  const [name, setName] =
    useState("");

  const [gender, setGender] =
    useState("");

  const [departmentName, setDepartmentName] =
    useState("");

  const [branchCode, setBranchCode] =
    useState("");

  const [personalEmail, setPersonalEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  // =========================================================
  // REGISTER FUNCTION
  // =========================================================

  const handleRegister = async () => {

    // =====================================================
    // CLEAN DATA
    // =====================================================

    const cleanEmail =
      email.trim().toLowerCase();

    const cleanPassword =
      password.trim();

    const cleanConfirmPassword =
      confirmPassword.trim();

    // =====================================================
    // VALIDATION
    // =====================================================

    if (
      !name ||
      !phone ||
      !cleanEmail ||
      !cleanPassword
    ) {

      Alert.alert(
        "Error",
        "Please fill all required fields"
      );

      return;
    }

    if (!branchCode) {
  Alert.alert("Error", "Please select program");
  return;
}

    // =====================================================
    // PASSWORD MATCH
    // =====================================================

    if (
      cleanPassword !== cleanConfirmPassword
    ) {

      Alert.alert(
        "Error",
        "Passwords do not match"
      );

      return;
    }

    // =====================================================
    // PASSWORD LENGTH
    // =====================================================

    if (cleanPassword.length < 6) {

      Alert.alert(
        "Error",
        "Password must be at least 6 characters"
      );

      return;
    }

    try {

      setLoading(true);

      if (__DEV__) {

        console.log(
          "🚀 REGISTER BUTTON CLICKED"
        );
      }

      // =================================================
      // REGISTER API
      // =================================================

      await axios.post(

        // 🔥 CHANGE THIS IP

        "http://172.180.6.211:8080/auth/register",

        {
          name: name.trim(),

          gender: gender.trim(),

          departmentName:
            departmentName.trim(),

          branchCode:
            branchCode.trim(),

          personalEmail:
            personalEmail.trim(),

          phone: phone.trim(),

          email: cleanEmail,

          password: cleanPassword,
        }
      );

      if (__DEV__) {

        console.log(
          "✅ REGISTRATION SUCCESS"
        );
      }

      // =================================================
      // SUCCESS ALERT
      // =================================================

      Alert.alert(
        "Success",
        "Registration successful"
      );

      // =================================================
      // GO TO LOGIN
      // =================================================

      router.replace("/(auth)/login");

    } catch (error: any) {

      if (__DEV__) {

        console.log(
          "❌ REGISTRATION FAILED"
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

        "Registration failed";

      Alert.alert(
        "Registration Failed",
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
      >

        {/* ============================================= */}
        {/* TITLE */}
        {/* ============================================= */}

        <Text style={styles.title}>
          Create Account
        </Text>

        {/* ============================================= */}
        {/* NAME */}
        {/* ============================================= */}

        <TextInput
          placeholder="Full Name *"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        {/* ============================================= */}
        {/* GENDER */}
        {/* ============================================= */}

        <TextInput
          placeholder="Gender"
          style={styles.input}
          value={gender}
          onChangeText={setGender}
        />

        {/* ============================================= */}
        {/* DEPARTMENT */}
        {/* ============================================= */}

        <TextInput
          placeholder="Department"
          style={styles.input}
          value={departmentName}
          onChangeText={setDepartmentName}
        />

        {/* ============================================= */}
        {/* BRANCH */}
        {/* ============================================= */}

       <View style={styles.pickerContainer}>
  <Picker
    selectedValue={branchCode}
    onValueChange={(itemValue) =>
      setBranchCode(itemValue)
    }
  >
    <Picker.Item label="Select Program" value="" />
    <Picker.Item label="UG" value="UG" />
    <Picker.Item label="PG" value="PG" />
    <Picker.Item label="PhD" value="PHD" />
  </Picker>
</View>

        {/* ============================================= */}
        {/* PERSONAL EMAIL */}
        {/* ============================================= */}

        <TextInput
          placeholder="Personal Email"
          style={styles.input}
          value={personalEmail}
          onChangeText={setPersonalEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {/* ============================================= */}
        {/* PHONE */}
        {/* ============================================= */}

        <TextInput
          placeholder="Phone Number *"
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        {/* ============================================= */}
        {/* COLLEGE EMAIL */}
        {/* ============================================= */}

        <TextInput
          placeholder="College Email *"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {/* ============================================= */}
        {/* PASSWORD */}
        {/* ============================================= */}

        <TextInput
          placeholder="Password *"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* ============================================= */}
        {/* CONFIRM PASSWORD */}
        {/* ============================================= */}

        <TextInput
          placeholder="Confirm Password *"
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        {/* ============================================= */}
        {/* REGISTER BUTTON */}
        {/* ============================================= */}

        {loading ? (

          <ActivityIndicator size="large" />

        ) : (

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
          >

            <Text style={styles.registerButtonText}>
              Register
            </Text>

          </TouchableOpacity>
        )}

        {/* ============================================= */}
        {/* LOGIN LINK */}
        {/* ============================================= */}

        <TouchableOpacity

          style={{ marginTop: 20 }}

          onPress={() =>
            router.replace("/(auth)/login")
          }
        >

          <Text style={styles.loginLink}>
            Already have an account? Login
          </Text>

        </TouchableOpacity>

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

    backgroundColor: "#fff",
  },

  title: {

    fontSize: 28,

    fontWeight: "bold",

    textAlign: "center",

    marginBottom: 30,

    color: "#222",
  },

  input: {

    borderWidth: 1,

    borderColor: "#ccc",

    borderRadius: 8,

    padding: 12,

    marginBottom: 15,

    fontSize: 16,
  },

  registerButton: {

    backgroundColor: "#007bff",

    padding: 15,

    borderRadius: 8,

    alignItems: "center",
  },

  registerButtonText: {

    color: "#fff",

    fontWeight: "bold",

    fontSize: 16,
  },

  loginLink: {

    textAlign: "center",

    color: "green",

    fontWeight: "bold",
  },

  pickerContainer: {
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 8,
  marginBottom: 15,
},

});
