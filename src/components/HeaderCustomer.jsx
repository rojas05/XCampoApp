import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons"; // Asegúrate de tener MaterialIcons instalado
import theme from "../theme/theme";

const Header = ({ title, onBackPress }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      {/* Botón de atrás */}
      <TouchableOpacity onPress={onBackPress}>
        <MaterialIcons name="arrow-back" size={30} color="#000" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      {/* Botón de soporte */}
      <TouchableOpacity onPress={() => navigation.navigate("Support")}>
        <MaterialIcons name="support-agent" size={30} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  headerTitle: {
    color: theme.colors.black,
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Header;
