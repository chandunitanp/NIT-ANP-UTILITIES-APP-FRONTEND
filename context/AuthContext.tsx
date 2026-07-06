  import * as SecureStore from "expo-secure-store";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import React, {
    createContext,
    useContext,
    useEffect,
    useState,
  } from "react";
  import { router } from "expo-router";
  import api from "../api/axios";

  type User = {
    id: number;
    name: string;
    email: string;
    role: string;
    teamType?: string;
    departmentName?: string;
    branchCode?: string;
    personalEmail?: string;
  };

  type AuthContextType = {
    user: User | null;
    loading: boolean;
    login: (
      email: string,
      password: string
    ) => Promise<void>;
    logout: () => Promise<void>;
  };

  const AuthContext =
    createContext<AuthContextType | null>(
      null
    );

  export function AuthProvider({
    children,
  }: {
    children: React.ReactNode;
  }) {

    const [user, setUser] =
      useState<User | null>(null);

    const [loading, setLoading] =
      useState(true);

    useEffect(() => {

      const restore = async () => {

        try {

          const storedUser =
            await AsyncStorage.getItem(
              "user"
            );

          const token =
            await SecureStore.getItemAsync(
              "token"
            );

          if (
            storedUser &&
            token
          ) {

            setUser(
              JSON.parse(storedUser)
            );
          }

        } catch (err) {

          console.log(
            "Restore error:",
            err
          );

        } finally {

          setLoading(false);
        }
      };

      restore();

    }, []);

    const login = async (
      email: string,
      password: string
    ) => {

      const response =
        await api.post(
          "/auth/login",
          {
            email:
              email
                .trim()
                .toLowerCase(),

            password:
              password.trim(),
          }
        );
      console.log("FULL LOGIN RESPONSE =", response.data);

      const data =
        response.data;


      const userData: User = {

        id: data.id,

        name: data.name,

        email: data.email,

        role: data.role,

        teamType:
          data.teamType,

        departmentName:
          data.departmentName,
          
        branchCode: data.branchCode,
        personalEmail:data.personalEmail,

      };
      console.log("branchCode from response =", data.branchCode);
      console.log("USER DATA =", userData);
      await SecureStore.setItemAsync(
        "token",
        data.token
      );

      await AsyncStorage.setItem(
        "user",
        JSON.stringify(userData)
      );

      setUser(userData);

      // ===========================
      // ROLE BASED NAVIGATION
      // ===========================

  if (data.role === "ADMIN") {

    router.replace(
      "/module-selection"
    );

  } else if (
    data.role === "FACULTY"
  ) {

    router.replace(
      "/(faculty-tabs)/home"
    );

  } else if (
    data.role === "STUDENT"
  ) {

    router.replace(
      "/(student-tabs)/home"
    );

  } else if (
    data.role === "TEAM_MEMBER"
  ) {

    router.replace(
      "/(team-member-tabs)/home"
    );
  }
  }

    const logout = async () => {

      await AsyncStorage.removeItem(
        "user"
      );

      await SecureStore.deleteItemAsync(
        "token"
      );

      setUser(null);

      router.replace(
        "/(auth)/login"
      );
    };

    return (

      <AuthContext.Provider
        value={{
          user,
          loading,
          login,
          logout,
        }}
      >

        {children}

      </AuthContext.Provider>
    );
  }

  export function useAuth() {

    const ctx =
      useContext(AuthContext);

    if (!ctx) {

      throw new Error(
        "useAuth must be used inside AuthProvider"
      );
    }

    return ctx;
  }
