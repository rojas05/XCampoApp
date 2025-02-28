import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
/* Services */
import {
  getSavedLocation,
  getCoordinates,
} from "../../funcions/getCoordinates";
/* Utils */
import theme from "../../src/theme/theme";
import strings from "../../src/string/string";
import StyledButtonIcon from "../../src/styles/StyledButtonIcon";
import { HOME_STYLES, ICON_COLORS_MAP } from "../../src/utils/constants";
/* Components */
import OrderInfo from "./OrderInfoComponent";
import FloatingButton from "../../src/components/FloatingButton";
import FloatingBar from "../../src/components/FloatingBar";
import AlertGoOrder from "../../src/components/Alerts/AlertGoOrder";
import MapComponent from "../../src/components/Map/MapComponent";
import { getDeliveryProductsStateMaps } from "../../services/DeliveryProduct";

const MAP_TYPES = ["standard", "hybrid", "terrain"];

const MapScreen = ({ navigation }) => {
  const mapRef = useRef(null);

  const [mapState, setMapState] = useState({
    mapTypeIndex: 0,
    colorMaker: ICON_COLORS_MAP.standard,
    origin: null,
    isLoading: true,
  });

  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState({});

  const [alertState, setAlertState] = useState({
    showAlertContain: false,
    showAlert: false,
  });

  useEffect(() => {
    const fetchLocation = async () => {
      const savedLocation = await getSavedLocation();
      if (savedLocation) {
        const cordenates = await getCoordinates(savedLocation);
        setMapState((prev) => ({ ...prev, origin: cordenates }));
      }
      setMapState((prev) => ({
        ...prev,
        colorMaker: ICON_COLORS_MAP.standard,
        isLoading: false,
      }));
    };

    const getStorage = async () => {
      let storage = await getDeliveryProductsStateMaps();
      setStores(storage);
    };

    getStorage();
    fetchLocation();
  }, []);

  const showInfoContain = useCallback(
    (storeId) => {
      const store = stores.find((s) => s.sellerId === storeId);
      setSelectedStore(store);
      setAlertState((prev) => ({ ...prev, showAlertContain: true }));
    },
    [stores],
  );

  const handleMarkerPress = useCallback(
    (id) => {
      const store = stores.find((s) => s.sellerId === id);
      setSelectedStore(store);
      setAlertState((prev) => ({ ...prev, showAlert: true }));
    },
    [stores],
  );

  const changeMapType = () => {
    setMapState((prev) => {
      const newIndex = (prev.mapTypeIndex + 1) % MAP_TYPES.length;
      return {
        ...prev,
        mapTypeIndex: newIndex,
        colorMaker: ICON_COLORS_MAP[MAP_TYPES[newIndex]],
      };
    });
  };

  if (mapState.isLoading || mapState.origin === null) return renderLoading();

  return (
    <View style={HOME_STYLES.container}>
      <MapComponent
        data={stores} /* data */
        mapRef={mapRef}
        origin={mapState.origin}
        colorMaker={mapState.colorMaker}
        mapType={MAP_TYPES[mapState.mapTypeIndex]}
        onPress={handleMarkerPress}
      />
      <FloatingActionButtons
        onMapTypeChange={changeMapType}
        navigation={navigation}
      />
      <FloatingBar
        profileImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv_oL1l60gN7zHc_fMS11OeFR-mLDi3DgjNg&s" /* Cambiar */
        userName="Armando Paredez Pinto"
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
        onPress={() => showInfoContain(stores[0].id)} // Evento de new order
      />

      {alertState.showAlertContain && selectedStore && (
        <View style={styles.orderInfoContainer}>
          <OrderInfo
            stops={selectedStore.paradas || []}
            setShowAlert={(val) =>
              setAlertState((prev) => ({ ...prev, showAlert: val }))
            }
            showButton={false}
          />
        </View>
      )}

      {alertState.showAlert && selectedStore && (
        <View style={theme.overlay}>
          <AlertGoOrder
            order={selectedStore}
            isVisible={() =>
              setAlertState((prev) => ({ ...prev, showAlert: false }))
            }
          />
        </View>
      )}
    </View>
  );
};

const FloatingActionButtons = ({ onMapTypeChange }) => (
  <View style={styles.floatingButtons}>
    <StyledButtonIcon
      start
      title={strings.FloatingActionButtons.changeMap}
      iconLibrary={FontAwesome5}
      nameIcon="layer-group"
      onPress={onMapTypeChange}
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

const styles = StyleSheet.create({
  floatingButtons: {
    bottom: 80,
    flexDirection: "column",
    justifyContent: "flex-start",
    left: 10,
    position: "absolute",
  },
  loadingContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  orderInfoContainer: {
    bottom: 83,
    left: 10,
    position: "absolute",
    right: 10,
  },
});

export default MapScreen;
