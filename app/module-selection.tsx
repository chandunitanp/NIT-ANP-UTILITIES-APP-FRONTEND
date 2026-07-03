import {
  View,
  TouchableOpacity,
  Text,
} from "react-native";

import { router } from "expo-router";

export default function ModuleSelection() {

  return (

    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
        gap: 20,
      }}
    >

      <TouchableOpacity
        style={{
          backgroundColor: "#1976d2",
          padding: 20,
          borderRadius: 12,
        }}
        onPress={() =>
          router.push(
            "/(admin-tabs)/tickets"
          )
        }
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          🎫 Ticket Tool
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#2e7d32",
          padding: 20,
          borderRadius: 12,
        }}
        onPress={() =>
          router.push(
            "/notice-board"
          )
        }
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          📢 Notice Board
        </Text>
      </TouchableOpacity>

    </View>
  );
}