import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import Constants from "expo-constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  HomeAlt,
  CheckCircle,
  Delivery,
  User,
  Pin,
} from "iconoir-react-native";
import { Ionicons } from "@expo/vector-icons";

import { fetchWithToken } from "../tokenStorage";
import { responseHeader } from "../fetch/UseFetch";
import API_URL from "../fetch/ApiConfig";

import StyledImput from "../src/styles/StyledImput";
import StyledText from "../src/styles/StyledText";
import theme from "../src/theme/theme";
import StyledButton from "../src/styles/StyledButton";
import string from "../src/string/string";
import { getLocationPermission } from "../src/utils/LocationPermission";
import { CustomAlert } from "../src/components/Alerts/CustomAlert";
import { openCamera, openGallery } from "../src/utils/ImagePickerHandler";
import {
  getSellerID,
  postImageFirebaseSeller,
  updateSellerImage,
} from "../services/SellerService";

const TypeUser = () => {
  const route = useRoute();
  const { idUser, roles } = route.params;

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [store, setStore] = useState("");
  const [indications, setIndications] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [location, setlocation] = useState("");

  const [routeDelivery, setRouteDelivery] = useState("");

  const [nameClient, setNameClient] = useState("");
  const [indicationsClient, setIndicationsClient] = useState("");

  const [seller, setSeller] = useState(true);
  const [deliveryMan, setDeliveryMan] = useState(true);
  const [client, setClient] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    getLocationPermission(setCoordinates);
    validateRol();
  }, [validateRol]);

  const handleLocationPress = () => {
    getLocationPermission(setCoordinates);
    Alert.alert("Ubicacion agregada", "Se agrego su ubicaion");
  };

  const addPhoto = () => {
    if (photos.length >= 2) {
      Alert.alert("Límite alcanzado", "El límite es dos fotos.");
      return;
    } else {
      setAlertVisible(true);
    }
  };

  const removePhoto = (index) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  const validateRol = useCallback(() => {
    // Itera sobre la lista de roles
    roles.forEach((role) => {
      switch (role) {
        case "SELLER":
          setSeller(false);
          break;
        case "CLIENT":
          setClient(false);
          break;
        case "DELIVERYMAN":
          setDeliveryMan(false);
          break;
        default:
          console.warn(`Rol desconocido: ${role}`);
          break;
      }
    });
  }, [roles]);

  const roleValidations = {
    SELLER: () => {
      let errors = {};
      if (!store) errors.store = string.App.require;
      if (!indications) errors.indications = string.App.require;
      if (!coordinates) errors.coordinates = string.App.require;
      if (!location) errors.location = string.App.require;
      return errors;
    },
    DELIVERYMAN: () => {
      let errors = {};
      if (!routeDelivery) errors.routeDelivery = string.App.require;
      return errors;
    },
    CLIENT: () => {
      let errors = {};
      if (!nameClient) errors.nameClient = string.App.require;
      if (!indicationsClient) errors.indicationsClient = string.App.require;
      return errors;
    },
  };

  const validateForm = async (rol) => {
    const errors = roleValidations[rol]();
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      let data = {};

      switch (rol) {
        case "SELLER":
          data = {
            id_seller: null,
            name_store: store,
            coordinates: JSON.stringify(coordinates),
            location: location,
            location_description: indications,
            img: null,
          };
          break;
        case "DELIVERYMAN":
          data = { id_seller: null, rute: routeDelivery };
          break;
        case "CLIENT":
          data = {
            id_seller: null,
            name: nameClient,
            location_description: indicationsClient,
          };
          break;
        default:
          console.error("Rol no válido.");
          return;
      }
      setRol(rol, data);
    }
  };

  async function setRol(rol, data) {
    const requestBody = {
      roles_id: null,
      nameRole: rol,
    };

    try {
      const response = await fetchWithToken(
        `${API_URL}rol/${idUser}`,
        responseHeader(requestBody, "POST"),
      );

      const dataRequest = await response.json();
      if (response.ok) {
        setRolData(
          rol.toLowerCase(),
          JSON.stringify(dataRequest.roles_id),
          data,
        );
      } else {
        console.error(dataRequest);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  async function setRolData(rol, idRoles, data) {
    try {
      const response = await fetchWithToken(
        `${API_URL}${rol}/${idRoles}`,
        responseHeader(data, "POST"),
      );

      if (response.ok) {
        setLoading(false);
        navigation.navigate("Splash");

        if (rol === "seller") {
          const idSeller = await getSellerID(idUser);
          const imageUrl = await postImageFirebaseSeller(photos, idSeller);
          if (imageUrl) {
            await updateSellerImage(imageUrl, idSeller);
          }
        }
      } else {
        console.error("User data:", JSON.stringify(response));
        navigation.navigate("Splash");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      navigation.navigate("Splash");
      console.error("Error fetching user data:", error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <StyledText title bold>
          ¿Como quieres iniciar?
        </StyledText>
        <StyledText>
          recuarda que puedes cambiar tu rol en cualquier momento
        </StyledText>
      </View>

      <ScrollView style={styles.scroll}>
        <View style={{ alignItems: "center" }}>
          {seller ? (
            <View style={styles.item}>
              <View style={styles.header}>
                <HomeAlt
                  width={25}
                  height={25}
                  color={"black"}
                  style={styles.icon}
                />
                <StyledText bold> Vendedor </StyledText>
              </View>

              <View style={styles.centerItem}>
                <CheckCircle color={"grey"} width={30} height={30} />

                <StyledImput
                  placeholder={"Nombre de la finca"}
                  onChangeText={(newText) => setStore(newText)}
                  textError={errors.store}
                ></StyledImput>
              </View>

              <View style={styles.center}>
                <CheckCircle color={"grey"} width={30} height={30} />

                <StyledImput
                  placeholder={"Vereda"}
                  onChangeText={(newText) => setlocation(newText)}
                  textError={errors.location}
                ></StyledImput>
              </View>

              <View style={styles.center}>
                <CheckCircle color={"grey"} width={30} height={30} />

                <StyledImput
                  placeholder={"Indicaciones para llegar a la finca"}
                  onChangeText={(newText) => setIndications(newText)}
                  textError={errors.indications}
                ></StyledImput>
              </View>

              <View style={styles.center}>
                <CheckCircle color={"grey"} width={30} height={30} />

                <TouchableOpacity
                  title="Agregar mi localización"
                  onPress={handleLocationPress}
                  style={styles.btnCordenadas}
                >
                  <Pin width={25} height={25} color="black" />
                  <Text style={styles.photoName}>Agregar mi localización</Text>
                </TouchableOpacity>
                {errors.coordinates && (
                  <StyledText style={{ color: theme.colors.red }}>
                    {errors.coordinates}
                  </StyledText>
                )}
              </View>

              {/* Campo para agregar las fotos */}
              <TouchableOpacity onPress={addPhoto} style={styles.btnAddPhoto}>
                <Text
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    color: theme.colors.white,
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  Agregar Foto
                </Text>
              </TouchableOpacity>

              <ScrollView style={styles.photosContainer}>
                {photos.map((photo, index) => (
                  <View key={index} style={styles.photoItem}>
                    <View style={styles.photoIcon}>
                      <Ionicons name="image-outline" size={24} color="black" />
                      <Text style={styles.photoName}>Imagen {index + 1}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => removePhoto(index)}
                      style={styles.removeButton}
                    >
                      <Ionicons name="close-circle" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>

              {loading ? (
                <ActivityIndicator size="large" color={theme.colors.yellow} />
              ) : (
                <StyledButton
                  title={string.App.next}
                  onPress={() => {
                    validateForm("SELLER");
                  }}
                ></StyledButton>
              )}
            </View>
          ) : (
            <Text></Text>
          )}

          {deliveryMan ? (
            <View style={styles.item}>
              <View style={styles.header}>
                <Delivery
                  width={25}
                  height={25}
                  color={"black"}
                  style={styles.icon}
                />
                <StyledText bold> Repartidor </StyledText>
              </View>

              <View style={styles.centerItem}>
                <CheckCircle color={"grey"} width={30} height={30} />

                <StyledImput
                  placeholder={"Veredas que transite"}
                  onChangeText={(newText) => setRouteDelivery(newText)}
                  textError={errors.routeDelivery}
                ></StyledImput>
              </View>

              {loading ? (
                <ActivityIndicator size="large" color={theme.colors.yellow} />
              ) : (
                <StyledButton
                  title={string.App.next}
                  onPress={() => {
                    validateForm("DELIVERYMAN");
                  }}
                ></StyledButton>
              )}
            </View>
          ) : (
            <View></View>
          )}

          {client ? (
            <View style={styles.item}>
              <View style={styles.header}>
                <User
                  width={25}
                  height={25}
                  color={"black"}
                  style={styles.icon}
                />
                <StyledText bold>Cliente </StyledText>
              </View>

              <View style={styles.centerItem}>
                <CheckCircle color={"grey"} width={30} height={30} />

                <StyledImput
                  placeholder={"Nombre de cliente"}
                  onChangeText={(newText) => setNameClient(newText)}
                  textError={errors.routeDelivery}
                ></StyledImput>
              </View>

              <View style={styles.centerItem}>
                <CheckCircle color={"grey"} width={30} height={30} />

                <StyledImput
                  placeholder={"Indicaciones"}
                  onChangeText={(newText) => setIndicationsClient(newText)}
                  textError={errors.routeDelivery}
                ></StyledImput>
              </View>

              {loading ? (
                <ActivityIndicator size="large" color={theme.colors.yellow} />
              ) : (
                <StyledButton
                  title={string.App.next}
                  onPress={() => {
                    validateForm("CLIENT");
                  }}
                  disabled={loading}
                ></StyledButton>
              )}
            </View>
          ) : (
            <View></View>
          )}
        </View>
        <CustomAlert
          visible={isAlertVisible}
          onClose={() => setAlertVisible(false)}
          onCamera={() => openCamera(setPhotos, setAlertVisible)}
          onGallery={() => openGallery(setPhotos, setAlertVisible)}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  btnAddPhoto: {
    alignItems: "center",
    backgroundColor: theme.colors.green,
    borderRadius: 8,
    marginTop: 15,
    paddingVertical: 5,
    textAlign: "center",
    width: "80%",
  },
  btnCordenadas: {
    alignContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: theme.colors.greyBlack,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: "84%",
  },
  center: {
    alignItems: "center",
    flexDirection: "row",
  },
  centerItem: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 15,
  },
  container: {
    backgroundColor: theme.colors.yellow,
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  header: {
    backgroundColor: theme.colors.green,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    padding: 5,
    width: 300,
  },
  item: {
    alignItems: "center",
    backgroundColor: theme.colors.opacity,
    borderRadius: 20,
    marginTop: 10,
    width: 300,
  },
  photoIcon: {
    alignItems: "center",
    flexDirection: "row",
    marginRight: 10,
  },
  photoItem: {
    alignSelf: "center",
    backgroundColor: theme.colors.greenLiht,
    borderRadius: 10,
    flexDirection: "row",
    marginBottom: 10,
    padding: 8,
  },
  photoName: {
    color: theme.colors.black,
    fontSize: 14,
    marginLeft: 10,
  },
  photosContainer: {
    marginVertical: 10,
  },
  removeButton: {
    marginLeft: 15,
  },
  scroll: {
    backgroundColor: theme.colors.opacity,
  },
  title: {
    alignItems: "center",
    backgroundColor: theme.colors.opacity,
    justifyContent: "center",
    marginBottom: 20,
    padding: 10,
  },
});

export default TypeUser;
