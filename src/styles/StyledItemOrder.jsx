import { DeliveryTruck, DoubleCheck, HomeAlt } from "iconoir-react-native";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import StyledText from "./StyledText";
import theme from "../theme/theme";

const StyledItemOrder = () => {
  return (
    <View style={styles.item}>
      <View style={styles.circle}></View>

      <StyledText bold title>
        N.O 12345
      </StyledText>

      <Text>Fecha</Text>

      <StyledText bold title>
        15/03/2020
      </StyledText>

      <StyledText>Estado</StyledText>

      <View style={styles.containerState}>
        <View style={styles.stateItem}>
          <HomeAlt width={30} height={30} color={"black"} />
          <View style={styles.color}></View>
        </View>

        <View style={styles.stateItem}>
          <DeliveryTruck width={30} height={30} color={"black"} />
          <View style={styles.colorN}></View>
        </View>

        <View style={styles.stateItem}>
          <DoubleCheck width={30} height={30} color={"black"} />
          <View style={styles.colorN}></View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    backgroundColor: theme.colors.red,
    borderRadius: 8,
    borderWidth: 1,
    height: 15,
    position: "absolute",
    right: 2,
    top: 2,
    width: 15,
  },
  color: {
    backgroundColor: theme.colors.green,
    borderTopColor: theme.colors.greyMedium,
    borderTopWidth: 1,
    height: 8,
    width: 38,
  },
  colorN: {
    backgroundColor: theme.colors.greenOpacity,
    borderTopColor: theme.colors.grey,
    borderTopWidth: 1,
    height: 8,
    width: 38,
  },
  containerState: {
    flexDirection: "row",
  },
  item: {
    alignItems: "center",
    borderColor: theme.colors.greyMedium,
    borderRadius: 10,
    borderWidth: 1,
    height: 180,
    margin: 5,
    padding: 15,
    width: 150,
  },
  stateItem: {
    alignItems: "center",
    borderColor: theme.colors.greyMedium,
    borderWidth: 1,
    height: 40,
    width: 40,
  },
});

export default StyledItemOrder;
