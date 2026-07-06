import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as Linking from "expo-linking";
import { useAuth } from "../../context/AuthContext";

export default function MenuScreen() {
  const { user } = useAuth();

  const branchCode = user?.branchCode;
  const registrationNumber = user?.personalEmail?.trim();

  console.log("USER =", user);
  console.log("branchCode =", branchCode);
  console.log("registrationNumber =", registrationNumber);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>

      {/* ================= UG ================= */}
      {branchCode === "UG" && (
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            Linking.openURL(
              registrationNumber === "925001"
                ? "http://172.180.6.211:8080/files/Academic%20Calender%202026-27%20for%20B.Tech%20Ist%20Year%20Students.pdf"
                : "http://172.180.6.211:8080/files/Academic%20Calender%202026-27%20for%20B.Tech%20IInd%20to%20IVth%20Year%20Students.pdf"
            )
          }
        >
          <Text style={styles.text}>
            {registrationNumber === "925001"
              ? "Academic Calendar - UG 1st Year"
              : "Academic Calendar - UG 2nd to 4th Year"}
          </Text>
        </TouchableOpacity>
      )}

      {/* ================= PG ================= */}
     {/* ================= PG ================= */}
{branchCode === "PG" && (
  <TouchableOpacity
    style={styles.card}
    onPress={() =>
      Linking.openURL(
        "http://172.180.6.211:8080/files/Academic%20Calender%202026-27%20for%20all%20M.Tech%20Students%20(1).pdf"
      )
    }
  >
    <Text style={styles.text}>
      Academic Calendar - PG
    </Text>
  </TouchableOpacity>
)}

{/* ================= PHD ================= */}
{branchCode === "PHD" && (
  <TouchableOpacity
    style={styles.card}
    onPress={() =>
      Linking.openURL(
        "http://172.180.6.211:8080/files/Academic%20Calender%202026-27%20for%20all%20PhD%20Scholars.pdf"
      )
    }
  >
    <Text style={styles.text}>
      Academic Calendar - PhD
    </Text>
  </TouchableOpacity>
)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
  },
});
