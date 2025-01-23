import React from "react";
import { StyleSheet, View, Image, ImageBackground } from "react-native";
import StyledText from "../src/styles/StyledText.jsx";
import StyledButton from "../src/styles/StyledButton.jsx";
import string from "../src/string/string.js";
import { useNavigation } from "@react-navigation/native";

const Hello = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/background.png")}
        style={styles.image}
      >
        <View style={styles.containerComponent}>
          <Image
            source={require("../assets/XCampo.png")}
            style={{ width: 200, height: 100, borderRadius: 20, marginTop: 10 }}
          ></Image>

          <View style={styles.textContainer}>
            <StyledText>{string.welcome.registerNewUserA}</StyledText>

            <StyledText style={styles.textSmall}>
              {string.welcome.registerNewUserB}
            </StyledText>

            <StyledText style={styles.text}>
              {string.welcome.message}
            </StyledText>

            <StyledText style={styles.text}>{string.welcome.tyc}</StyledText>
          </View>

          <StyledButton
            style={{ borderTopLeftRadius: 25, width: 250 }}
            title={string.welcome.registrate}
            onPress={() => navigation.navigate("Signup")}
          ></StyledButton>

          <StyledButton
            yellow
            style={{ borderBottomRightRadius: 25, width: 250 }}
            title={string.Signup.registerNewUserA}
            onPress={() => navigation.navigate("Login")}
          ></StyledButton>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  containerComponent: {
    flex: 1,
    backgroundColor: "#ffffffa0",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flex: 0,
    width: 300,
    margin: 40,
  },
  textSmall: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 25,
  },
  text: {
    marginTop: 10,
    fontSize: 18,
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default Hello;
