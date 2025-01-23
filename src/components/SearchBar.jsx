import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import theme from "../theme/theme";

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <MaterialIcons
          name="search"
          size={24}
          color={theme.colors.black}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Buscar"
          placeholderTextColor={theme.colors.greyBlack}
        />
      </View>
      <TouchableOpacity style={styles.filterButton}>
        <MaterialIcons
          name="filter-list"
          size={24}
          color={theme.colors.white}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.greenOpacity,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: theme.colors.black,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  icon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: theme.colors.green,
    padding: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchBar;
