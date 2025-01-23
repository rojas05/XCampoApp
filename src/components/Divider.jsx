import React from "react";
import { View, StyleSheet } from "react-native";

const Divider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "100%",
    marginVertical: 5,
  },
});

export default Divider;
