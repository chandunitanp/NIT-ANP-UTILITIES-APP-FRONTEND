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
          styles.container
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
            Student Service Portal
          </Text>

        </View>

        {/* ================= PROFILE CARD ================= */}

        <View style={styles.profileCard}>

          <View style={styles.avatar}>

            <Text style={styles.avatarText}>
              {user?.name
                ?.charAt(0)
                ?.toUpperCase() || "S"}
            </Text>

          </View>

          <Text style={styles.name}>
            {user?.name}
          </Text>

          <Text style={styles.email}>
            {user?.email}
          </Text>

        </View>

        {/* ================= DETAILS CARD ================= */}

        <View style={styles.detailsCard}>

          <View style={styles.infoBox}>

            <Text style={styles.label}>
              Name
            </Text>

            <Text style={styles.value}>
              {user?.name}
            </Text>

          </View>

          <View style={styles.infoBox}>

            <Text style={styles.label}>
              Email
            </Text>

            <Text style={styles.value}>
              {user?.email}
            </Text>

          </View>

          <View style={styles.infoBox}>

            <Text style={styles.label}>
              Role
            </Text>

            <Text style={styles.value}>
              {user?.role}
            </Text>

          </View>

    

          <View style={styles.infoBox}>
  <Text style={styles.label}>Department</Text>
  <Text style={styles.value}>
    {user?.departmentName  || "Not Assigned"}
  </Text>
</View>

        </View>

        {/* ================= EDIT PROFILE ================= */}

<TouchableOpacity
  style={styles.editButton}
  onPress={() => router.push("/profile/edit")}
>
  <Text style={styles.editText}>
    Edit Profile
  </Text>
</TouchableOpacity>

        {/* ================= LOGOUT ================= */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
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

  safe: {
    flex: 1,
    backgroundColor: "#f4f7fb",
  },

  container: {
    padding: 20,
    paddingBottom: 40,
  },

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
    color: "#607d8b",
  },

  profileCard: {
    backgroundColor: "#1565c0",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    marginBottom: 25,
    elevation: 5,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1565c0",
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },

  email: {
    marginTop: 6,
    color: "#e3f2fd",
    fontSize: 14,
  },

  detailsCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    elevation: 4,
  },

  infoBox: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 14,
    marginBottom: 14,
  },

  lastInfo: {
    borderBottomWidth: 0,
    marginBottom: 0,
    paddingBottom: 0,
  },

  label: {
    fontSize: 14,
    color: "#78909c",
    marginBottom: 4,
  },

  value: {
    fontSize: 17,
    fontWeight: "600",
    color: "#263238",
  },

  logoutButton: {
    marginTop: 30,
    backgroundColor: "#d32f2f",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    elevation: 3,
  },

  logoutText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },

  editButton: {
  marginTop: 30,
  backgroundColor: "#1976D2",
  paddingVertical: 16,
  borderRadius: 14,
  alignItems: "center",
  elevation: 3,
},

editText: {
  color: "#fff",
  fontSize: 17,
  fontWeight: "bold",
},

});
