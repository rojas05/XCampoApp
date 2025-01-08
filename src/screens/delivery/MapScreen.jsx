import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
// eslint-disable-next-line import/no-unresolved
import { GOOGLE_MAPS_KEY } from "@env";
import { STYLES_HOMESELLER } from "../../utils/constants";
import FloatingBar from "../../components/FloatingBar";
import {
  getLocationPermission,
  openGoogleMaps,
} from "../../utils/LocationPermission";

const MapScreen = () => {
  const [origin, setOrigin] = useState(null);
  const [destination] = useState({
    latitude: 1.8597457358731515,
    longitude: -76.04371218824772,
  });
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef(null);

  useEffect(() => {
    getLocationPermission(setOrigin, setIsLoading);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando mapa...</Text>
      </View>
    );
  }

  return (
    <View style={STYLES_HOMESELLER.container}>
      <MapView
        style={styles.map}
        ref={mapRef}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={true}
        showsCompass={true}
        rotateEnabled={true}
      >
        <Marker
          draggable
          coordinate={origin}
          onDragEnd={(event) => setOrigin(event.nativeEvent.coordinate)}
        >
          <FontAwesome5 name="car-side" size={24} color="black" />
        </Marker>

        <Marker draggable coordinate={destination}>
          <FontAwesome5 name="store" size={24} color="black" />
        </Marker>

        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_KEY}
          strokeColor="#34a853"
          strokeWidth={5}
          onError={(errorMessage) =>
            alert("No se pudo calcular la ruta: " + errorMessage)
          }
        />
      </MapView>

      <View style={styles.floatingButtons}>
        <TouchableOpacity
          style={styles.mapButton}
          onPress={() => openGoogleMaps(origin, destination)}
        >
          <FontAwesome5 name="map-marked-alt" size={20} color="#fff" />
          <Text style={styles.buttonText}>Abrir en Google Maps</Text>
        </TouchableOpacity>
      </View>

      <FloatingBar
        profileImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv_oL1l60gN7zHc_fMS11OeFR-mLDi3DgjNg&s"
        userName="Armando Paredez"
      />
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
    justifyContent: "space-between",
  },
  mapButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#34a853",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MapScreen;
