import React, { useEffect, useState } from "react";
import * as Linking from "expo-linking";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";

import api from "../../api/axios";

interface Notice {
  id: number;
  title: string;
  message: string;
  department: string;
  createdBy: string;
  createdAt: string;
  filePath?: string;
}

export default function NoticesScreen() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotices();
  }, []);

  const loadNotices = async () => {
    try {
      const response = await api.get("/notifications");

      setNotices(response.data);
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "Failed to load notifications"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteNotice = async (id: number) => {
    Alert.alert(
      "Delete Notice",
      "Are you sure?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(
                `/notifications/${id}`
              );

              loadNotices();
            } catch (error) {
              Alert.alert(
                "Error",
                "Delete failed"
              );
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
      }}
    >
      {/* Header */}

      <TouchableOpacity
        onPress={() =>
          router.push("/create-notice")
        }
        style={{
          backgroundColor: "#007AFF",
          padding: 12,
          borderRadius: 8,
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          + Create Notice
        </Text>
      </TouchableOpacity>

      <FlatList
        data={notices}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={({ item }) => (
          <View
            style={{
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 10,
              padding: 12,
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {item.title}
            </Text>

            <Text
              style={{
                marginTop: 8,
              }}
            >
              {item.message}
            </Text>

{item.filePath && (
  <TouchableOpacity
    onPress={() =>
      Linking.openURL(
        `http://172.180.6.211:8080/files/${item.filePath}`
      )
    }
    style={{
      marginTop: 10,
      backgroundColor: "#E8F0FE",
      padding: 10,
      borderRadius: 8,
    }}
  >
    <Text style={{ color: "#007AFF", fontWeight: "600" }}>
      📎 View Attachment
    </Text>
  </TouchableOpacity>
)}

            <Text
              style={{
                marginTop: 8,
                color: "gray",
              }}
            >
              Department: {item.department}
            </Text>

            <Text
              style={{
                color: "gray",
              }}
            >
              Posted By: {item.createdBy}
            </Text>

            <View
              style={{
                flexDirection: "row",
                marginTop: 12,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname:
                      "/edit-notice",
                    params: {
                      id: item.id,
                    },
                  })
                }
                style={{
                  backgroundColor:
                    "#FFA500",
                  padding: 10,
                  borderRadius: 8,
                  marginRight: 10,
                }}
              >
                <Text>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  deleteNotice(item.id)
                }
                style={{
                  backgroundColor:
                    "#FF4D4F",
                  padding: 10,
                  borderRadius: 8,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                  }}
                >
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
