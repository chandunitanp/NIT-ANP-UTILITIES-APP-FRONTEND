import axios from "axios";

import * as SecureStore from "expo-secure-store";

// =========================================================
// AXIOS INSTANCE
// =========================================================

const api = axios.create({

  // 🔥 YOUR SPRING BOOT BACKEND

  baseURL: "http://172.180.6.211:8080",

  timeout: 30000,

  headers: {
    "Content-Type": "application/json",
  },
});

// =========================================================
// REQUEST INTERCEPTOR
// =========================================================

api.interceptors.request.use(

  async (config) => {

    try {

      // ===================================================
      // PUBLIC AUTH APIs
      // NO JWT REQUIRED
      // ===================================================

      if (

        config.url?.startsWith("/auth/login") ||

        config.url?.startsWith("/auth/register") ||

        config.url?.startsWith("/auth/forgot-password") ||

        config.url?.startsWith("/auth/reset-password")

      ) {

        if (__DEV__) {

          console.log(
            "🔓 PUBLIC API:",
            config.url
          );
        }

        return config;
      }

      // ===================================================
      // GET JWT TOKEN
      // ===================================================

      const token =
        await SecureStore.getItemAsync(
          "token"
        );

      // ===================================================
      // ADD AUTH HEADER
      // ===================================================

      if (token) {

        config.headers.Authorization =
          `Bearer ${token}`;

        if (__DEV__) {

          console.log(
            "🔐 JWT TOKEN ADDED"
          );
        }
      }

      return config;

    } catch (error) {

      console.log(
        "❌ INTERCEPTOR ERROR:",
        error
      );

      return config;
    }
  },

  (error) => {

    return Promise.reject(error);
  }
);

// =========================================================
// RESPONSE INTERCEPTOR
// =========================================================

api.interceptors.response.use(

  (response) => {

    if (__DEV__) {

      console.log(
        "✅ API SUCCESS:",
        response.config.url
      );

      console.log(
        "✅ STATUS:",
        response.status
      );
    }

    return response;
  },

  async (error) => {

    // =====================================================
    // DEBUG LOGS
    // =====================================================

    console.log(
      "❌ API ERROR URL:",
      error?.config?.url
    );

    console.log(
      "❌ API ERROR STATUS:",
      error?.response?.status
    );

    console.log(
      "❌ API ERROR DATA:",
      error?.response?.data
    );

    console.log(
      "❌ API ERROR MESSAGE:",
      error?.message
    );

    // =====================================================
    // JWT EXPIRED / INVALID
    // =====================================================

    if (
      error?.response?.status === 401
    ) {

      console.log(
        "🚫 UNAUTHORIZED - TOKEN REMOVED"
      );

      await SecureStore.deleteItemAsync(
        "token"
      );
    }

    return Promise.reject(error);
  }
);

export default api;