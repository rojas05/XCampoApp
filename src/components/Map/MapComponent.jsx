import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

// eslint-disable-next-line import/no-unresolved
import { GOOGLE_MAPS_KEY } from "@env";
import theme from "../../theme/theme";

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
    <FontAwesome5 name={iconName} size={24} color={color} />
  </Marker>
);

const MapViewDirection = ({ origin, destination }) => {
  return (
    <>
      {/* Ruta Ubicación Del Dispositivo */}
      <MarkerComponent
        coordinate={origin}
        color={theme.colors.red}
        onPress={() => {}}
        title={"Tu Ubicacion"}
        iconName="car-side"
      />
      {/* Ruta Destino */}
      <MarkerComponent
        coordinate={destination}
        color={theme.colors.red}
        title={"Tu Destino"}
        onPress={() => {}}
        iconName="store"
      />
      {/* Mapa con Dirección */}
      <MapViewDirections
        origin={origin}
        destination={destination}
        apikey={GOOGLE_MAPS_KEY}
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
  mapType,
  data,
  colorMaker,
  origin,
  showRute,
  destination,
  onPress,
}) => {
  const [isVisibleRute, setIsVisibleRute] = useState(false);

  useEffect(() => {
    setIsVisibleRute(showRute);
  }, [showRute]);

  return (
    <MapView
      style={styles.map}
      ref={mapRef}
      provider="google"
      mapType={mapType}
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
      {/* Mostrar marcadores para cada tienda */}
      {Array.isArray(data) &&
        data.map((store) => (
          <MarkerComponent
            key={store.idTienda}
            coordinate={store.paradas[0]?.coordinate}
            title={store.nombre}
            description={`Paradas: ${store.paradas.length}`}
            onPress={() => onPress(store.id)}
            iconName="store"
            color={colorMaker}
          />
        ))}

      {/* Mostrar la ruta entre origen y destino */}
      {isVisibleRute && (
        <MapViewDirection origin={origin} destination={destination} />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapComponent;
