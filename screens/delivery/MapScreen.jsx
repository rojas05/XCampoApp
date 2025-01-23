import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { HOME_STYLES, ICON_COLORS_MAP } from "../../src/utils/constants";
import {
  openGoogleMaps,
  getLocationPermission,
} from "../../src/utils/LocationPermission";
import { stores } from "./js/GetOrderStoge";
import strings from "../../src/string/string";
import theme from "../../src/theme/theme";
import OrderInfo from "./OrderInfoComponent";
import StyledButtonIcon from "../../src/styles/StyledButtonIcon";
import FloatingButton from "../../src/components/FloatingButton";
import FloatingBar from "../../src/components/FloatingBar";
import AlertGoOrder from "../../src/components/Alerts/AlertGoOrder";
import MapComponent from "../../src/components/Map/MapComponent";

const MAP_TYPES = ["standard", "hybrid", "terrain"];

const FloatingActionButtons = ({ onMapTypeChange, onOpenGoogleMaps }) => (
  <View style={styles.floatingButtons}>
    <StyledButtonIcon
      start
      title={strings.FloatingActionButtons.changeMap}
      iconLibrary={FontAwesome5}
      nameIcon="layer-group"
      onPress={onMapTypeChange}
    />
    <StyledButtonIcon
      start
      title={strings.FloatingActionButtons.openGoogleMaps}
      iconLibrary={FontAwesome5}
      nameIcon="map-marked-alt"
      onPress={onOpenGoogleMaps}
    />
  </View>
);

const renderLoading = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={theme.colors.blue} />
    <Text>{strings.LoadingIndicator.loading}</Text>
    <Text>{strings.LoadingIndicator.locationPermission}</Text>
  </View>
);

const MapScreen = ({ navigation }) => {
  const [mapTypeIndex, setMapTypeIndex] = useState(0);
  const [colorMaker, setColorMaker] = useState(ICON_COLORS_MAP.standard);
  const [origin, setOrigin] = useState(null);
  const [destination] = useState({
    latitude: 1.8597457358731515,
    longitude: -76.04371218824772,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStore, setSelectedStore] = useState(null);
  const [showAlertContain, setShowAlertContain] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    getLocationPermission(setOrigin, setIsLoading);
    setColorMaker(ICON_COLORS_MAP.standard);
  }, []);

  const showInfoContain = useCallback((storeId) => {
    const store = stores.find((s) => s.id === storeId);
    setSelectedStore(store);
    setShowAlertContain(true);
  }, []);

  const handleMarkerPress = useCallback((storeId) => {
    const store = stores.find((s) => s.id === storeId);
    setSelectedStore(store);
    setShowAlert(true);
  }, []);

  const changeMapType = () => {
    setMapTypeIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % MAP_TYPES.length;
      setColorMaker(ICON_COLORS_MAP[MAP_TYPES[newIndex]]);
      return newIndex;
    });
  };

  if (isLoading || origin === null) {
    return renderLoading();
  }

  return (
    <View style={HOME_STYLES.container}>
      <MapComponent
        mapRef={mapRef}
        mapType={MAP_TYPES[mapTypeIndex]}
        data={stores}
        colorMaker={colorMaker}
        origin={origin}
        destination={destination}
        onPress={handleMarkerPress}
      />
      <FloatingActionButtons
        onMapTypeChange={changeMapType}
        onOpenGoogleMaps={() => openGoogleMaps(origin, destination)}
        navigation={navigation}
      />
      <FloatingBar
        profileImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv_oL1l60gN7zHc_fMS11OeFR-mLDi3DgjNg&s"
        userName="Armando Paredez"
      />

      <FloatingButton
        btnTop
        iconLibrary={FontAwesome5}
        nameIcon="bars"
        onPress={() => navigation.openDrawer()}
      />
      <FloatingButton
        btnButton
        size={30}
        iconLibrary={MaterialCommunityIcons}
        nameIcon="face-agent"
        onPress={() => showInfoContain(stores[0].id)}
      />

      {showAlertContain && (
        <View style={styles.orderInfoContainer}>
          <OrderInfo
            stops={selectedStore.paradas}
            setShowAlert={setShowAlert}
          />
        </View>
      )}

      {showAlert && (
        <View style={theme.overlay}>
          <AlertGoOrder orders={selectedStore} isVisible={setShowAlert} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  floatingButtons: {
    position: "absolute",
    bottom: 80,
    left: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  orderInfoContainer: {
    position: "absolute",
    bottom: 83,
    left: 10,
    right: 10,
  },
});

export default MapScreen;
