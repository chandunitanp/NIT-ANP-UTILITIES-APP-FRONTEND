import { useFocusEffect } from "expo-router";
import React, {useCallback , useEffect, useState } from "react";
import * as Linking from "expo-linking";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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

export default function FacultyNoticesScreen() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

 useFocusEffect(
  useCallback(() => {
    loadNotices();
  }, [])
);

  const loadNotices = async () => {
    try {
      const response = await api.get("/notifications");
      setNotices(response.data);
    } catch (error) {
      Alert.alert("Error", "Unable to load notices");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#F5F7FA",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#F5F7FA",
      }}
      edges={["top"]}
    >
      <View
        style={{
          flex: 1,
          padding: 16,
        }}
      >
        {/* HEADER */}

        <Text
          style={{
            fontSize: 26,
            fontWeight: "700",
            color: "#111827",
            marginBottom: 16,
          }}
        >
          Notice Board
        </Text>

        {/* CREATE NOTICE */}

        <TouchableOpacity
          onPress={() => router.push("/create-notice")}
          style={{
            backgroundColor: "#2563EB",
            paddingVertical: 14,
            borderRadius: 12,
            marginBottom: 16,
            elevation: 2,
          }}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontWeight: "600",
              fontSize: 16,
            }}
          >
            + Create Notice
          </Text>
        </TouchableOpacity>

        {/* NOTICE LIST */}

        <FlatList
          data={notices}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 24,
          }}
          ListEmptyComponent={
            <View
              style={{
                marginTop: 50,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#6B7280",
                  fontSize: 16,
                }}
              >
                No notices available
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 14,
                padding: 16,
                marginBottom: 14,

                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.08,
                shadowRadius: 4,

                elevation: 3,
              }}
            >
              {/* TITLE */}

              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "700",
                  color: "#111827",
                }}
              >
                {item.title}
              </Text>

              {/* MESSAGE */}

              <Text
                style={{
                  marginTop: 10,
                  color: "#4B5563",
                  lineHeight: 22,
                  fontSize: 14,
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
      marginTop: 12,
      backgroundColor: "#EFF6FF",
      padding: 10,
      borderRadius: 8,
    }}
  >
    <Text
      style={{
        color: "#2563EB",
        fontWeight: "600",
      }}
    >
      📎 View Attachment
    </Text>
  </TouchableOpacity>
)}

              {/* FOOTER */}

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
                 Created At: {item.createdAt}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
