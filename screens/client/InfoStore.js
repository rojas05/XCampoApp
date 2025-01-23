import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Constants from "expo-constants";

import StyledText from "../../src/styles/StyledText";
import { FastArrowLeft, Home, Map, MapPin } from "iconoir-react-native";

import theme from "../../src/theme/theme";
import MapView, { Marker } from "react-native-maps";
import { useNavigation, useRoute } from "@react-navigation/native";
import { fetchWithToken } from "../../tokenStorage";
import { getCoordinates } from "../../funcions/getCoordinates";

const InfoStore = () => {
  const route = useRoute();
  const { idStore } = route.params;
  const navigation = useNavigation();

  const [store, setStore] = useState({});
  const [initialRegion, setInitialRegion] = useState(null);
  const mapRef = useRef(null);

  let mapRegion;
  let response;

  useEffect(() => {
    getStore();
    if (initialRegion && mapRef.current) {
      mapRef.current.animateToRegion(mapRegion, 100000); // Duración en ms
    }
  }, [getStore, initialRegion, mapRegion]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getStore() {
    try {
      response = await fetchWithToken(
        "http://192.168.0.121:8080/XCampo/api/v1/seller/" + idStore,
        {
          method: "GET",
        },
      );

      if (response.ok) {
        const data = await response.json();
        setInitialRegion(await getCoordinates(data.coordinates));
        setStore(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <TouchableOpacity
          onPress={() => {
            navigation.replace("DetailStore", {
              idStore: store.id_seller,
            });
          }}
        >
          <FastArrowLeft width={30} height={30} color={"black"} />
        </TouchableOpacity>
        <StyledText title bold>
          Tienda: {store.name_store}
        </StyledText>
      </View>

      <MapView
        style={styles.mapa}
        initialRegion={initialRegion}
        loadingEnabled={true}
        showsUserLocation={true}
      >
        {initialRegion && (
          <Marker
            coordinate={{
              latitude: initialRegion.latitude,
              longitude: initialRegion.longitude,
            }}
            title={store.name_store}
            description={"Vereda: " + store.location}
            pinColor={theme.colors.yellow}
          ></Marker>
        )}
      </MapView>

      <View style={styles.containerInfo}>
        <View style={styles.cell}>
          <MapPin width={40} height={40} color={"black"} />
          <StyledText lines={2} width={"60%"}>
            Ubicacion {store.coordinates}
          </StyledText>
        </View>

        <View style={styles.cell}>
          <Map width={40} height={40} color={"black"} />
          <StyledText>{"Vereda " + store.location}</StyledText>
        </View>

        <View style={styles.indications}>
          <StyledText title bold>
            Como llergar
          </StyledText>
          <Home width={40} height={40} color={"black"} />
        </View>

        <StyledText margin={20}>{store.location_description}</StyledText>
      </View>
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
    height: "40%",
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
  containerInfo: {
    width: "100%",
    height: "50%",
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    paddingTop: 30,
    backgroundColor: theme.colors.white,
    position: "absolute",
    top: "50%",
    alignItems: "center",
  },
});

export default InfoStore;
