import React from "react";
import Constants from "expo-constants";
import { Xmark } from "iconoir-react-native";
import { View, StyleSheet, FlatList } from "react-native";

import StyledText from "../../src/styles/StyledText";
import StyledItemOrder from "../../src/styles/StyledItemOrder";
import theme from "../../src/theme/theme";

const Orders = () => {
  const items = Array.from({ length: 11 }, (_, index) => `Item ${index + 1}`);

  const renderItemP = ({ item }) => <StyledItemOrder></StyledItemOrder>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Xmark width={40} height={40} color={"black"} />
        <StyledText title bold>
          Ordenes
        </StyledText>
      </View>

      <View style={styles.containerOrdenes}>
        <StyledText bold red marginBottom={"15"}>
          {" "}
          Ordenes Pendientes
        </StyledText>

        <FlatList
          data={items}
          renderItem={renderItemP}
          keyExtractor={(item, index) => index.toString()}
          numColumns={1} // Especifica el número de columnas
          width="94%"
          marginStart="3%"
          horizontal
        />
      </View>

      <View style={styles.containerOrdenesReady}>
        <StyledText bold green marginBottom={"20"}>
          {" "}
          Ordenes Terminadas
        </StyledText>

        <FlatList
          data={items}
          renderItem={renderItemP}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2} // Especifica el número de columnas
          width="94%"
          marginStart="3%"
          columnWrapperStyle={styles.columnWrapper}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: "space-around",
    marginBottom: 10,
  },
  container: {
    alignItems: "center",
    marginTop: Constants.STATUSBAR_HEIGHTHeight,
  },
  containerOrdenes: {
    borderBottomWidth: 1,
    borderColor: theme.colors.greyMedium,
    height: "30%",
    marginEnd: 10,
    width: "95%",
  },
  containerOrdenesReady: {
    borderBottomWidth: 1,
    borderColor: theme.colors.greyMedium,
    height: "70%",
    marginEnd: 10,
    width: "95%",
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
});

export default Orders;
