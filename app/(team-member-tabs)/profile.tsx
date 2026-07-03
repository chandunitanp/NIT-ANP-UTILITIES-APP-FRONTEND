import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  StatusBar,
} from "react-native";

import { useAuth } from "../../context/AuthContext";

export default function ProfileScreen() {

  const { user, logout } = useAuth();

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
          },
        },
      ]
    );
  };

  return (

    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >

      <StatusBar
        backgroundColor="#0d47a1"
        barStyle="light-content"
      />

      {/* ================= HEADER ================= */}

      <View style={styles.headerContainer}>

        <Text style={styles.heading}>
          Team Member Profile
        </Text>

        <Text style={styles.subHeading}>
          NIT Andhra Pradesh Service Portal
        </Text>

      </View>

      {/* ================= PROFILE CARD ================= */}

      <View style={styles.profileCard}>

        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {user?.name?.charAt(0)?.toUpperCase() || "T"}
          </Text>
        </View>

        <Text style={styles.userName}>
          {user?.name || "Team Member"}
        </Text>

        <Text style={styles.userEmail}>
          {user?.email || "N/A"}
        </Text>

      </View>

      {/* ================= ACCOUNT DETAILS ================= */}

      <View style={styles.card}>

        <Text style={styles.cardTitle}>
          Account Details
        </Text>

        <View style={styles.row}>
          <Text style={styles.label}>
            Role
          </Text>

          <Text style={styles.value}>
            {user?.role || "N/A"}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>
            Team Type
          </Text>

          <Text style={styles.value}>
            {user?.teamType || "N/A"}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>
            Department
          </Text>

          <Text style={styles.value}>
            {user?.departmentName || "N/A"}
          </Text>
        </View>

      </View>

      {/* ================= WORK INFORMATION ================= */}

      <View style={styles.card}>

        <Text style={styles.cardTitle}>
          Work Information
        </Text>

        <View style={styles.infoBox}>

          <Text style={styles.infoText}>
            • View assigned tickets
          </Text>

          <Text style={styles.infoText}>
            • Update ticket status
          </Text>

          <Text style={styles.infoText}>
            • Add resolution remarks
          </Text>

          <Text style={styles.infoText}>
            • Resolve service requests
          </Text>

        </View>

      </View>

      {/* ================= ACCOUNT STATUS ================= */}

      <View style={styles.card}>

        <Text style={styles.cardTitle}>
          Account Status
        </Text>

        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>
            ACTIVE
          </Text>
        </View>

        <Text style={styles.statusDescription}>
          You are currently logged in and can access assigned tickets.
        </Text>

      </View>

      {/* ================= LOGOUT ================= */}

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >

        <Text style={styles.logoutText}>
          Logout
        </Text>

      </TouchableOpacity>

      {/* ================= FOOTER ================= */}

      <View style={styles.footerContainer}>

        <Text style={styles.footerText}>
          National Institute of Technology
        </Text>

        <Text style={styles.footerText}>
          Andhra Pradesh
        </Text>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    backgroundColor: "#f4f7fb",
    padding: 20,
  },

  headerContainer: {
    alignItems: "center",
    marginTop: 20,
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
    color: "#607d8b",
  },

  profileCard: {
    backgroundColor: "#0d47a1",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    marginBottom: 20,
    elevation: 5,
  },

  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  avatarText: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#0d47a1",
  },

  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },

  userEmail: {
    marginTop: 5,
    color: "#e3f2fd",
    fontSize: 14,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
    elevation: 4,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0d47a1",
    marginBottom: 15,
  },

  row: {
    marginVertical: 6,
  },

  label: {
    fontSize: 13,
    color: "#78909c",
  },

  value: {
    fontSize: 17,
    fontWeight: "600",
    color: "#263238",
    marginTop: 4,
  },

  divider: {
    height: 1,
    backgroundColor: "#eceff1",
    marginVertical: 12,
  },

  infoBox: {
    backgroundColor: "#eef5ff",
    padding: 15,
    borderRadius: 12,
  },

  infoText: {
    fontSize: 15,
    color: "#37474f",
    marginBottom: 8,
  },

  statusBadge: {
    backgroundColor: "#2e7d32",
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },

  statusText: {
    color: "#fff",
    fontWeight: "bold",
  },

  statusDescription: {
    marginTop: 12,
    color: "#546e7a",
    lineHeight: 22,
  },

  logoutButton: {
    backgroundColor: "#e53935",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
    elevation: 4,
  },

  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  footerContainer: {
    marginTop: 30,
    alignItems: "center",
  },

  footerText: {
    color: "#78909c",
    fontSize: 13,
    fontWeight: "600",
  },

});