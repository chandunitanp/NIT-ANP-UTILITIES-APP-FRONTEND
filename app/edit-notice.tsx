import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import {
  useLocalSearchParams,
  router,
} from "expo-router";

import api from "../api/axios";

export default function EditNoticeScreen() {

  const { id } =
    useLocalSearchParams();

  const [title, setTitle] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [department, setDepartment] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {

    loadNotice();

  }, []);

  const loadNotice = async () => {

    try {

      const response =
        await api.get(
          `/notifications/${id}`
        );

      const notice =
        response.data;

      setTitle(notice.title);

      setMessage(notice.message);

      setDepartment(
        notice.department || ""
      );

    } catch (error) {

      Alert.alert(
        "Error",
        "Failed to load notice"
      );

      router.back();

    } finally {

      setLoading(false);
    }
  };

  const updateNotice = async () => {

    if (!title.trim()) {

      Alert.alert(
        "Validation",
        "Title is required"
      );

      return;
    }

    if (!message.trim()) {

      Alert.alert(
        "Validation",
        "Message is required"
      );

      return;
    }

    try {

      setSaving(true);

      await api.put(
        `/notifications/${id}`,
        {
          title,
          message,
          department,
        }
      );

      Alert.alert(
        "Success",
        "Notice updated successfully"
      );

      router.back();

    } catch (error) {

      Alert.alert(
        "Error",
        "Failed to update notice"
      );

    } finally {

      setSaving(false);
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
        <ActivityIndicator
          size="large"
        />
      </View>
    );
  }

  return (

    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#F5F7FA",
      }}
      contentContainerStyle={{
        padding: 20,
      }}
    >

      <Text
        style={{
          fontSize: 24,
          fontWeight: "700",
          marginBottom: 20,
        }}
      >
        Edit Notice
      </Text>

      <Text
        style={{
          marginBottom: 6,
          fontWeight: "600",
        }}
      >
        Title
      </Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        style={{
          backgroundColor: "#fff",
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 10,
          padding: 12,
          marginBottom: 16,
        }}
      />

      <Text
        style={{
          marginBottom: 6,
          fontWeight: "600",
        }}
      >
        Message
      </Text>

      <TextInput
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={6}
        textAlignVertical="top"
        style={{
          backgroundColor: "#fff",
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 10,
          padding: 12,
          minHeight: 140,
          marginBottom: 16,
        }}
      />

      <Text
        style={{
          marginBottom: 6,
          fontWeight: "600",
        }}
      >
        Department
      </Text>

      <TextInput
        value={department}
        onChangeText={setDepartment}
        style={{
          backgroundColor: "#fff",
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 10,
          padding: 12,
          marginBottom: 20,
        }}
      />

      <TouchableOpacity
        onPress={updateNotice}
        disabled={saving}
        style={{
          backgroundColor: "#2563EB",
          padding: 16,
          borderRadius: 10,
        }}
      >

        {saving ? (

          <ActivityIndicator
            color="#fff"
          />

        ) : (

          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontWeight: "700",
              fontSize: 16,
            }}
          >
            Update Notice
          </Text>

        )}

      </TouchableOpacity>

    </ScrollView>
  );
}