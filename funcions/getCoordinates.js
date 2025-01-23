export const getCoordinates = async (coordinates) => {
  let cadena = JSON.stringify(coordinates);

  cadena = cadena.replace(/"/g, "");

  const partes = cadena.split(",");

  const latitude = parseFloat(partes[0].trim());
  const longitude = parseFloat(partes[1]?.trim());

  return {
    latitude: latitude,
    longitude: longitude,
    longitudeDelta: 0.005,
    latitudeDelta: 0.005,
  };
};
