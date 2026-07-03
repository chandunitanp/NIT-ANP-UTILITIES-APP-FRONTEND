import { Redirect } from "expo-router";
import { useAuth } from "../context/AuthContext";
import {
  View,
  Text,
  ActivityIndicator,
} from "react-native";

export default function Index() {

  const { user, loading } = useAuth();

  if (loading) {

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>
          Loading...
        </Text>
      </View>
    );
  }

  if (user?.role === "ADMIN") {
    return (
      <Redirect href="/module-selection" />
    );
  }

  if (user?.role === "FACULTY") {
    return (
      <Redirect href="/(faculty-tabs)/home" />
    );
  }

  if (user?.role === "STUDENT") {
    return (
      <Redirect href="/(student-tabs)/home" />
    );
  }

  if (user?.role === "TEAM_MEMBER") {
    return (
      <Redirect href="/(team-member-tabs)/home" />
    );
  }

  return (
    <Redirect href="/(auth)/login" />
  );
}