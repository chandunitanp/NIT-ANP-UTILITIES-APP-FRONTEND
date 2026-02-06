import { View, TextInput, Button, Alert, Text, Platform } from "react-native";
import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import api from "../api/axios";
import { useAuth } from "../(auth)/AuthContext";
import { DepartmentEnumMap } from "../utils/department";

export default function Create() {
  const { user } = useAuth();

  if (!user || user.role === "STUDENT") {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ color: "red", fontSize: 18 }}>
          You do not have permission to create notifications.
        </Text>
      </View>
    );
  }

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const pickFile = async () => {
    const res = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
    });

    if (!res.canceled && res.assets?.length) {
      setFile(res.assets[0]);
    }
  };

  const submit = async () => {
    if (!title || !message) {
      Alert.alert("Error", "Title and message are required");
      return;
    }

    try {
      setLoading(true);

      const dept =
        DepartmentEnumMap[user.departmentName ?? ""] ??
        user.departmentName;

      const form = new FormData();
      form.append("title", title);
      form.append("message", message);
      form.append("department", dept);

      if (file) {
        form.append("file", {
          uri: file.uri,
          name: file.name || "upload.jpg",
          type: file.mimeType || "application/octet-stream",
        } as any);
      }

      console.log("UPLOAD URL:", api.defaults.baseURL + "/notifications/upload");

      await api.post("/notifications/upload", form, {
        timeout: 30000,
      });

      Alert.alert("Success", "Notification uploaded");
      setTitle("");
      setMessage("");
      setFile(null);

    } catch (e: any) {
      console.log("UPLOAD ERROR:", e.message);
      Alert.alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <TextInput
        placeholder="Message"
        value={message}
        onChangeText={setMessage}
        multiline
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <Button title="Choose File (Optional)" onPress={pickFile} />

      {file && <Text>Selected: {file.name}</Text>}

      <Button
        title={loading ? "Posting..." : "Post Notification"}
        onPress={submit}
      />
    </View>
  );
}
