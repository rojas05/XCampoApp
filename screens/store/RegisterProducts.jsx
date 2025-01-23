import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

import { openCamera, openGallery } from "../../src/utils/ImagePickerHandler";
import { HOME_STYLES } from "../../src/utils/constants";
import CustomPicker from "../../src/components/InputSelect";
import { CustomAlert, AlertOk } from "../../src/components/Alerts/CustomAlert";
import {
  CustomInput,
  CustomInputPrice,
} from "../../src/components/InputCustom";
import StyledButton from "../../src/styles/StyledButton";
import StyledButtonIncrement from "../../src/styles/StyledButtonIncrement";
import TEXTS from "../../src/string/string";
import Color from "../../src/theme/theme";

const UNIDADES = [
  { label: "Kg", value: "kg" },
  { label: "Litro", value: "litro" },
  { label: "Metro", value: "metro" },
  { label: "Pieza", value: "pieza" },
  { label: "Libra", value: "libra" },
];

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

  const handleInputChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const handleSubmit = () => {
    if (validateForm(form, imagen, setErrors)) {
      setAlertOkVisible(true);
    }
  };

  const incrementarStock = () => {
    const currentStock = parseInt(form.stock || 4, 10);
    handleInputChange("stock", (currentStock + 1).toString());
  };

  const formatPrice = (text) => {
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
      <Text style={styles.title}>{title}</Text>

      <ImageSelector
        imagen={imagen}
        errors={errors}
        handleLongPress={setImagen}
      />

      <FormInputs
        form={form}
        errors={errors}
        handleInputChange={handleInputChange}
        formatPrice={formatPrice}
        incrementarStock={incrementarStock}
        handleAddImage={handleAddImage}
      />

      <StyledButton
        yellow
        textBlack
        onPress={handleSubmit}
        title={TEXTS.homeSeller.ADD_PRODUCT}
      />

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

const ImageSelector = ({ imagen, errors, handleLongPress }) => (
  <View style={styles.imageContainer}>
    {imagen.length > 0 ? (
      imagen.map((uri, index) => (
        <TouchableOpacity
          key={index}
          onLongPress={() => handleLongPress(index)}
        >
          <Image source={{ uri }} style={HOME_STYLES.imageTop} />
        </TouchableOpacity>
      ))
    ) : (
      <Text style={{ color: errors.imagen ? "red" : "black" }}>
        {errors.imagen || "Seleccione una imagen."}
      </Text>
    )}
  </View>
);

const FormInputs = ({
  form,
  errors,
  handleInputChange,
  formatPrice,
  incrementarStock,
  handleAddImage,
}) => (
  <>
    <View style={styles.inputContainer}>
      <View style={styles.inputColumn}>
        <CustomInput
          value={form.productName}
          placeholder="Nombre del producto"
          onChangeText={(value) => handleInputChange("productName", value)}
          errorMessage={errors.productName}
        />
        <CustomInput
          value={form.categoria}
          placeholder="Categoría"
          onChangeText={(value) => handleInputChange("categoria", value)}
          errorMessage={errors.categoria}
        />
      </View>
      <TouchableOpacity style={styles.iconButton} onPress={handleAddImage}>
        <AntDesign name="picture" size={35} color="black" />
      </TouchableOpacity>
    </View>

    <CustomInput
      value={form.productDescription}
      placeholder="Descripción del producto"
      onChangeText={(value) => handleInputChange("productDescription", value)}
      errorMessage={errors.productDescription}
      multiline
      numberOfLines={4}
      style={{ height: 100 }}
    />

    <CustomPicker
      value={form.unidad}
      setValue={(value) => handleInputChange("unidad", value)}
      items={UNIDADES}
      error={errors.unidad}
    />

    <View style={styles.rowContainer}>
      <CustomInputPrice
        value={form.productPrice ? `$ ${form.productPrice}` : ""}
        placeholder="Precio"
        onChangeText={formatPrice}
        errorMessage={errors.productPrice}
        keyboardType="numeric"
      />
      <View style={[styles.halfWidth, styles.stockContainer]}>
        <CustomInputPrice
          value={form.stock}
          placeholder="Stock"
          onChangeText={(value) => handleInputChange("stock", value)}
          errorMessage={errors.stock}
          keyboardType="numeric"
        />
        <StyledButtonIncrement text="+" onPress={incrementarStock} />
      </View>
    </View>
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Color.colors.grey,
    padding: 20,
  },
  title: {
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
    marginBottom: 10,
  },
  halfWidth: {
    flex: 1,
  },
  stockContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
});

export default RegisterProducts;
