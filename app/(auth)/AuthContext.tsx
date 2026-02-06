import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  departmentName?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Restore login on app reload
  useEffect(() => {
    const restore = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      const token = await SecureStore.getItemAsync("token");

      if (storedUser && token) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };
    restore();
  }, []);

  // 🔐 LOGIN (API CALL HERE — NOT IN SCREEN)
  const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });

  const { token, role, ...rest } = res.data;

  const normalizedRole = role.startsWith("ROLE_")
    ? role.replace("ROLE_", "")
    : role;

  const user = {
    ...rest,
    role: normalizedRole,
  };

  await AsyncStorage.setItem("user", JSON.stringify(user));
  await SecureStore.setItemAsync("token", token);

  setUser(user);
};

  // 🚪 LOGOUT
  const logout = async () => {
    await AsyncStorage.removeItem("user");
    await SecureStore.deleteItemAsync("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
