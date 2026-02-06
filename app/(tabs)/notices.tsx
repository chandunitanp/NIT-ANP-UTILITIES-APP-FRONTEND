import {
  View,
  Text,
  FlatList,
  Button,
  Alert,
  RefreshControl,
} from "react-native";
import { useEffect, useState } from "react";
import * as Linking from "expo-linking";

import api from "../api/axios";
import { useAuth } from "../(auth)/AuthContext";

export default function Notices() {
  const { user } = useAuth();

  const [data, setData] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // 🔄 Load notices
  const load = async () => {
    try {
      const res = await api.get("/notifications");
      setData(res.data.reverse());
    } catch (error) {
      Alert.alert("Error", "Unable to load notices");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  // 🗑️ Delete notice (ADMIN only)
  const deleteNotice = async (id: number) => {
    try {
      await api.delete(`/notifications/${id}`);
      Alert.alert("Deleted", "Notice removed successfully");
      load();
    } catch {
      Alert.alert("Error", "Only admin can delete notices");
    }
  };

  // 📂 VIEW / DOWNLOAD FILE (SAFE – opens backend 8080)
  const downloadFile = (filename: string) => {
    const url = `${api.defaults.baseURL}/files/${filename}`;
    console.log("DOWNLOAD URL:", url); // MUST be 8080
    Linking.openURL(url);
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListEmptyComponent={
        <Text style={{ textAlign: "center", marginTop: 40 }}>
          No notices available
        </Text>
      }
      renderItem={({ item }) => (
        <View style={{ padding: 12, borderBottomWidth: 1 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {item.title}
          </Text>

          <Text>{item.message}</Text>
          <Text>Dept: {item.department}</Text>

          {item.filePath && (
            <Button
              title="View / Download"
              onPress={() => downloadFile(item.filePath)}
            />
          )}

          {user?.role === "ADMIN" && (
            <Button
              title="Delete"
              color="red"
              onPress={() => deleteNotice(item.id)}
            />
          )}
        </View>
      )}
    />
  );
}
