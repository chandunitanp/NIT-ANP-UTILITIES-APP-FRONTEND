import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

const BASE_URL = "http://172.180.3.151:8080";

export default function EditProfile() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [personalEmail, setPersonalEmail] = useState("");

  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [program, setProgram] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const getHeaders = async () => {
    const token = await SecureStore.getItemAsync("token");

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const loadProfile = async () => {
    try {
      const config = await getHeaders();

      const response = await axios.get(
        `${BASE_URL}/users/profile`,
        config
      );

      const user = response.data;

      setName(user.name ?? "");
      setGender(user.gender ?? "");
      setPhone(user.phone ?? "");
      setPersonalEmail(user.personalEmail ?? "");
      setEmail(user.email ?? "");
      setDepartment(user.departmentName ?? "");
      setProgram(user.branchCode ?? "");
    } catch (err: any) {
      console.log("LOAD PROFILE ERROR");
      console.log(err.response?.status);
      console.log(err.response?.data);
      console.log(err.message);

      Alert.alert(
        "Error",
        err.response?.data?.message ||
          err.response?.data ||
          err.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Name is required");
      return;
    }

    if (!phone.trim()) {
      Alert.alert("Error", "Phone number is required");
      return;
    }

    try {
      setSaving(true);

      const config = await getHeaders();

      await axios.put(
        `${BASE_URL}/users/profile`,
        {
          name,
          gender,
          phone,
          personalEmail,
        },
        config
      );

      Alert.alert(
        "Success",
        "Profile updated successfully",
        [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]
      );
    } catch (err: any) {
      console.log("UPDATE ERROR");
      console.log(err.response?.status);
      console.log(err.response?.data);
      console.log(err.message);

      Alert.alert(
        "Error",
        err.response?.data?.message ||
          err.response?.data ||
          err.message
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#1976D2" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Gender</Text>
      <TextInput
        style={styles.input}
        value={gender}
        onChangeText={setGender}
      />

      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>College ID</Text>
      <TextInput
        style={styles.input}
        value={personalEmail}
        onChangeText={setPersonalEmail}
      />

      <Text style={styles.label}>College Email</Text>
      <TextInput
        style={styles.readOnly}
        value={email}
        editable={false}
      />

      <Text style={styles.label}>Department</Text>
      <TextInput
        style={styles.readOnly}
        value={department}
        editable={false}
      />

      <Text style={styles.label}>Program</Text>
      <TextInput
        style={styles.readOnly}
        value={program}
        editable={false}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSave}
        disabled={saving}
      >
        {saving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            Save Changes
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F5F7FA",
    padding: 20,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0D47A1",
    marginBottom: 25,
  },

  label: {
    fontSize: 15,
    marginBottom: 6,
    color: "#444",
    fontWeight: "600",
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 18,
    fontSize: 16,
  },

  readOnly: {
    borderWidth: 1,
    borderColor: "#DDD",
    backgroundColor: "#EEEEEE",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 18,
    color: "#666",
    fontSize: 16,
  },

  button: {
    backgroundColor: "#1976D2",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "bold",
  },
});
