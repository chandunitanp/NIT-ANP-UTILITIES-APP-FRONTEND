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
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";

import { Picker } from "@react-native-picker/picker";

import api from "../../api/axios";

import { useAuth } from "../../context/AuthContext";

export default function TicketsScreen() {

  const { user } = useAuth();

  const [tickets, setTickets] =
    useState<any[]>([]);

  const [teamMembers, setTeamMembers] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [
    assignModalVisible,
    setAssignModalVisible,
  ] = useState(false);

  const [
    selectedMember,
    setSelectedMember,
  ] = useState("");

  const [
    selectedPriority,
    setSelectedPriority,
  ] = useState("MEDIUM");

  const [
    selectedTicket,
    setSelectedTicket,
  ] = useState<number | null>(null);

  // ================= FETCH TICKETS =================

  const fetchTickets = async () => {

    try {

      const response =
        await api.get("/admin/tickets");

      setTickets(response.data || []);

    } catch (error) {

      console.log(
        "FETCH TICKETS ERROR = ",
        error
      );

    } finally {

      setLoading(false);
    }
  };

  // ================= FETCH TEAM MEMBERS =================

  const fetchTeamMembers =
    async () => {

      try {

        const response =
          await api.get(
            "/admin/team-members"
          );

        setTeamMembers(
          response.data || []
        );

      } catch (error) {

        console.log(
          "FETCH MEMBERS ERROR = ",
          error
        );
      }
    };

  // ================= INITIAL LOAD =================

  useEffect(() => {

    fetchTickets();

    fetchTeamMembers();

  }, []);

  // ================= OPEN MODAL =================

  const openAssignModal = (
    ticketId: number,
    priority: string
  ) => {

    setSelectedTicket(ticketId);

    setSelectedPriority(
      priority || "MEDIUM"
    );

    setAssignModalVisible(true);
  };

  // ================= ASSIGN + PRIORITY =================

  const assignTicket = async () => {

    if (!selectedMember) {

      Alert.alert(
        "Validation",
        "Please select team member"
      );

      return;
    }

    try {

      await api.put(
        `/admin/tickets/${selectedTicket}/priority`,
        null,
        {
          params: {
            priority:
              selectedPriority,
          },
        }
      );

      await api.put(
        `/admin/tickets/${selectedTicket}/assign/${selectedMember}`
      );

      Alert.alert(
        "Success",
        "Priority updated and ticket assigned successfully"
      );

      setAssignModalVisible(false);

      setSelectedMember("");

      setSelectedPriority(
        "MEDIUM"
      );

      fetchTickets();

    } catch (error: any) {

      console.log(
        "ASSIGN ERROR = ",
        error
      );

      Alert.alert(
        "Error",
        error?.response?.data ||
          "Assignment failed"
      );
    }
  };

  // ================= PRIORITY COLOR =================

  const getPriorityColor = (
    priority: string
  ) => {

    switch (priority) {

      case "CRITICAL":
        return "#d32f2f";

      case "HIGH":
        return "#f57c00";

      case "MEDIUM":
        return "#1976d2";

      case "LOW":
        return "#2e7d32";

      default:
        return "#333";
    }
  };

  // ================= LOADING =================

  if (loading) {

    return (

      <View style={styles.center}>

        <ActivityIndicator
          size="large"
        />

        <Text style={styles.loadingText}>
          Loading Tickets...
        </Text>

      </View>
    );
  }

  return (

    <View style={styles.container}>

      <Text style={styles.heading}>
        {user?.teamType} Tickets
      </Text>

      <FlatList
        data={tickets}
        keyExtractor={(item) =>
          item.id.toString()
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No Tickets Found
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
              Status: {item.status}
            </Text>

            <Text
              style={[
                styles.info,
                {
                  color:
                    getPriorityColor(
                      item.priority
                    ),
                },
              ]}
            >
              Priority: {item.priority}
            </Text>

            <Text style={styles.info}>
              Location: {item.location}
            </Text>

            <Text style={styles.info}>
              Room No: {item.roomNo}
            </Text>

            <Text style={styles.info}>
              Raised By: {item.name}
            </Text>

            <Text style={styles.info}>
              Email: {item.email}
            </Text>

            {item.assignedTo ? (

              <Text
                style={
                  styles.assignedText
                }
              >
                Assigned To:{" "}
                {
                  item.assignedTo
                    ?.name
                }
              </Text>

            ) : (

              <>
                <Text
                  style={
                    styles.unassignedText
                  }
                >
                  Unassigned
                </Text>

                <TouchableOpacity
                  style={
                    styles.assignButton
                  }
                  onPress={() =>
                    openAssignModal(
                      item.id,
                      item.priority
                    )
                  }
                >

                  <Text
                    style={
                      styles.buttonText
                    }
                  >
                    Assign Ticket
                  </Text>

                </TouchableOpacity>

              </>

            )}

          </View>

        )}
      />

      {/* ================= MODAL ================= */}

      <Modal
        visible={assignModalVisible}
        transparent
        animationType="slide"
      >

        <View
          style={
            styles.modalContainer
          }
        >

          <View
            style={
              styles.modalContent
            }
          >

            <Text
              style={
                styles.modalTitle
              }
            >
              Assign Ticket
            </Text>

            <Text
              style={
                styles.label
              }
            >
              Priority
            </Text>

            <Picker
              selectedValue={
                selectedPriority
              }
              onValueChange={(value) =>
                setSelectedPriority(
                  value
                )
              }
            >

              <Picker.Item
                label="LOW"
                value="LOW"
              />

              <Picker.Item
                label="MEDIUM"
                value="MEDIUM"
              />

              <Picker.Item
                label="HIGH"
                value="HIGH"
              />

              <Picker.Item
                label="CRITICAL"
                value="CRITICAL"
              />

            </Picker>

            <Text
              style={
                styles.label
              }
            >
              Team Member
            </Text>

            <Picker
              selectedValue={
                selectedMember
              }
              onValueChange={(value) =>
                setSelectedMember(
                  value
                )
              }
            >

              <Picker.Item
                label="Select Team Member"
                value=""
              />

              {teamMembers.map(
                (member: any) => (

                  <Picker.Item
                    key={member.id}
                    label={
                      member.name
                    }
                    value={
                      member.id
                    }
                  />

                )
              )}

            </Picker>

            <TouchableOpacity
              style={
                styles.assignButton
              }
              onPress={
                assignTicket
              }
            >

              <Text
                style={
                  styles.buttonText
                }
              >
                Save & Assign
              </Text>

            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                setAssignModalVisible(
                  false
                )
              }
            >

              <Text
                style={
                  styles.cancelText
                }
              >
                Cancel
              </Text>

            </TouchableOpacity>

          </View>

        </View>

      </Modal>

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
    marginBottom: 20,
    color: "#0d47a1",
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
    marginBottom: 8,
  },

  description: {
    fontSize: 15,
    color: "#444",
    marginBottom: 10,
  },

  info: {
    marginBottom: 6,
    fontWeight: "600",
  },

  assignedText: {
    marginTop: 10,
    color: "#2e7d32",
    fontWeight: "bold",
  },

  unassignedText: {
    marginTop: 10,
    color: "#ef6c00",
    fontWeight: "bold",
  },

  assignButton: {
    backgroundColor: "#1976d2",
    padding: 14,
    borderRadius: 10,
    marginTop: 12,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 60,
    fontSize: 16,
    color: "gray",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor:
      "rgba(0,0,0,0.5)",
    padding: 20,
  },

  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },

  cancelText: {
    textAlign: "center",
    marginTop: 18,
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
  },

});