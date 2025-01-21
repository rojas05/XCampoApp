import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import Constants from "expo-constants";
import StyledText from "../../src/styles/StyledText";
import { FastArrowLeft, Home, Map, MapPin, Phone } from "iconoir-react-native";
import theme from "../../src/theme/theme";
import MapView from "react-native-maps";

const InfoStore = () => {
  return (
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <FastArrowLeft width={30} height={30} color={"black"} />
        <StyledText title bold>
          Name finca
        </StyledText>
      </View>

      <MapView style={styles.mapa} />

      <View style={styles.info}>
        <MapPin width={40} height={40} color={"black"} />
        <StyledText lines={2} width={"60%"}>
          12344556789,-01234567890
        </StyledText>
        <Pressable style={styles.button}>
          <Map width={25} height={25} color={"black"} />
        </Pressable>
      </View>

      <View style={styles.cell}>
        <Phone width={40} height={40} color={"black"} />
        <StyledText>1234567890</StyledText>
      </View>

      <View style={styles.indications}>
        <StyledText title bold>
          Como llegar
        </StyledText>
        <Home width={40} height={40} color={"black"} />
      </View>

      <StyledText margin={20}>indicaciones...</StyledText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: theme.colors.greenOpacity,
  },
  statusBar: {
    marginTop: Constants.statusBarHeight,
    flexDirection: "row",
    padding: 10,
    width: "100%",
  },
  mapa: {
    width: "100%",
    height: 300,
    marginBottom: 20,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  cell: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    width: "90%",
  },
  indications: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: theme.colors.grey,
    padding: 8,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 8,
  },
});

export default InfoStore;
