import React, {
  useEffect,
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

import api from "../../api/axios";

export default function FacultyTicketsScreen() {

  const [tickets, setTickets] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  // =====================================
  // FETCH MY TICKETS
  // =====================================

  const fetchTickets = async () => {

    try {

      const response =
        await api.get(
          "/faculty/tickets"
        );

      setTickets(
        response.data || []
      );

    } catch (error) {

      console.log(
        "FETCH FACULTY TICKETS ERROR = ",
        error
      );

    } finally {

      setLoading(false);

      setRefreshing(false);
    }
  };

  // =====================================
  // INITIAL LOAD
  // =====================================

  useEffect(() => {

    fetchTickets();

  }, []);

  // =====================================
  // REFRESH
  // =====================================

  const onRefresh = () => {

    setRefreshing(true);

    fetchTickets();
  };

  // =====================================
  // LOADING
  // =====================================

  if (loading) {

    return (

      <View style={styles.center}>

        <ActivityIndicator
          size="large"
          color="#1976d2"
        />

        <Text style={styles.loadingText}>
          Loading Tickets...
        </Text>

      </View>
    );
  }

  // =====================================
  // UI
  // =====================================

  return (

    <View style={styles.container}>

      <Text style={styles.heading}>
        My Tickets
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

          <Text style={styles.emptyText}>
            No tickets found
          </Text>
        }

        renderItem={({ item }) => (

          <View style={styles.card}>

            <Text style={styles.title}>
              {item.category}
            </Text>

            <Text style={styles.description}>
              {item.issueDescription}
            </Text>

            <Text style={styles.info}>
              Status:
              {" "}
              {item.status}
            </Text>

            <Text style={styles.info}>
              Priority:
              {" "}
              {item.priority}
            </Text>

            <Text style={styles.info}>
              Location:
              {" "}
              {item.location}
            </Text>

            <Text style={styles.info}>
              Room:
              {" "}
              {item.roomNo}
            </Text>

            {item.teamType && (

              <Text style={styles.info}>
                Assigned Team:
                {" "}
                {item.teamType}
              </Text>

            )}

            {item.assignedTo?.name && (

              <Text style={styles.info}>
                Assigned To:
                {" "}
                {item.assignedTo.name}
              </Text>

            )}

            {item.createdAt && (

              <Text style={styles.info}>
                Created:
                {" "}
                {new Date(
                  item.createdAt
                ).toLocaleString()}
              </Text>

            )}

            {item.updatedAt && (

              <Text style={styles.info}>
                Updated:
                {" "}
                {new Date(
                  item.updatedAt
                ).toLocaleString()}
              </Text>

            )}

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
    padding: 20,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0d47a1",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    marginBottom: 18,
    elevation: 4,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0d47a1",
    marginBottom: 10,
  },

  description: {
    fontSize: 15,
    color: "#444",
    marginBottom: 12,
    lineHeight: 22,
  },

  info: {
    fontSize: 14,
    color: "#333",
    marginBottom: 6,
    fontWeight: "600",
  },

  remarksBox: {
    marginTop: 15,
    backgroundColor: "#e8f5e9",
    padding: 12,
    borderRadius: 10,
  },

  remarksTitle: {
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 5,
  },

  remarksText: {
    color: "#2e7d32",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 80,
    fontSize: 16,
    color: "gray",
  },

});