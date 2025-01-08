import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

import { openCamera, openGallery } from "../../src/utils/ImagePickerHandler.js";
import { STYLES_HOMESELLER } from "../../src/utils/constants.js";
import CustomPicker from "../../src/components/InputSelect.jsx";
import {
  CustomAlert,
  AlertOk,
  handleLongPress,
} from "../../src/components/CustomAlert.jsx";
import StyledButton from "../../src/styles/StyledButton.jsx";
import StyledButtonIncrement from "../../src/styles/StyledButtonIncrement.jsx";
import TEXTS from "../../src/string/string.js";
import Color from "../../src/theme/theme.js";

const validateForm = (form, imagen, setErrors) => {
  const newErrors = {};
  if (!form.productName) newErrors.productName = "El nombre es obligatorio.";
  if (!form.productDescription)
    newErrors.productDescription = "La descripción es obligatoria.";
  if (!form.unidad) newErrors.unidad = "La unidad es obligatoria.";
  if (!form.categoria) newErrors.categoria = "La categoría es obligatoria.";
  if (!form.productPrice) newErrors.productPrice = "El precio es obligatorio.";
  if (!form.stock) newErrors.stock = "El stock obligatorio.";
  if (imagen.length === 0)
    newErrors.imagen = "Debe seleccionar al menos una imagen.";

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const unidades = [
  { label: "Kg", value: "kg" },
  { label: "Litro", value: "litro" },
  { label: "Metro", value: "metro" },
  { label: "Pieza", value: "pieza" },
  { label: "Libra", value: "helloo" },
];

const RegisterProducts = ({ route }) => {
  const { title } = route.params;
  const [form, setForm] = useState({
    productName: "",
    productDescription: "",
    unidad: "",
    categoria: "",
    productPrice: "",
    stock: "",
  });
  const [imagen, setImagen] = useState([]);
  const [errors, setErrors] = useState({});
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [isAlertOkVisible, setAlertOkVisible] = useState(false);

  const handleSubmit = () => {
    if (validateForm(form, imagen, setErrors)) {
      setAlertOkVisible(true);
    }
  };

  const incrementarStock = () =>
    handleInputChange("stock", (parseInt(form.stock || 4) + 1).toString());

  const handleInputChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const handleInputProps = ({ value, error, setName, field }) => ({
    placeholder: error || TEXTS.homeSeller[field],
    placeholderTextColor: error ? "red" : "gray",
    value,
    onChangeText: (text) => {
      handleInputChange(setName, text);
    },
  });

  const handleChangePrice = (text) => {
    const numericText = text.replace(/[^0-9]/g, "");
    const formattedText = numericText.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    handleInputChange("productPrice", formattedText);
  };

  const handleAddImage = () => {
    if (imagen.length >= 2) {
      Alert.alert(
        "¡Límite de imágenes alcanzado!",
        "Solo puedes agregar hasta 2 imágenes.",
      );
    } else {
      setAlertVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{title}</Text>
      {/* Imagen */}
      <View style={styles.imageContainer}>
        {imagen.length > 0 ? (
          imagen.map((uri, index) => (
            <TouchableOpacity
              key={index}
              onLongPress={() => handleLongPress(index, imagen, setImagen)}
            >
              <Image source={{ uri }} style={STYLES_HOMESELLER.imageTop} />
            </TouchableOpacity>
          ))
        ) : (
          <Text
            style={{
              color: errors.imagen ? "red" : "black",
            }}
          >
            {errors.imagen || "Seleccione una imagen."}
          </Text>
        )}
      </View>

      {/* Input Name y Category */}
      <View style={styles.inputContainer}>
        <View style={styles.inputColumn}>
          <TextInput
            style={[
              STYLES_HOMESELLER.input,
              errors.productName && styles.inputError,
            ]}
            {...handleInputProps({
              value: form.productName,
              error: errors.productName,
              setName: "productName",
              field: "PRODUCT_NAME",
            })}
          />
          <TextInput
            style={[
              STYLES_HOMESELLER.input,
              errors.categoria && styles.inputError,
            ]}
            {...handleInputProps({
              value: form.categoria,
              error: errors.categoria,
              setName: "categoria",
              field: "CATEGORY",
            })}
          />
        </View>
        <TouchableOpacity style={styles.iconButton} onPress={handleAddImage}>
          <AntDesign name="picture" size={35} color="black" />
        </TouchableOpacity>
      </View>

      {/* Descripción */}
      <TextInput
        style={[
          STYLES_HOMESELLER.inputDescription,
          errors.categoria && styles.inputError,
        ]}
        {...handleInputProps({
          value: form.productDescription,
          error: errors.productDescription,
          setName: "productDescription",
          field: "DESCRIPTION",
        })}
        multiline={true}
        numberOfLines={5}
        textAlignVertical="top"
      />

      {/* Input Selection */}
      <CustomPicker
        value={form.unidad}
        setValue={(value) => handleInputChange("unidad", value)}
        items={unidades}
        error={errors.unidad}
      />

      {/* Input Price y Stock */}
      <View style={styles.rowContainer}>
        <TextInput
          style={[
            STYLES_HOMESELLER.input,
            styles.halfWidth,
            errors.productPrice && styles.inputError,
          ]}
          placeholder={errors.productPrice || TEXTS.homeSeller.PRICE}
          placeholderTextColor={errors.productPrice ? "red" : "gray"}
          keyboardType="numeric"
          value={form.productPrice ? `$ ${form.productPrice}` : ""}
          onChangeText={handleChangePrice}
        />
        <View
          style={[
            STYLES_HOMESELLER.input,
            styles.halfWidth,
            styles.stockContainer,
            errors.stock && styles.inputError,
          ]}
        >
          <TextInput
            placeholder={errors.stock || TEXTS.homeSeller.STOCK}
            placeholderTextColor={errors.productPrice ? "red" : "gray"}
            keyboardType="numeric"
            value={form.stock}
            onChangeText={(text) => handleInputChange("stock", text)}
          />
          <StyledButtonIncrement text="+" onPress={incrementarStock} />
        </View>
      </View>

      <StyledButton
        yellow
        textBlack
        onPress={handleSubmit}
        title={TEXTS.homeSeller.ADD_PRODUCT}
      />

      {/* Alert selection imagen */}
      <CustomAlert
        visible={isAlertVisible}
        onClose={() => setAlertVisible(false)}
        onCamera={() => openCamera(setImagen, setAlertVisible)}
        onGallery={() => openGallery(setImagen, setAlertVisible)}
      />
      <AlertOk
        visible={isAlertOkVisible}
        messege="¡Producto agregado con éxito!"
        onClose={() => setAlertOkVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Color.colors.grey,
    padding: 20,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  inputColumn: {
    flex: 0.6,
    marginRight: 10,
  },
  inputError: {
    borderColor: "red",
  },
  iconButton: {
    backgroundColor: Color.colors.greenMedium,
    borderRadius: 5,
    padding: 10,
    height: 111,
    justifyContent: "center",
    alignItems: "center",
    flex: 0.4,
  },
  rowContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  halfWidth: {
    flex: 0.6,
    marginRight: 10,
  },
  stockContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderWidth: 0,
  },
});

export default RegisterProducts;
