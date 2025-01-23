import React from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons"; // Asegúrate de tener MaterialIcons instalado

const handleSupportPress = () => {
  Alert.alert("Soporte", "¿Cómo podemos ayudarte?");
};

const Header = ({ title, onBackPress }) => {
  return (
    <View style={styles.headerContainer}>
      {/* Botón de atrás */}
      <TouchableOpacity onPress={onBackPress}>
        <MaterialIcons name="arrow-back" size={30} color="#000" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      {/* Botón de soporte */}
      <TouchableOpacity onPress={handleSupportPress}>
        <MaterialIcons name="support-agent" size={30} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 5,
    marginVertical: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    flex: 1,
    textAlign: "center",
  },
});

export default Header;
