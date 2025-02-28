import React from "react";
import { View, StyleSheet, Pressable, FlatList } from "react-native";
import Constants from "expo-constants";
import {
  DeliveryTruck,
  DoubleCheck,
  HomeAlt,
  SendDiagonal,
  Xmark,
} from "iconoir-react-native";
import StyledText from "../../src/styles/StyledText";
import theme from "../../src/theme/theme";
import StyledItemProductCart from "../../src/styles/styledItemProductCar";

const DetailOrder = () => {
  const items = Array.from({ length: 11 }, (_, index) => `Item ${index + 1}`);

  const renderItemC = ({ item }) => (
    <StyledItemProductCart></StyledItemProductCart>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable>
          <Xmark width={30} height={30} color={"black"} />
        </Pressable>
        <StyledText title bold>
          N.O 1234567890
        </StyledText>
        <Pressable>
          <SendDiagonal width={30} height={30} color={"black"} />
        </Pressable>
      </View>

      <StyledText title bold>
        Estado de la orden
      </StyledText>

      <View style={styles.containerState}>
        <View style={styles.stateItem}>
          <HomeAlt width={40} height={40} color={"black"} />
          <View style={styles.color}></View>
        </View>

        <View style={styles.stateItem}>
          <DeliveryTruck width={40} height={40} color={"black"} />
          <View style={styles.colorN}></View>
        </View>

        <View style={styles.stateItem}>
          <DoubleCheck width={40} height={40} color={"black"} />
          <View style={styles.colorN}></View>
        </View>
      </View>

      <View style={styles.containerCar}>
        <StyledText title bold>
          Productos
        </StyledText>

        <FlatList
          data={items}
          renderItem={renderItemC}
          keyExtractor={(item, index) => index.toString()}
          columnWrapperStyle={styles.columnWrapper} // Espaciado entre columnas
          width="100%"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  //  No se usan
  // eslint-disable-next-line react-native/no-unused-styles
  ScrollView: {
    marginTop: 20,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  buttonAdd: {
    alignItems: "center",
    backgroundColor: theme.colors.grey,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    marginStart: "10%",
    padding: 2,
    width: "70%",
  },
  // eslint-disable-next-line react-native/no-unused-styles
  buttonPlus: {
    alignItems: "center",
    backgroundColor: theme.colors.grey,
    borderRadius: 5,
    marginStart: "35%",
    padding: 2,
    width: "30%",
  },
  color: {
    backgroundColor: theme.colors.green,
    borderTopColor: theme.colors.greyMedium,
    borderTopWidth: 1,
    height: 8,
    width: "100%",
  },
  colorN: {
    backgroundColor: theme.colors.greenOpacity,
    borderTopColor: theme.colors.greyMedium,
    borderTopWidth: 1,
    height: 8,
    width: "100%",
  },
  container: {
    flex: 1,
    marginTop: Constants.STATUSBAR_HEIGHTHeight,
  },
  containerState: {
    flexDirection: "row",
    marginBottom: 15,
    marginStart: "15%",
    width: "70%",
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
    width: "100%",
  },
  stateItem: {
    alignItems: "center",
    borderColor: theme.colors.greyMedium,
    borderWidth: 1,
    height: 50,
    width: "33%",
  },
});

export default DetailOrder;
