import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function TeamMemberHome() {

  const router = useRouter();

  const { user } = useAuth();

  return (

    <ScrollView
      contentContainerStyle={styles.container}
    >

      <View style={styles.header}>

        <Text style={styles.welcome}>
          Welcome
        </Text>

        <Text style={styles.name}>
          {user?.name}
        </Text>

        <Text style={styles.team}>
          {user?.teamType}
        </Text>

      </View>

      <View style={styles.userCard}>

        <Text style={styles.email}>
          {user?.email}
        </Text>

        <Text style={styles.role}>
          Role: {user?.role}
        </Text>

      </View>

      <Text style={styles.sectionTitle}>
        Quick Actions
      </Text>

      <TouchableOpacity
        style={styles.actionCard}
        onPress={() =>
          router.push("/(team-member-tabs)/tickets")
        }
      >
        <Text style={styles.cardTitle}>
          Assigned Tickets
        </Text>

        <Text style={styles.cardDesc}>
          View and update assigned tickets
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionCard}
        onPress={() =>
          router.push("/(team-member-tabs)/profile")
        }
      >
        <Text style={styles.cardTitle}>
          My Profile
        </Text>

        <Text style={styles.cardDesc}>
          View account details
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f4f7fb",
  },

  header: {
    marginTop: 20,
    marginBottom: 20,
  },

  welcome: {
    fontSize: 18,
    color: "#607d8b",
  },

  name: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0d47a1",
  },

  team: {
    fontSize: 16,
    color: "#546e7a",
    marginTop: 4,
  },

  userCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 25,
    elevation: 3,
  },

  email: {
    fontSize: 15,
    color: "#455a64",
  },

  role: {
    marginTop: 5,
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },

  actionCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0d47a1",
  },

  cardDesc: {
    marginTop: 5,
    color: "#666",
  },
});