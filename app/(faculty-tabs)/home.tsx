import { useFocusEffect } from "expo-router";
import React, { useCallback,useState ,useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";

import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";
export default function FacultyHome() {
  const router = useRouter();
  const { user } = useAuth();
  const [notificationCount, setNotificationCount] = useState(0);
  const [ticketCount, setTicketCount] = useState(0);
 useFocusEffect(
  useCallback(() => {
    fetchNotificationCount();
    fetchTicketCount();
  }, [])
);


const fetchNotificationCount = async () => {
  try {
    const res = await api.get("/notifications/count");
    setNotificationCount(res.data.count || res.data);
  } catch (error) {
    console.log("Notification count fetch failed", error);
  }
};

const fetchTicketCount = async () => {
  try {
    const res = await api.get("/tickets/count");
    setTicketCount(res.data.count || res.data);
  } catch (error) {
    console.log("Ticket count fetch failed", error);
  }
};
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.heading}>
        NIT Andhra Pradesh
      </Text>

      <Text style={styles.subHeading}>
        Faculty Service Portal
      </Text>

      <View style={styles.userCard}>
        <Text style={styles.userText}>
          Name: {user?.name}
        </Text>

        <Text style={styles.userText}>
          Email: {user?.email}
        </Text>

        <Text style={styles.userText}>
          Role: {user?.role}
        </Text>
      </View>

      <View style={styles.noticeCard}>
  <Text style={styles.noticeTitle}>
    Department Notifications
  </Text>

  <Text style={styles.noticeCount}>
    {notificationCount}
  </Text>
</View>

<View style={styles.ticketCountCard}>
  <Text style={styles.ticketCountTitle}>
    My Tickets
  </Text>

  <Text style={styles.ticketCountNumber}>
    {ticketCount}
  </Text>
</View>

      <Text style={styles.sectionTitle}>
        Services
      </Text>

      <TouchableOpacity
        style={styles.serviceCard}
        onPress={() =>
          router.push({
            pathname:
              "/(faculty-tabs)/create-ticket",
            params: {
              type: "NETWORK",
            },
          })
        }
      >
        <Text style={styles.cardText}>
          Network Request
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.serviceCard}
        onPress={() =>
          router.push({
            pathname:
              "/(faculty-tabs)/create-ticket",
            params: {
              type: "TELESERVICES",
            },
          })
        }
      >
        <Text style={styles.cardText}>
          Teleservices Request
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.serviceCard}
        onPress={() =>
          router.push({
            pathname:
              "/(faculty-tabs)/create-ticket",
            params: {
              type: "WEB",
            },
          })
        }
      >
        <Text style={styles.cardText}>
          WEB Request
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f4f7fb",
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#0d47a1",
  },

  subHeading: {
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },

  userCard: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 15,
    marginBottom: 20,
  },

  userText: {
    fontSize: 16,
    marginBottom: 5,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  serviceCard: {
    backgroundColor: "#1976d2",
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
  },

  ticketCard: {
    backgroundColor: "#7b1fa2",
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
  },

  galleryCard: {
    backgroundColor: "#00897b",
    padding: 18,
    borderRadius: 15,
  },

  cardText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },

    noticeCard: {
  backgroundColor: "#ff9800",
  padding: 20,
  borderRadius: 20,
  marginBottom: 24,
  elevation: 4,
},

noticeTitle: {
  fontSize: 18,
  color: "#fff",
  fontWeight: "700",
},

noticeCount: {
  fontSize: 40,
  color: "#fff",
  fontWeight: "bold",
  marginTop: 10,
},
ticketCountCard: {
  backgroundColor: "#7b1fa2",
  padding: 20,
  borderRadius: 20,
  marginBottom: 24,
  elevation: 4,
},

ticketCountTitle: {
  fontSize: 18,
  color: "#fff",
  fontWeight: "700",
},

ticketCountNumber: {
  fontSize: 40,
  color: "#fff",
  fontWeight: "bold",
  marginTop: 10,
},
});