import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import theme from "../../theme/theme";
import { GOOGLE_MAPS_KEY } from "@env";

const MarkerComponent = ({
  coordinate,
  color,
  onPress,
  title,
  description,
  iconName,
}) => (
  <Marker
    coordinate={coordinate}
    title={title}
    description={description}
    onPress={onPress}
  >
    <FontAwesome5 name={iconName} size={25} color={color} />
  </Marker>
);

const MapViewDirection = ({ origin, destination, colorMaker }) => {
  return (
    <>
      {/* Ruta Destino */}
      <MarkerComponent
        coordinate={destination}
        color={colorMaker}
        title={"Tu Destino"}
        onPress={() => {}}
        iconName="store"
      />
      {/* Mapa con Dirección */}
      <MapViewDirections
        apikey={GOOGLE_MAPS_KEY}
        origin={origin}
        destination={destination}
        strokeColor={theme.colors.green}
        strokeWidth={5}
        onError={(errorMessage) =>
          alert("No se pudo calcular la ruta: " + errorMessage)
        }
      />
    </>
  );
};

const MapComponent = ({
  mapRef,
  origin,
  destination,
  mapType,
  colorMaker,
  onPress,
}) => {
  return (
    <MapView
      style={styles.map}
      provider="google"
      mapType={mapType}
      ref={mapRef}
      showsUserLocation={true}
      followsUserLocation={true}
      showsMyLocationButton={true}
      showsCompass={true}
      rotateEnabled={true}
      initialRegion={origin}
    >
      {/* Ruta Ubicación Del Dispositivo */}
      <MarkerComponent
        coordinate={origin}
        color={theme.colors.red}
        onPress={() => {}}
        title={"Tu Ubicacion"}
        iconName="car-side"
      />

      <Circle
        center={origin}
        radius={80} // Radio de 80 metros
        strokeColor={theme.colors.blue}
        fillColor="rgba(39, 245, 223, 0.34)"
      />

      {/* Mostrar la ruta entre origen y destino */}
      <MapViewDirection
        origin={origin}
        destination={destination}
        colorMaker={colorMaker}
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: "100%",
    width: "100%",
  },
});

export default MapComponent;
