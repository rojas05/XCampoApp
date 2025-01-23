import React, { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Text,
} from "react-native";
import Constants from "expo-constants";
import StyledImput from "../src/styles/StyledImput";
import StyledText from "../src/styles/StyledText";
import theme from "../src/theme/theme";
import { HomeAlt, CheckCircle, Delivery, User } from "iconoir-react-native";
import StyledButton from "../src/styles/StyledButton";
import string from "../src/string/string";
import { useNavigation, useRoute } from "@react-navigation/native";
import { fetchWithToken } from "../tokenStorage";

const TypeUser = () => {
  const route = useRoute();
  const { idUser } = route.params;
  const { roles } = route.params;

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);
  const [store, setStore] = useState("");
  const [indications, setIndications] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [location, setlocation] = useState("");

  const [routeDelivery, setRouteDelivery] = useState("");

  // eslint-disable-next-line no-unused-vars
  const [nameClient, setNameClient] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [indicationsClient, setIndicationsClient] = useState("");

  const [seller, setSeller] = useState(true);
  const [deliveryMan, setDeliveryMan] = useState(true);
  const [client, setClient] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    validateRol();
  }, [validateRol]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function validateRol() {
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
  }

  const validateForm = async (rol) => {
    if (rol === "SELLER") {
      let errors = {};
      if (!store) errors.store = string.App.require;
      if (!indications) errors.indications = string.App.require;
      if (!coordinates) errors.coordinates = string.App.require;
      if (!location) errors.location = string.App.require;
      setErrors(errors);
    }

    if (rol === "DELIVERYMAN") {
      let errors = {};
      if (!routeDelivery) errors.routeDelivery = string.App.require;
      setErrors(errors);
    }

    if (rol === "CLIENT") {
      let errors = {};
      if (!nameClient) errors.nameClient = string.App.require;
      if (!indicationsClient) errors.indicationsClient = string.App.require;
      setErrors(errors);
    }

    errorsFuncion(rol);
  };

  function errorsFuncion(rol) {
    if (rol === "SELLER") {
      if (Object.keys(errors).length === 0) {
        setLoading(true);

        const data = {
          id_seller: null,
          name_store: store,
          coordinates: coordinates,
          location: location,
          location_description: indications,
          img: null,
        };

        setRol(rol, data);
      }
    }

    if (rol === "DELIVERYMAN") {
      if (Object.keys(errors).length === 0) {
        setLoading(true);

        const data = {
          id_seller: null,
          rute: routeDelivery,
        };

        setRol(rol, data);
      }
    }

    if (rol === "CLIENT") {
      if (Object.keys(errors).length === 0) {
        setLoading(true);

        const data = {
          id_seller: null,
          name: nameClient,
          location_description: indicationsClient,
        };

        setRol(rol, data);
      }
    }
  }

  async function setRol(rol, data) {
    const requestBody = {
      roles_id: null,
      nameRole: rol,
    };

    try {
      const response = await fetchWithToken(
        "http://192.168.0.121:8080/XCampo/api/v1/rol/" + idUser,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Asegúrate de enviar el Content-Type
          },
          body: JSON.stringify(requestBody),
        },
      );
      if (response.ok) {
        const dataRequest = await response.json();
        setRolData(
          rol.toLowerCase(),
          JSON.stringify(dataRequest.roles_id),
          data,
        );
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  async function setRolData(rol, idRoles, data) {
    try {
      const response = await fetchWithToken(
        "http://192.168.0.121:8080/XCampo/api/v1/" + rol + "/" + idRoles,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      if (response.ok) {
        setLoading(false);
        navigation.navigate("Splash");
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

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 15,
                }}
              >
                <CheckCircle color={"grey"} width={30} height={30} />

                <StyledImput
                  placeholder={"Nombre de la finca"}
                  onChangeText={(newText) => setStore(newText)}
                  textError={errors.store}
                ></StyledImput>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <CheckCircle color={"grey"} width={30} height={30} />

                <StyledImput
                  placeholder={"Vereda"}
                  onChangeText={(newText) => setlocation(newText)}
                  textError={errors.location}
                ></StyledImput>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <CheckCircle color={"grey"} width={30} height={30} />

                <StyledImput
                  placeholder={"Indicaciones para llegar a la finca"}
                  onChangeText={(newText) => setIndications(newText)}
                  textError={errors.indications}
                ></StyledImput>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <CheckCircle color={"grey"} width={30} height={30} />

                <StyledImput
                  placeholder={"Cordenadas de maps"}
                  onChangeText={(newText) => setCoordinates(newText)}
                  textError={errors.coordinates}
                ></StyledImput>
              </View>

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

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 15,
                }}
              >
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

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 15,
                }}
              >
                <CheckCircle color={"grey"} width={30} height={30} />

                <StyledImput
                  placeholder={"Nombre de cliente"}
                  onChangeText={(newText) => setRouteDelivery(newText)}
                  textError={errors.routeDelivery}
                ></StyledImput>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 15,
                }}
              >
                <CheckCircle color={"grey"} width={30} height={30} />

                <StyledImput
                  placeholder={"Indicaciones"}
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
                    validateForm("CLIENT");
                  }}
                ></StyledButton>
              )}
            </View>
          ) : (
            <View></View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: theme.colors.yellow,
  },
  item: {
    backgroundColor: theme.colors.opacity,
    width: 300,
    borderRadius: 20,
    marginTop: 10,
    alignItems: "center",
  },
  header: {
    backgroundColor: theme.colors.green,
    height: 40,
    width: 300,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    flexDirection: "row",
    padding: 5,
    justifyContent: "center",
  },
  scroll: {
    backgroundColor: theme.colors.opacity,
  },
  background: {
    flex: 1,
  },
  title: {
    backgroundColor: theme.colors.opacity,
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
    justifyContent: "center",
  },
});

export default TypeUser;
