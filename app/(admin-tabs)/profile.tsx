import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  useAuth,
} from "../../context/AuthContext";

import {
  useRouter,
} from "expo-router";

export default function Profile() {

  const {
    user,
    logout,
  } = useAuth();

  const router = useRouter();

  // ================= LOGOUT =================

  const handleLogout = async () => {

    await logout();

    router.replace(
      "/(auth)/login"
    );
  };

  return (

    <SafeAreaView
      style={styles.safe}
    >

      <ScrollView
        contentContainerStyle={
          styles.scrollContainer
        }
        showsVerticalScrollIndicator={
          false
        }
      >

        {/* ================= HEADER ================= */}

        <View style={styles.header}>

          <Text style={styles.heading}>
            My Profile
          </Text>

          <Text style={styles.subHeading}>
            Notice Board Management System
          </Text>

        </View>

        {/* ================= PROFILE CARD ================= */}

        <View style={styles.card}>

          {/* ================= NAME ================= */}

          <View style={styles.infoBox}>

            <Text style={styles.label}>
              Name
            </Text>

            <Text style={styles.value}>
              {user?.name || "N/A"}
            </Text>

          </View>

          {/* ================= EMAIL ================= */}

          <View style={styles.infoBox}>

            <Text style={styles.label}>
              Email
            </Text>

            <Text style={styles.value}>
              {user?.email || "N/A"}
            </Text>

          </View>

          {/* ================= ROLE ================= */}

          <View style={styles.infoBox}>

            <Text style={styles.label}>
              Role
            </Text>

            <Text style={styles.value}>
              {user?.role || "N/A"}
            </Text>

          </View>

          {/* ================= TEAM ================= */}

          <View
            style={[
              styles.infoBox,
              styles.lastInfoBox,
            ]}
          >

            <Text style={styles.label}>
              Team
            </Text>

            <Text style={styles.value}>
              {user?.teamType ||
                "Not Assigned"}
            </Text>

          </View>

        </View>

        {/* ================= LOGOUT BUTTON ================= */}

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >

          <Text style={styles.logoutText}>
            Logout
          </Text>

        </TouchableOpacity>

      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  // ================= SAFE AREA =================

  safe: {
    flex: 1,
    backgroundColor: "#f4f6f8",
  },

  // ================= CONTAINER =================

  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },

  // ================= HEADER =================

  header: {
    marginBottom: 25,
  },

  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0d47a1",
  },

  subHeading: {
    marginTop: 5,
    fontSize: 15,
    color: "#666",
  },

  // ================= PROFILE CARD =================

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.1,

    shadowRadius: 5,

    elevation: 4,
  },

  // ================= INFO BOX =================

  infoBox: {
    marginBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 12,
  },

  lastInfoBox: {
    borderBottomWidth: 0,
    marginBottom: 0,
    paddingBottom: 0,
  },

  label: {
    fontSize: 14,
    color: "#777",
    marginBottom: 4,
  },

  value: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },

  // ================= LOGOUT BUTTON =================

  logoutButton: {
    marginTop: 35,
    backgroundColor: "#d32f2f",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  logoutText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },

});