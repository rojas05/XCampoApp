import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import string from "../src/string/string";
import StyledText from "../src/styles/StyledText";
import StyledButton from "../src/styles/StyledButton";
import { CustomInput } from "../src/components/InputCustom";
import { saveToken } from "../tokenStorage";
import postData from "../fetch/UseFetch";
import theme from "../src/theme/theme";

const Signup = () => {
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [cell, setCell] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const [city, setCity] = useState("");

  const [errors, setErrors] = useState({});

  const validateForm = async () => {
    let errors = {};

    // Validaciones
    if (!name) errors.name = string.Signup.errors.name;
    if (!cell) errors.cell = string.Signup.errors.cell;
    if (!password) errors.password = string.Signup.errors.password;
    if (password.length < 8) errors.password = string.Signup.errors.password;
    if (!mail) errors.mail = string.Signup.errors.mail;
    if (!city) errors.city = string.Signup.errors.city;

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      const requestBody = {
        user_id: null,
        name: name,
        city: city,
        cell: cell,
        email: mail,
        password: password,
      };

      setLoading(true); // Activar el estado de carga

      const { data, error } = await postData(
        "http://192.168.101.29:8080/XCampo/api/v1/auth/register",
        requestBody,
      );

      setLoading(false); // Desactivar el estado de carga

      if (data) {
        if (data.statusCode === "FORBIDDEN") {
          Alert.alert("Upss", "El correo ya existe");
          errors.mail = string.Signup.errors.mail;
        }
        if (data.statusCode === "OK") {
          try {
            await saveToken("id", data.body.id_user);
            await saveToken("accessToken", data.body.token);
            await saveToken("refreshToken", data.body.refreshToken);
          } catch (e) {
            Alert.alert("No se logro iniciar");
            throw e;
          }
          navigation.navigate("TypeUser", {
            idUser: data.body.id_user,
            roles: [],
          });
        }
      }

      if (error) {
        Alert.alert("Error", error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/XCampo.png")}
        style={styles.image}
      ></Image>

      <StyledButton
        title={string.Signup.hello}
        style={styles.Button}
      ></StyledButton>

      <View style={styles.inputContainer}>
        <CustomInput
          value={name}
          placeholder={string.Signup.name}
          onChangeText={(newText) => setName(newText)}
          errorMessage={errors.name}
        />
        <CustomInput
          value={cell}
          placeholder={string.Signup.cell}
          onChangeText={(newText) => setCell(newText)}
          errorMessage={errors.cell}
          keyboardType="numeric"
        />
        <CustomInput
          value={city}
          placeholder={string.Signup.city}
          onChangeText={(newText) => setCity(newText)}
          errorMessage={errors.city}
        />
        <CustomInput
          value={mail}
          placeholder={string.Signup.mail}
          onChangeText={(newText) => setMail(newText)}
          errorMessage={errors.mail}
        />
        <CustomInput
          value={password}
          placeholder={string.Signup.password}
          onChangeText={(newText) => setPassword(newText)}
          errorMessage={errors.password}
        />
      </View>

      <StyledText style={styles.text}>{string.Signup.require}</StyledText>

      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.yellow} />
      ) : (
        <StyledButton
          title={string.Signup.registrate}
          style={styles.btnRegister}
          onPress={() => {
            validateForm();
          }}
        ></StyledButton>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    alignItems: "center",
    paddingHorizontal: 50,
    width: "100%",
  },
  image: {
    width: 200,
    height: 100,
    borderRadius: 30,
  },
  Button: {
    marginTop: 30,
    marginBottom: 30,
    width: 250,
  },
  text: {
    marginTop: 20,
    fontSize: 15,
    width: 250,
  },
  btnRegister: {
    marginTop: 20,
  },
});

export default Signup;
