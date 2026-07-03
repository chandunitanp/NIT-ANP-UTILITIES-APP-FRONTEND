import React, {
  useCallback,
  useState,
} from "react";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import {
  useFocusEffect,
} from "@react-navigation/native";

import api from "../../api/axios";

export default function MyTicketsScreen() {

  const [tickets, setTickets] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  // ================= FETCH =================

  const fetchTickets = async () => {

    try {

      const response =
        await api.get("/tickets/my");

      setTickets(response.data || []);

    } catch (error) {

      console.log(
        "MY TICKETS ERROR = ",
        error
      );

    } finally {

      setLoading(false);
      setRefreshing(false);
    }
  };

  // ================= LOAD ON SCREEN OPEN =================

  useFocusEffect(
    useCallback(() => {

      fetchTickets();

    }, [])
  );

  // ================= REFRESH =================

  const onRefresh = () => {

    setRefreshing(true);

    fetchTickets();
  };

  // ================= STATUS COLORS =================

  const getStatusColor = (
    status: string
  ) => {

    switch (status) {

      case "OPEN":
        return "#ff9800";

      case "ASSIGNED":
        return "#1976d2";

      case "IN_PROGRESS":
        return "#7b1fa2";

      case "RESOLVED":
        return "#2e7d32";

      case "CLOSED":
        return "#424242";

      default:
        return "#607d8b";
    }
  };

  // ================= PRIORITY COLORS =================

  const getPriorityColor = (
    priority: string
  ) => {

    switch (priority) {

      case "HIGH":
        return "#d32f2f";

      case "MEDIUM":
        return "#f57c00";

      case "LOW":
        return "#388e3c";

      default:
        return "#607d8b";
    }
  };

  // ================= DATE =================

  const formatDate = (
    date: string
  ) => {

    if (!date) return "-";

    return new Date(date)
      .toLocaleString();
  };

  // ================= LOADING =================

  if (loading) {

    return (

      <View style={styles.center}>

        <ActivityIndicator
          size="large"
          color="#1565c0"
        />

        <Text style={styles.loading}>
          Loading Tickets...
        </Text>

      </View>
    );
  }

  return (

    <View style={styles.container}>

      <Text style={styles.heading}>
        My Tickets
      </Text>

      <Text style={styles.subHeading}>
        Track all your service requests
      </Text>

      <FlatList
        data={tickets}
        keyExtractor={(item) =>
          item.id.toString()
        }

        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }

        ListEmptyComponent={

          <View style={styles.emptyBox}>

            <Text style={styles.emptyTitle}>
              No Tickets Found
            </Text>

            <Text style={styles.emptySub}>
              Create a ticket from
              Home → Services
            </Text>

          </View>
        }

        renderItem={({ item }) => (

          <View style={styles.card}>

            {/* Ticket Number */}

            <View style={styles.row}>

              <Text style={styles.ticketNo}>
                Ticket #{item.id}
              </Text>

              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor:
                      getStatusColor(
                        item.status
                      ),
                  },
                ]}
              >

                <Text
                  style={
                    styles.badgeText
                  }
                >
                  {item.status}
                </Text>

              </View>

            </View>

            {/* Category */}

            <Text style={styles.category}>
              {item.category}
            </Text>

            {/* Description */}

            <Text style={styles.description}>
              {item.issueDescription}
            </Text>

            {/* Priority */}

            <View
              style={[
                styles.priorityBadge,
                {
                  backgroundColor:
                    getPriorityColor(
                      item.priority
                    ),
                },
              ]}
            >

              <Text
                style={
                  styles.badgeText
                }
              >
                {item.priority}
              </Text>

            </View>

            {/* Details */}

            <View style={styles.infoBox}>

              <Text style={styles.info}>
                Location :
                {" "}
                {item.location}
              </Text>

              <Text style={styles.info}>
                Room :
                {" "}
                {item.roomNo}
              </Text>

              <Text style={styles.info}>
                Created :
                {" "}
                {formatDate(
                  item.createdAt
                )}
              </Text>

              <Text style={styles.info}>
                Assigned To :
                {" "}
                {item.assignedTo
                  ?.name ||
                  "Not Assigned"}
              </Text>

              {item.resolvedAt && (

                <Text
                  style={
                    styles.info
                  }
                >
                  Resolved :
                  {" "}
                  {formatDate(
                    item.resolvedAt
                  )}
                </Text>

              )}

            </View>

            {/* Remarks */}

            {item.resolutionRemarks && (

              <View
                style={
                  styles.remarksBox
                }
              >

                <Text
                  style={
                    styles.remarksTitle
                  }
                >
                  Resolution Remarks
                </Text>

                <Text
                  style={
                    styles.remarksText
                  }
                >
                  {
                    item.resolutionRemarks
                  }
                </Text>

              </View>
            )}

          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f4f7fb",
    padding: 16,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loading: {
    marginTop: 10,
    fontSize: 16,
  },

  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0d47a1",
  },

  subHeading: {
    color: "#607d8b",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    elevation: 4,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  ticketNo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1565c0",
  },

  category: {
    marginTop: 10,
    fontSize: 19,
    fontWeight: "700",
    color: "#0d47a1",
  },

  description: {
    marginTop: 10,
    color: "#555",
    lineHeight: 22,
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  priorityBadge: {
    alignSelf: "flex-start",
    marginTop: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  badgeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },

  infoBox: {
    marginTop: 15,
    backgroundColor: "#eef5ff",
    borderRadius: 12,
    padding: 12,
  },

  info: {
    marginBottom: 6,
    color: "#37474f",
    fontWeight: "600",
  },

  remarksBox: {
    marginTop: 14,
    backgroundColor: "#f1f8e9",
    padding: 12,
    borderRadius: 12,
  },

  remarksTitle: {
    fontWeight: "bold",
    color: "#33691e",
    marginBottom: 5,
  },

  remarksText: {
    color: "#4e342e",
  },

  emptyBox: {
    marginTop: 100,
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#607d8b",
  },

  emptySub: {
    marginTop: 10,
    color: "#90a4ae",
    textAlign: "center",
  },

});