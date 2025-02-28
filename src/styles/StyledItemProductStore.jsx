import React from "react";
import { View, StyleSheet, Image } from "react-native";
import theme from "../theme/theme";
import StyledText from "./StyledText";
import StyledButton from "./StyledButton";

const StyledItemProductStore = (props) => {
  const { item } = props;

  return (
    <View style={styles.gridItem}>
      <Image
        source={require("../../assets/background.png")}
        style={styles.imageItem}
      ></Image>
      <View style={styles.containerItemInfo}>
        <StyledText bold lines={1} width="60%">
          {item}xxxxx
        </StyledText>
        <StyledText bold lines={1} width="35%">
          x uni
        </StyledText>
      </View>
      <StyledText red bold lines={1}>
        price
      </StyledText>
      <StyledButton yellow title={"Agregar"} height="15%"></StyledButton>
    </View>
  );
};

// No se estan usando la mayoria de estilos
const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: "space-between", // Espaciado uniforme entre columnas
    marginBottom: 10, // Espaciado vertical entre filas
  },
  containerInfo: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    width: "100%",
  },
  containerItemInfo: {
    flexDirection: "row",
    width: "100%",
  },
  containerStar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    width: 60,
  },
  exit: {
    alignItems: "center",
    backgroundColor: theme.colors.opacity,
    borderRadius: 10,
    height: 30,
    justifyContent: "center",
    left: 10,
    position: "absolute",
    top: 10,
    width: 30,
  },
  gridItem: {
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    height: 200,
    margin: 5,
    width: 150,
  },
  imageItem: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: "40%",
    resizeMode: "cover",
    width: "100%",
  },
  imageStore: {
    height: "30%",
    resizeMode: "cover",
    width: "100%",
  },
  send: {
    alignItems: "center",
    backgroundColor: theme.colors.greenLiht,
    borderRadius: 10,
    height: 30,
    justifyContent: "center",
    width: 50,
  },
});

export default StyledItemProductStore;
