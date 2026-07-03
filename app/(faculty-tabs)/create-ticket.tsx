import React, {
  useState,
  useEffect,
} from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

import { Picker } from "@react-native-picker/picker";

import { useLocalSearchParams } from "expo-router";

import { useFocusEffect } from "@react-navigation/native";

import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

export default function CreateTicket() {

  const { type } = useLocalSearchParams();

  const { user } = useAuth();

  const [name, setName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [location, setLocation] =
    useState("ADMIN_BLOCK");

  const [roomNo, setRoomNo] =
    useState("");

  const [category, setCategory] =
    useState("NEW_LAN_CONNECTION");

  const [
    issueDescription,
    setIssueDescription,
  ] = useState("");


  useEffect(() => {

    if (user?.name) {

      setName(user.name);
    }

  }, [user]);

  // ==========================
  // NETWORK
  // ==========================

  const networkCategories = [

    {
      label: "New LAN Connection",
      value: "NEW_LAN_CONNECTION",
    },

    {
      label:
        "LAN Connection/Data Port",
      value:
        "LAN_CONNECT_DATA_PORT",
    },

    {
      label: "Printer Issue",
      value: "PRINTER_ISSUE",
    },

    {
      label: "System Complaint",
      value: "SYSTEM_COMPLAINT",
    },

    {
      label:
        "OS & Application Installation",
      value:
        "OS_APP_INSTALLATIONS",
    },

    {
      label:
        "Office 365 Installation",
      value:
        "OFFICE_365_INSTALL",
    },

    {
      label:
        "Meetings & Conferences",
      value:
        "MEETINGS_CONFERENCES",
    },

    {
      label:
        "Projector Complaint",
      value:
        "PROJECTOR_COMPLAINT",
    },

    {
      label:
        "Laptop Complaint",
      value:
        "LAPTOP_COMPLAINT",
    },

    {
      label:
        "CC Camera Concerns",
      value:
        "CC_CAM_CONCERNS",
    },

    {
      label:
        "Interactive Display",
      value:
        "INTERACTIVEDISPLAY_ISSUE",
    },

    {
      label:
        "Wifi Issues",
      value:
        "WIFI_ISSUES",
    },

    {
      label: "Other",
      value: "OTHER",
    },
  ];

  // ==========================
  // TELESERVICES
  // ==========================

  const teleserviceCategories = [

    {
      label:
        "New IP Connection",
      value:
        "NEW_IP_CONNECTION",
    },

    {
      label:
        "IP Phone Not Working",
      value:
        "IP_PHONE_NOT_WORKING",
    },

    {
      label:
        "Incoming / Outgoing Problem",
      value:
        "INCOMING_OUTGOING",
    },

    {
      label:
        "Receiver Mic/Speaker Problem",
      value:
        "RECEIVER_MIC_SPEAKER",
    },

    {
      label: "Other",
      value: "OTHER",
    },
  ];

  // ==========================
  // WEB
  // ==========================

  const electricalCategories = [

    {
      label:
        "WEB REQUEST",
      value:
        "WEB_REQUEST",
    },
  ];

  const categories =
    type === "TELESERVICES"
      ? teleserviceCategories
      : type === "WEB"
      ? electricalCategories
      : networkCategories;

  // ==========================
  // LOCATIONS
  // ==========================

  const locations = [

    {
      label: "Admin Block",
      value: "ADMIN_BLOCK",
    },

    {
      label: "Academic Block",
      value: "ACADEMIC_BLOCK",
    },

    {
      label: "Central Library",
      value: "CENTRAL_LIBRARY",
    },

    {
      label: "Computer Centre",
      value: "COMPUTER_CENTRE",
    },

    {
      label: "Data Centre",
      value: "DATA_CENTRE",
    },

    {
      label:
        "Faculty Quarters",
      value:
        "FACULTY_QUARTERS",
    },

    {
      label: "Guest House",
      value: "GUEST_HOUSE",
    },

    {
      label:
        "Health Centre",
      value:
        "HEALTH_CENTRE",
    },

    {
      label:
        "Innovation Centre",
      value:
        "INNOVATION_CENTRE",
    },

    {
      label:
        "Placement Cell",
      value:
        "PLACEMENT_CELL",
    },

    {
      label: "Sports",
      value: "SPORTS",
    },
  ];

  // ==========================
  // RESET
  // ==========================

  const resetForm = () => {

    setContactNo("");
    setRoomNo("");
    setIssueDescription("");

    setLocation(
      "ADMIN_BLOCK"
    );

    if (
      type ===
      "TELESERVICES"
    ) {

      setCategory(
        "NEW_IP_CONNECTION"
      );

    } else if (
      type ===
      "WEB"
    ) {

      setCategory(
        "WEB_REQUEST"
      );

    } else {

      setCategory(
        "NEW_LAN_CONNECTION"
      );
    }
  };

  useFocusEffect(
    React.useCallback(() => {

      resetForm();

    }, [type])
  );

  // ==========================
  // SUBMIT
  // ==========================

  const submitTicket =
    async () => {

      if (
        !contactNo.trim() ||
        !roomNo.trim() ||
        !issueDescription.trim()
      ) {

        Alert.alert(
          "Validation",
          "Please fill all fields"
        );

        return;
      }

      if (
        contactNo.length < 10
      ) {

        Alert.alert(
          "Validation",
          "Enter valid contact number"
        );

        return;
      }

      try {

        const payload = {

          name,
          contactNo,
          location,
          roomNo,
          category,
          issueDescription,
        };

        await api.post(
          "/tickets",
          payload
        );

        Alert.alert(
          "Success",
          "Ticket Created Successfully"
        );

        resetForm();

      } catch (error) {

        console.log(error);

        Alert.alert(
          "Error",
          "Failed to create ticket"
        );
      }
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

      <Text style={styles.heading}>

        {type ===
        "TELESERVICES"
          ? "Teleservices Request"
          : type ===
            "WEB"
          ? "WEB Request"
          : "Network Request"}

      </Text>

      <TextInput
        value={name}
        editable={false}
        style={[
          styles.input,
          styles.disabledInput,
        ]}
      />

      <TextInput
        placeholder="Contact Number"
        value={contactNo}
        onChangeText={
          setContactNo
        }
        keyboardType="phone-pad"
        style={styles.input}
      />

      <View
        style={
          styles.pickerContainer
        }
      >
        <Picker
          selectedValue={
            location
          }
          onValueChange={
            setLocation
          }
        >
          {locations.map(
            (item) => (
              <Picker.Item
                key={item.value}
                label={
                  item.label
                }
                value={
                  item.value
                }
              />
            )
          )}
        </Picker>
      </View>

      <TextInput
        placeholder="Room Number"
        value={roomNo}
        onChangeText={
          setRoomNo
        }
        style={styles.input}
      />

      <View
        style={
          styles.pickerContainer
        }
      >
        <Picker
          selectedValue={
            category
          }
          enabled={
            type !==
            "WEB"
          }
          onValueChange={
            setCategory
          }
        >
          {categories.map(
            (item) => (
              <Picker.Item
                key={item.value}
                label={
                  item.label
                }
                value={
                  item.value
                }
              />
            )
          )}
        </Picker>
      </View>


      <TextInput
        placeholder="Describe your issue..."
        multiline
        numberOfLines={5}
        value={
          issueDescription
        }
        onChangeText={
          setIssueDescription
        }
        style={[
          styles.input,
          styles.textArea,
        ]}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={
          submitTicket
        }
      >
        <Text
          style={
            styles.buttonText
          }
        >
          Submit Ticket
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles =
  StyleSheet.create({

    container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor:
        "#f4f7fb",
    },

    heading: {
      fontSize: 28,
      fontWeight: "bold",
      textAlign: "center",
      color: "#0d47a1",
      marginBottom: 25,
    },

    input: {
      backgroundColor:
        "#fff",
      borderRadius: 12,
      padding: 15,
      marginBottom: 15,
      fontSize: 16,
      elevation: 2,
    },

    disabledInput: {
      backgroundColor:
        "#e0e0e0",
    },

    pickerContainer: {
      backgroundColor:
        "#fff",
      borderRadius: 12,
      marginBottom: 15,
      overflow: "hidden",
      elevation: 2,
    },

    textArea: {
      height: 120,
      textAlignVertical:
        "top",
    },

    button: {
      backgroundColor:
        "#1565c0",
      padding: 18,
      borderRadius: 12,
      marginTop: 10,
    },

    buttonText: {
      color: "#fff",
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 18,
    },
});