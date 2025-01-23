import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import Constants from "expo-constants";
import { LabelSolid, PlusCircle, Xmark } from "iconoir-react-native";

import theme from "../../src/theme/theme";
import string from "../../src/string/string";
import StyledText from "../../src/styles/StyledText";
import StyledButton from "../../src/styles/StyledButton";
import StyledItemProductCart from "../../src/styles/styledItemProductCar";
import StyledItemProductStore from "../../src/styles/StyledItemProductStore";

const ShoppingCar = () => {
  const items = Array.from({ length: 11 }, (_, index) => `Item ${index + 1}`);

  const renderItemP = ({ item }) => (
    <StyledItemProductStore item={item}></StyledItemProductStore>
  );

  const renderItemC = ({ item }) => (
    <StyledItemProductCart></StyledItemProductCart>
  );

  return (
    <View style={styles.container}>
      <View style={styles.STATUSBAR_HEIGHT}>
        <Xmark width={30} height={30} color={"black"} />
      </View>

      <View style={styles.containerCar}>
        <StyledText title bold>
          Carrito{" "}
        </StyledText>

        <FlatList
          data={items}
          renderItem={renderItemC}
          keyExtractor={(item, index) => index.toString()}
          columnWrapperStyle={styles.columnWrapper} // Espaciado entre columnas
          width="100%"
        />
      </View>

      <View style={styles.products}>
        <StyledText title bold marginTop={15}>
          {string.client.addCar}
        </StyledText>

        <FlatList
          data={items}
          renderItem={renderItemP}
          keyExtractor={(item, index) => index.toString()}
          columnWrapperStyle={styles.columnWrapper} // Espaciado entre columnas
          width="95%"
          horizontal
        />
      </View>

      <View style={styles.total}>
        <View style={styles.info}>
          <StyledText bold>{string.client.summaey}</StyledText>
          <Text>{string.client.AddCode}</Text>
        </View>
        <View style={styles.info} borderTopWidth={0}>
          <LabelSolid width={20} height={20} color={"black"} />
          <StyledText>{string.client.codes}</StyledText>
          <TextInput placeholder="Aplicar" style={styles.imput}></TextInput>
        </View>
        <View style={styles.infoT}>
          <StyledText>{string.client.subtotal}</StyledText>
          <StyledText>$15.500</StyledText>
        </View>
        <View style={styles.infoT}>
          <StyledText>{string.client.delivery}</StyledText>
          <StyledText>$4.500</StyledText>
        </View>
        <View style={styles.infoT}>
          <StyledText bold>{string.client.total}</StyledText>
          <StyledText green bold>
            $20.000
          </StyledText>
        </View>

        <StyledText green bold title>
          {string.client.cash} 20.000
        </StyledText>
        <Text width={"80%"}>{string.client.message}</Text>

        <StyledButton
          title={string.client.pay}
          padding={10}
          red
          width={"80%"}
        ></StyledButton>
      </View>

      <TouchableOpacity style={styles.buttonAdd}>
        <PlusCircle width={20} height={20} color={"black"} />
        <StyledText bold>Agregar mas productos</StyledText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.STATUSBAR_HEIGHTHeight,
  },
  buttonAdd: {
    flexDirection: "row",
    backgroundColor: theme.colors.grey,
    width: "70%",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
    position: "absolute",
    top: "32%",
    start: "30%",
  },
  containerCar: {
    marginStart: "5%",
    width: "90%",
    height: "30%",
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey,
  },
  products: {
    height: "28%",
  },
  total: {
    height: "38%",
    alignItems: "center",
  },
  info: {
    width: "90%",
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderBlockColor: theme.colors.grey,
  },
  infoT: {
    width: "80%",
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imput: {
    width: 100,
    borderWidth: 1,
    borderBlockColor: theme.colors.grey,
    borderRadius: 10,
  },
});

export default ShoppingCar;
