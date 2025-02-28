import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import StyledText from "../../src/styles/StyledText";
import string from "../../src/string/string";
import StyledItemProduct from "../../src/styles/StyledItemProduct";
import Constants from "expo-constants";

const FavoriteClient = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <StyledText bold title>
          {string.client.favoriteStore}
        </StyledText>
      </View>
      <View style={styles.containerScroll}>
        <ScrollView style={styles.scroll}>
          <StyledItemProduct store></StyledItemProduct>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.STATUSBAR_HEIGHTHeight,
  },
  containerScroll: {
    alignItems: "center",
    with: 1,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  scroll: {
    marginTop: 20,
    padding: "auto",
    with: 300,
  },
});

export default FavoriteClient;
