import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";

import api from "../../api/axios";

interface Ticket {
  id: number;

  name: string;
  email: string;
  contactNo: string;

  location: string;
  roomNo: string;

  category: string;
  issueDescription: string;

  priority: string;
  status: string;

  resolutionRemarks?: string;

  createdAt: string;
  assignedAt?: string;
  resolvedAt?: string;
}

export default function TicketsScreen() {

  const [tickets, setTickets] =
    useState<Ticket[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [remarks, setRemarks] =
    useState<{ [key: number]: string }>({});

  // ================= FETCH TICKETS =================

  const fetchTickets = async () => {

    try {

      const response =
        await api.get("/team/tickets");

      setTickets(response.data);

    } catch (error) {

      console.log(
        "FETCH TEAM TICKETS ERROR",
        error
      );

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchTickets();

  }, []);

  // ================= REFRESH =================

  const onRefresh = async () => {

    setRefreshing(true);

    await fetchTickets();

    setRefreshing(false);
  };

  // ================= STATUS UPDATE =================

  const updateStatus = async (
    ticketId: number,
    status: string
  ) => {

    try {

      await api.put(
        `/team/tickets/${ticketId}/status`,
        null,
        {
          params: {
            status,
            remarks:
              remarks[ticketId] || "",
          },
        }
      );

      Alert.alert(
        "Success",
        `Ticket updated to ${status}`
      );

      fetchTickets();

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Error",
        "Unable to update ticket"
      );
    }
  };

  // ================= STATUS COLOR =================

  const getStatusColor = (
    status: string
  ) => {

    switch (status) {

      case "OPEN":
        return "#ef6c00";

      case "ASSIGNED":
        return "#1976d2";

      case "IN_PROGRESS":
        return "#8e24aa";

      case "RESOLVED":
        return "#2e7d32";

      case "CLOSED":
        return "#424242";

      default:
        return "#607d8b";
    }
  };

  // ================= LOADER =================

  if (loading) {

    return (

      <View style={styles.loader}>

        <ActivityIndicator
          size="large"
          color="#1565c0"
        />

        <Text>
          Loading Assigned Tickets...
        </Text>

      </View>
    );
  }

  // ================= CARD =================

  const renderTicket = ({
    item,
  }: {
    item: Ticket;
  }) => (

    <View style={styles.card}>

      {/* HEADER */}

      <View style={styles.topRow}>

        <Text style={styles.ticketId}>
          Ticket #{item.id}
        </Text>

        <View
          style={[
            styles.badge,
            {
              backgroundColor:
                getStatusColor(
                  item.status
                ),
            },
          ]}
        >
          <Text style={styles.badgeText}>
            {item.status}
          </Text>
        </View>

      </View>

      {/* USER DETAILS */}

      <Text style={styles.name}>
        {item.name}
      </Text>

      <Text style={styles.info}>
        Email: {item.email}
      </Text>

      <Text style={styles.info}>
        Contact: {item.contactNo}
      </Text>

      {/* ISSUE */}

      <View style={styles.section}>

        <Text style={styles.label}>
          Category
        </Text>

        <Text style={styles.value}>
          {item.category}
        </Text>

      </View>

      <View style={styles.section}>

        <Text style={styles.label}>
          Description
        </Text>

        <Text style={styles.value}>
          {item.issueDescription}
        </Text>

      </View>

      {/* LOCATION */}

      <View style={styles.section}>

        <Text style={styles.label}>
          Location
        </Text>

        <Text style={styles.value}>
          {item.location}
        </Text>

        <Text style={styles.value}>
          Room No: {item.roomNo}
        </Text>

      </View>

      {/* PRIORITY */}

      <View style={styles.priorityBox}>

        <Text style={styles.priorityText}>
          Priority: {item.priority}
        </Text>

      </View>

      {/* DATES */}

      <Text style={styles.date}>
        Created:
        {" "}
        {item.createdAt?.replace(
          "T",
          " "
        )}
      </Text>

      {/* REMARKS */}

      <TextInput
        placeholder="Enter remarks..."
        style={styles.input}
        multiline
        value={
          remarks[item.id] || ""
        }
        onChangeText={(text) =>
          setRemarks({
            ...remarks,
            [item.id]: text,
          })
        }
      />

      {/* BUTTONS */}

      <View style={styles.buttonRow}>

        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                "#8e24aa",
            },
          ]}
          onPress={() =>
            updateStatus(
              item.id,
              "IN_PROGRESS"
            )
          }
        >
          <Text style={styles.btnText}>
            Start
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                "#2e7d32",
            },
          ]}
          onPress={() =>
            updateStatus(
              item.id,
              "RESOLVED"
            )
          }
        >
          <Text style={styles.btnText}>
            Resolve
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                "#424242",
            },
          ]}
          onPress={() =>
            updateStatus(
              item.id,
              "CLOSED"
            )
          }
        >
          <Text style={styles.btnText}>
            Close
          </Text>
        </TouchableOpacity>

      </View>

      {/* REMARKS DISPLAY */}

      {item.resolutionRemarks && (

        <View
          style={styles.remarksBox}
        >

          <Text
            style={styles.remarksTitle}
          >
            Remarks
          </Text>

          <Text>
            {
              item.resolutionRemarks
            }
          </Text>

        </View>
      )}

    </View>
  );

  return (

    <View style={styles.container}>

      <Text style={styles.heading}>
        Assigned Tickets
      </Text>

      <FlatList
        data={tickets}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={renderTicket}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        ListEmptyComponent={
          <Text style={styles.empty}>
            No tickets assigned
          </Text>
        }
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f4f7fb",
    padding: 15,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0d47a1",
    marginBottom: 15,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 15,
    elevation: 4,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  ticketId: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0d47a1",
  },

  badge: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },

  badgeText: {
    color: "#fff",
    fontWeight: "bold",
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  info: {
    color: "#546e7a",
    marginBottom: 3,
  },

  section: {
    marginTop: 12,
  },

  label: {
    fontWeight: "bold",
    color: "#0d47a1",
  },

  value: {
    marginTop: 4,
    color: "#37474f",
  },

  priorityBox: {
    marginTop: 12,
    backgroundColor: "#eef5ff",
    padding: 10,
    borderRadius: 10,
  },

  priorityText: {
    fontWeight: "bold",
  },

  date: {
    marginTop: 10,
    color: "#607d8b",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginTop: 12,
    minHeight: 70,
    textAlignVertical: "top",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  button: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },

  remarksBox: {
    marginTop: 15,
    backgroundColor: "#f1f8e9",
    padding: 12,
    borderRadius: 10,
  },

  remarksTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },

  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#777",
  },

});