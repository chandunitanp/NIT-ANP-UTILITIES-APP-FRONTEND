import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";

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

export default function StudentNoticesScreen() {

  const [notices, setNotices] =
    useState<Notice[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadNotices();
  }, []);

  const loadNotices = async () => {

    try {

      const response =
        await api.get("/notifications");

      setNotices(response.data);

    } catch (error) {

      Alert.alert(
        "Error",
        "Unable to load notices"
      );

    } finally {

      setLoading(false);
    }
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
        backgroundColor: "#F5F7FA",
        padding: 16,
      }}
    >

      <FlatList
        data={notices}
        keyExtractor={(item) =>
          item.id.toString()
        }
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (

          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 16,
              marginBottom: 12,

              shadowColor: "#000",
              shadowOpacity: 0.08,
              shadowRadius: 4,

              elevation: 2,
            }}
          >

            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: "#111827",
              }}
            >
              {item.title}
            </Text>

            <Text
              style={{
                marginTop: 10,
                color: "#4B5563",
                lineHeight: 22,
              }}
            >
              {item.message}
            </Text>

            <View
              style={{
                marginTop: 14,
                borderTopWidth: 1,
                borderTopColor: "#E5E7EB",
                paddingTop: 10,
              }}
            >

              <Text
                style={{
                  color: "#6B7280",
                  fontSize: 12,
                }}
              >
                Department: {item.department}
              </Text>

              <Text
                style={{
                  color: "#6B7280",
                  fontSize: 12,
                  marginTop: 4,
                }}
              >
                Posted By: {item.createdBy}
              </Text>

              <Text
                style={{
                  color: "#6B7280",
                  fontSize: 12,
                  marginTop: 4,
                }}
              >
                {new Date(
                  item.createdAt
                ).toLocaleString()}
              </Text>

            </View>

          </View>

        )}
        ListEmptyComponent={

          <View
            style={{
              alignItems: "center",
              marginTop: 50,
            }}
          >

            <Text
              style={{
                color: "#6B7280",
              }}
            >
              No notices available
            </Text>

          </View>

        }
      />

    </View>

  );
}