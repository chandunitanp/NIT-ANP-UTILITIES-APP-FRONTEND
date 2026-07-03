import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function ProfileScreen() {

  const router = useRouter();

  const {
    user,
    logout,
  } = useAuth();

  const handleLogout = () => {

    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },

        {
          text: "Logout",
          style: "destructive",

          onPress: async () => {

            await logout();

            router.replace(
              "/(auth)/login"
            );
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Profile
      </Text>

      <View style={styles.card}>
        <Text style={styles.info}>
          Name: {user?.name}
        </Text>

        <Text style={styles.info}>
          Email: {user?.email}
        </Text>

        <Text style={styles.info}>
          Role: {user?.role}
        </Text>

        <Text style={styles.info}>
  Department: {user?.departmentName || "N/A"}
</Text>

      
      </View>

      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7fb",
    padding: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
  },

  info: {
    fontSize: 16,
    marginBottom: 10,
  },

  logoutBtn: {
    backgroundColor: "#d32f2f",
    padding: 16,
    borderRadius: 12,
    marginTop: 30,
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});
