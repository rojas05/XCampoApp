import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { getInfoUserId } from "../services/UserService";

import API_URL from "../fetch/ApiConfig.js";
import theme from "../src/theme/theme.js";
import StyledText from "../src/styles/StyledText.jsx";
import StyledButton from "../src/styles/StyledButton.jsx";
import { getToken, fetchWithToken } from "../tokenStorage.js";
import { registerForPushNotificationsAsync } from "../funcions/registerForPushNotificationsAsync.js";

const Splash = () => {
  const navigation = useNavigation();

  const [roles, setRoles] = useState([]);
  const [idUser, setIdUser] = useState("");

  useEffect(() => {
    const checkAndFetchUserInfo = async () => {
      try {
        const userInfo = await SecureStore.getItemAsync("userInfo");
        if (!userInfo) {
          await getInfoUserId();
        }
      } catch (error) {
        console.error("Error al verificar/obtener userInfo:", error);
      }
    };

    getTokenMain();
    checkAndFetchUserInfo();
  }, [getTokenMain]);

  const getTokenMain = useCallback(async () => {
    try {
      const idStorage = await getToken("id"); // Espera a que se resuelva el token

      if (idStorage != null) {
        getUserData(idStorage);
        registerForPushNotificationsAsync(idStorage);
      } else {
        navigation.navigate("WelcomePage");
      }
    } catch (error) {
      console.error("Error al obtener el token:", error);
      Alert.alert("Error", "Hubo un problema al obtener el token");
    }
  }, [getUserData, navigation]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getUserData(id_user) {
    setIdUser(id_user);
    try {
      const response = await fetchWithToken(`${API_URL}rol/${id_user}`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();

        if (JSON.stringify(data) === "[]") {
          navigation.navigate("TypeUser", {
            idUser: id_user,
            roles: roles,
          });
        } else {
          const jsonObject = JSON.parse(JSON.stringify(data));
          const valuesList = Object.values(jsonObject);
          setRoles(valuesList);
        }
      }
    } catch (error) {
      console.error("Error al obtener el token:", error);
      navigation.navigate("Hello");
    }
  }

  function rolView(rol) {
    if (rol === "DELIVERYMAN") {
      return "Repartidor";
    }
    if (rol === "SELLER") {
      return "Vendedor";
    }
    if (rol === "CLIENT") {
      return "Cliente";
    }
  }

  function rolNavigate(rol) {
    if (!idUser) {
      console.warn("idUser no está definido");
      return;
    }

    if (rol === "DELIVERYMAN") {
      navigation.navigate("HomeDelivery", { idUser });
    }
    if (rol === "SELLER") {
      navigation.navigate("HomeSeller", { idUser });
    }
    if (rol === "CLIENT") {
      navigation.navigate("IndexClient");
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/background.png")}
        style={styles.image}
      >
        <View style={styles.containerComponent}>
          <StyledText title bold>
            Bienvenido. Como vas a iniciar?
          </StyledText>
          <Image
            source={require("../assets/XCampo.png")}
            style={styles.imageIc}
          />
          <View style={styles.List}>
            <FlatList
              data={roles}
              keyExtractor={(item, index) => index.toString()} // Usamos el índice como clave única
              renderItem={({ item }) => (
                <StyledButton
                  title={rolView(item)}
                  onPress={() => {
                    rolNavigate(item);
                  }}
                ></StyledButton> // Mostramos cada valor de la lista
              )}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("TypeUser", { idUser: idUser, roles: roles });
            }}
          >
            <StyledText bold blue>
              Registrar otro rol
            </StyledText>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  List: {
    backgroundColor: theme.colors.opacity,
    borderRadius: 20,
    marginBottom: 20,
    width: 250,
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  containerComponent: {
    alignItems: "center",
    backgroundColor: theme.colors.opacity,
    flex: 1,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
  },
  imageIc: {
    borderRadius: 20,
    height: 150,
    marginBottom: 20,
    marginTop: 20,
    width: 250,
  },
});

export default Splash;
