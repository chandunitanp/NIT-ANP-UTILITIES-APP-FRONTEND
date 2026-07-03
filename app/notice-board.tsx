import {
  View,
  TouchableOpacity,
  Text,
} from "react-native";

import { router } from "expo-router";

export default function NoticeBoard() {

  return (

    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#F5F7FA",
      }}
    >

      <TouchableOpacity
        onPress={() =>
          router.push("/create-notice")
        }
        style={{
          backgroundColor: "#2563EB",
          padding: 18,
          borderRadius: 12,
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontSize: 18,
            fontWeight: "700",
          }}
        >
          ➕ Create Notice
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          router.push("/admin-notices")
        }
        style={{
          backgroundColor: "#10B981",
          padding: 18,
          borderRadius: 12,
        }}
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontSize: 18,
            fontWeight: "700",
          }}
        >
          📋 Manage Notices
        </Text>
      </TouchableOpacity>

    </View>

  );
}