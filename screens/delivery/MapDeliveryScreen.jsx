import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { HOME_STYLES, ICON_COLORS_MAP } from "../../src/utils/constants";
import {
  openGoogleMaps,
  getLocationPermission,
} from "../../src/utils/LocationPermission";
import { stores } from "./js/GetOrderStoge";
import theme from "../../src/theme/theme";
import strings from "../../src/string/string";
import OrderInfo from "./OrderInfoComponent";
import StyledButton from "../../src/styles/StyledButton";
import StyledButtonIcon from "../../src/styles/StyledButtonIcon";
import FloatingButton from "../../src/components/FloatingButton";
import AlertGoOrder from "../../src/components/Alerts/AlertGoOrder";
import AlertInputCodeOrder from "../../src/components/Alerts/AlertInputCodeOrder";
import MapComponent from "../../src/components/Map/MapComponent";

const MAP_TYPES = ["standard", "hybrid", "terrain"];

const FloatingActionButtons = ({ onMapTypeChange, onOpenGoogleMaps }) => (
  <View style={styles.floatingButtons}>
    <StyledButtonIcon
      start
      title={strings.FloatingActionButtons.openGoogleMaps}
      iconLibrary={FontAwesome5}
      nameIcon="map-marked-alt"
      onPress={onOpenGoogleMaps}
    />
    <StyledButtonIcon
      start
      title={strings.FloatingActionButtons.changeMap}
      iconLibrary={FontAwesome5}
      nameIcon="layer-group"
      onPress={onMapTypeChange}
    />
  </View>
);

const LoadingIndicator = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={theme.colors.blue} />
    <Text>{strings.LoadingIndicator.loading}</Text>
    <Text>{strings.LoadingIndicator.loadingRoute}</Text>
  </View>
);

const MapDeliveryScreen = ({ navigation }) => {
  const [mapTypeIndex, setMapTypeIndex] = useState(0);
  const [colorMaker, setColorMaker] = useState(ICON_COLORS_MAP.standard);
  const [origin, setOrigin] = useState({ latitude: 0, longitude: 0 });
  const [destination] = useState({
    latitude: 1.8597457358731515,
    longitude: -76.04371218824772,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStore, setSelectedStore] = useState(null);
  const [showAlertContain, setShowAlertContain] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertCode, setShowAlertCode] = useState(false);
  const mapRef = useRef(null);
  const route = useRoute();

  useEffect(() => {
    getLocationPermission(setOrigin, setIsLoading);
    setColorMaker(ICON_COLORS_MAP.standard);
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (showAlertContain) {
        showInfoContain(stores[0].id);
      }
    }, [showAlertContain, showInfoContain]),
  );

  useEffect(() => {
    if (route.params?.activateAlert) {
      showInfoContain(stores[0].id);
    }
  }, [route.params?.activateAlert, showInfoContain]);

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

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={HOME_STYLES.container}>
      <MapComponent
        data={stores}
        showRute={true}
        mapRef={mapRef}
        colorMaker={colorMaker}
        mapType={MAP_TYPES[mapTypeIndex]}
        onPress={handleMarkerPress}
        destination={destination}
        origin={origin}
      />
      <FloatingActionButtons
        onMapTypeChange={changeMapType}
        onOpenGoogleMaps={() => openGoogleMaps(origin, destination)}
      />
      <FloatingButton
        btnButton
        size={30}
        iconLibrary={MaterialCommunityIcons}
        nameIcon="face-agent"
        onPress={() => showInfoContain(stores[0].id)}
      />

      <StyledButton
        green
        style={styles.bottomButton}
        title={strings.MapBtn.arriveAtFarm}
        onPress={() => setShowAlertCode(true)}
      />

      <AlertInputCodeOrder
        navegation={navigation}
        isVisible={showAlertCode}
        closeModal={() => setShowAlertCode(false)}
      />

      {showAlertContain && (
        <View style={styles.orderInfoContainer}>
          <OrderInfo
            stops={selectedStore.paradas}
            setShowAlert={setShowAlert}
            showButton={false}
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
    top: 35,
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
  bottomButton: {
    position: "absolute",
    bottom: 0,
    left: 15,
    right: 15,
  },
});

export default MapDeliveryScreen;
