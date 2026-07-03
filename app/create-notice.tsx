import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { router } from "expo-router";

import * as DocumentPicker from "expo-document-picker";

import api from "../api/axios";

import { useAuth } from "../context/AuthContext";

export default function CreateNoticeScreen() {

  const { user } = useAuth();

  const [title, setTitle] = useState("");

  const [message, setMessage] = useState("");

  const [department, setDepartment] =
    useState("");

  const [file, setFile] =
    useState<DocumentPicker.DocumentPickerAsset | null>(
      null
    );

  const [loading, setLoading] =
    useState(false);

  // ============================================
  // PICK FILE
  // ============================================

  const pickFile = async () => {

    const result =
      await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
      });

    if (!result.canceled) {

      setFile(
        result.assets[0]
      );
    }
  };

  // ============================================
  // SUBMIT
  // ============================================

  const submit = async () => {

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

    if (
      user?.role === "ADMIN" &&
      !department
    ) {

      Alert.alert(
        "Validation",
        "Department is required"
      );

      return;
    }

    try {

      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "title",
        title
      );

      formData.append(
        "message",
        message
      );

      if (
        user?.role === "ADMIN"
      ) {

        formData.append(
          "department",
          department
        );
      }

      if (file) {

        formData.append(
          "file",
          {
            uri: file.uri,
            name: file.name,
            type:
              file.mimeType ||
              "application/octet-stream",
          } as any
        );
      }

      await api.post(
        "/notifications/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      Alert.alert(
        "Success",
        "Notice created successfully"
      );

router.replace("/(faculty-tabs)/home");
    } catch (error: any) {

      console.log(error);

      Alert.alert(
        "Error",
        error?.response?.data ||
          "Failed to create notice"
      );

    } finally {

      setLoading(false);
    }
  };

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
        Create Notice
      </Text>

      {/* TITLE */}

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
        placeholder="Enter title"
        style={{
          backgroundColor: "#fff",
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 10,
          padding: 12,
          marginBottom: 16,
        }}
      />

      {/* MESSAGE */}

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
        placeholder="Enter notice message"
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

      {/* ADMIN ONLY */}

      {user?.role === "ADMIN" && (

        <>
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
            placeholder="CSE / ECE / EEE / CIVIL"
            style={{
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 10,
              padding: 12,
              marginBottom: 16,
            }}
          />
        </>
      )}

      {/* FILE */}

      <TouchableOpacity
        onPress={pickFile}
        style={{
          backgroundColor: "#fff",
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 10,
          padding: 14,
          marginBottom: 20,
        }}
      >
        <Text>
          {file
            ? file.name
            : "Attach File (Optional)"}
        </Text>
      </TouchableOpacity>

      {/* SUBMIT */}

      <TouchableOpacity
        onPress={submit}
        disabled={loading}
        style={{
          backgroundColor: "#2563EB",
          padding: 16,
          borderRadius: 10,
        }}
      >

        {loading ? (

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
            Publish Notice
          </Text>

        )}

      </TouchableOpacity>

    </ScrollView>

  );
}