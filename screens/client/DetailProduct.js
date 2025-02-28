import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import StyledText from "../../src/styles/StyledText";
import StyledButton from "../../src/styles/StyledButton";
import theme from "../../src/theme/theme";
import string from "../../src/string/string";
import PagerView from "react-native-pager-view";
import { Xmark } from "iconoir-react-native";

const DetailProduct = () => {
  // const img = {
  //   images: [
  //     require("../../assets/background.png"),
  //     require("../../assets/XCampo.png"),
  //   ],
  // };

  return (
    <View style={styles.container}>
      <PagerView style={styles.pager}>
        <View style={styles.ImageContainer}>
          <Image
            style={styles.image}
            source={require("../../assets/background.png")}
          />
          <View style={styles.imageIndexContainer}>
            <View style={styles.imageIndexA}></View>
            <View style={styles.imageIndexB}></View>
          </View>
        </View>

        <View style={styles.ImageContainer}>
          <Image
            style={styles.image}
            source={require("../../assets/XCampo.png")}
          />
          <View style={styles.imageIndexContainer}>
            <View style={styles.imageIndexB}></View>
            <View style={styles.imageIndexA}></View>
          </View>
        </View>
      </PagerView>

      <View style={styles.containerInfo}>
        <StyledText title bold>
          Platano verde
        </StyledText>

        <StyledText title bold paddingBottom={10}>
          unidad por $1000
        </StyledText>

        <StyledText paddingBottom={10}>
          Quedan 20 unidades disponibles
        </StyledText>

        <StyledText>
          platano organico de buena calidad, parejo, producido por campecinos
        </StyledText>
      </View>

      <View style={styles.containerProduct}>
        <StyledButton title={string.client.add} padding={10}></StyledButton>
      </View>

      <TouchableOpacity style={styles.exit}>
        <Xmark width={40} height={40} color={"white"} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  ImageContainer: {
    height: 290,
    position: "relative",
  },
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    marginTop: Constants.STATUSBAR_HEIGHTHeight,
  },
  containerInfo: {
    backgroundColor: theme.colors.greenLiht,
    borderRadius: 10,
    justifyContent: "center",
    margin: "2%",
    padding: 10,
  },
  containerProduct: {
    backgroundColor: theme.colors.greenLiht,
    borderBottomEndRadius: 80,
    borderTopEndRadius: 80,
    borderTopStartRadius: 80,
    bottom: 2,
    flexDirection: "column-reverse",
    height: "30%",
    margin: "2%",
    padding: 40,
  },
  exit: {
    alignItems: "center",
    backgroundColor: theme.colors.green,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    left: 5,
    padding: 5,
    position: "absolute",
    top: 10,
  },
  image: {
    borderRadius: 10,
    height: "100%",
    margin: "2%",
    resizeMode: "cover",
    width: "96%",
  },
  imageIndexA: {
    backgroundColor: theme.colors.green,
    borderRadius: 5,
    height: 10,
    width: 10,
  },
  imageIndexB: {
    backgroundColor: theme.colors.greenMedium,
    borderRadius: 5,
    height: 10,
    width: 10,
  },
  imageIndexContainer: {
    alignItems: "center",
    backgroundColor: theme.colors.opacity,
    borderRadius: 20,
    bottom: 10,
    flexDirection: "row",
    height: 20,
    justifyContent: "space-around",
    position: "absolute",
    right: "45%",
    width: 40,
  },
  pager: {
    height: 300,
    width: "100%",
  },
});

export default DetailProduct;
