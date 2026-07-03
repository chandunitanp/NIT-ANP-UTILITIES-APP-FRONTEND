import { useFocusEffect } from "expo-router";
import React, { useCallback,useState ,useEffect } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  ScrollView,
  StatusBar,
} from "react-native";

import { useRouter } from "expo-router";

import api from "../../api/axios";

import {
  useAuth,
} from "../../context/AuthContext";

export default function Home() {

  const router = useRouter();

  const { user } = useAuth();

  const [showServices, setShowServices] =
    useState(false);
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
    console.log("Count fetch failed", error);
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


  // ================= NETWORK REQUESTS =================

  const openNetworkRequests = () => {

    router.push({
      pathname: "./create-ticket",
      params: {
        type: "NETWORK",
      },
    });
  };

  // ================= TELESERVICES REQUESTS =================

  const openTeleservicesRequests = () => {

    router.push({
      pathname: "./create-ticket",
      params: {
        type: "TELESERVICES",
      },
    });
  };

  // ================= ELECTRICAL REQUESTS =================

  const openElectricalRequests = () => {

    router.push({
      pathname: "./create-ticket",
      params: {
        type: "WEB",
      },
    });
  };

  // ================= MY TICKETS =================

  const openMyTickets = () => {

    router.navigate(
      "/(student-tabs)/my-tickets"
    );
  };

  // ================= GALLERY =================

  const openGallery = async () => {

    await Linking.openURL(
      "https://nitandhra.ac.in/main/gallery.php"
    );
  };

  return (

    <ScrollView
      contentContainerStyle={
        styles.container
      }
      showsVerticalScrollIndicator={
        false
      }
    >

      <StatusBar
        backgroundColor="#0d47a1"
        barStyle="light-content"
      />

      {/* ================= HEADER ================= */}

      <View style={styles.headerContainer}>

        <Text style={styles.welcomeText}>
          Welcome
        </Text>

        <Text style={styles.heading}>
          NIT Andhra Pradesh
        </Text>

        <Text style={styles.subHeading}>
          Student Service Portal
        </Text>

      </View>

      {/* ================= USER CARD ================= */}

      <View style={styles.userCard}>

        <Text style={styles.userName}>
          {user?.name || "Student"}
        </Text>

        <Text style={styles.userEmail}>
          {user?.email}
        </Text>

        <Text style={styles.userRole}>
          Role:
          {" "}
          {user?.role}
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

      {/* ================= SERVICES CARD ================= */}

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.card}
        onPress={() =>
          setShowServices(
            !showServices
          )
        }
      >

        <View style={styles.cardRow}>

          <Text style={styles.cardText}>
            Services
          </Text>

          <Text style={styles.arrowText}>
            {showServices
              ? "▲"
              : "▼"}
          </Text>

        </View>

      </TouchableOpacity>

      {/* ================= SERVICES DROPDOWN ================= */}

      {showServices && (

        <View
          style={
            styles.dropdownContainer
          }
        >

          {/* ================= NETWORK ================= */}

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.dropdownItem}
            onPress={
              openNetworkRequests
            }
          >

            <Text
              style={
                styles.dropdownTitle
              }
            >
              Network Requests
            </Text>

            <Text
              style={
                styles.dropdownSubtitle
              }
            >
              LAN, WiFi, Printer,
              System & Software Issues
            </Text>

          </TouchableOpacity>

          {/* ================= TELESERVICES ================= */}

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.dropdownItem}
            onPress={
              openTeleservicesRequests
            }
          >

            <Text
              style={
                styles.dropdownTitle
              }
            >
              Teleservices Requests
            </Text>

            <Text
              style={
                styles.dropdownSubtitle
              }
            >
              IP Phone & Communication
              Related Issues
            </Text>

          </TouchableOpacity>

          {/* ================= ELECTRICAL ================= */}

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.dropdownItem}
            onPress={
              openElectricalRequests
            }
          >

            <Text
              style={
                styles.dropdownTitle
              }
            >
              WEB Request
            </Text>

            <Text
              style={
                styles.dropdownSubtitle
              }
            >
              web Complaints
            </Text>

          </TouchableOpacity>

        </View>
      )}

      {/* ================= MY TICKETS ================= */}



      {/* ================= FOOTER ================= */}

      <View style={styles.footerContainer}>

        <Text style={styles.footerText}>
          National Institute of Technology
        </Text>

        <Text style={styles.footerText}>
          Andhra Pradesh
        </Text>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    padding: 22,
    backgroundColor: "#f4f7fb",
    justifyContent: "center",
  },

  headerContainer: {
    alignItems: "center",
    marginBottom: 25,
  },

  welcomeText: {
    fontSize: 20,
    color: "#546e7a",
    marginBottom: 8,
    fontWeight: "600",
  },

  heading: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#0d47a1",
    textAlign: "center",
  },

  subHeading: {
    fontSize: 16,
    color: "#607d8b",
    marginTop: 10,
    textAlign: "center",
  },

  userCard: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 20,
    marginBottom: 24,
    elevation: 4,
  },

  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0d47a1",
    marginBottom: 8,
  },

  userEmail: {
    fontSize: 15,
    color: "#546e7a",
    marginBottom: 6,
  },

  userRole: {
    fontSize: 14,
    color: "#78909c",
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#1565c0",
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 22,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },

  arrowText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  dropdownContainer: {
    marginTop: 18,
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 14,
    elevation: 5,
  },

  dropdownItem: {
    backgroundColor: "#eef5ff",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#d6e6ff",
  },

  dropdownTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#0d47a1",
    marginBottom: 6,
  },

  dropdownSubtitle: {
    fontSize: 14,
    color: "#546e7a",
    lineHeight: 20,
  },

  ticketCard: {
    backgroundColor: "#6a1b9a",
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 22,
    elevation: 6,
    marginTop: 24,
  },

  ticketTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },

  ticketSubtitle: {
    color: "#f3e5f5",
    fontSize: 15,
    lineHeight: 22,
  },

  galleryCard: {
    backgroundColor: "#00897b",
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 22,
    elevation: 6,
    marginTop: 24,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  galleryTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },

  gallerySubtitle: {
    color: "#e0f2f1",
    fontSize: 15,
    lineHeight: 22,
  },

  footerContainer: {
    marginTop: 40,
    alignItems: "center",
  },

  footerText: {
    fontSize: 14,
    color: "#78909c",
    fontWeight: "600",
    textAlign: "center",
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
  backgroundColor: "#6a1b9a",
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