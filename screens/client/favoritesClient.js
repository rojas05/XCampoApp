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
          {" "}
          {string.client.favoriteStore}{" "}
        </StyledText>
      </View>

<<<<<<< HEAD
    return(

        <View style={styles.container}>
            <View style={styles.header}>
                <StyledText bold title> {string.client.favoriteStore} </StyledText>   
            </View>

            <View style={styles.containerScroll}>
                
            </View>

        </View>

    )

}
=======
      <View style={styles.containerScroll}>
        <ScrollView style={styles.scroll}>
          <StyledItemProduct store></StyledItemProduct>
        </ScrollView>
      </View>
    </View>
  );
};
>>>>>>> eb56ae6fa782673cb05f5b18082abb982f32ae4f

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  scroll: {
    with: 300,
    padding: "auto",
    marginTop: 20,
  },
  containerScroll: {
    with: 1,
    alignItems: "center",
  },
});

export default FavoriteClient;
