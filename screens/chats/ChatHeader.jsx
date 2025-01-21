import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { STATUSBAR } from "../../src/utils/constants.js";

const ChatHeader = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>

        <View style={styles.profileContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>G</Text>
          </View>
          <View>
            <Text style={styles.title}>Granja Campesina</Text>
            <Text style={styles.status}>Espera tu mensaje</Text>
            {/* <Text style={styles.status}>En línea</Text> */}
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.iconButton}>
        <MaterialIcons name="more-vert" size={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingTop: STATUSBAR + 10,
    backgroundColor: "#f4f5ed",
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  avatarText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333333",
  },
  status: {
    fontSize: 14,
    color: "#888888",
  },
});

export default ChatHeader;
