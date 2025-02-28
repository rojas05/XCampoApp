import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

/* Componentes */
import {
  CustomInput,
  CustomInputPrice,
} from "../../src/components/InputCustom";
import CustomPicker from "../../src/components/InputSelect";
import { CustomAlert, AlertOk } from "../../src/components/Alerts/CustomAlert";
import StyledButtonIncrement from "../../src/styles/StyledButtonIncrement";
import StyledButton from "../../src/styles/StyledButton";

/* Utils */
import { openCamera, openGallery } from "../../src/utils/ImagePickerHandler";
import { HOME_STYLES } from "../../src/utils/constants";
import TEXTS from "../../src/string/string";
import Color from "../../src/theme/theme";

/* API */
import {
  createProduct,
  postImageFirebase,
  updateProductImage,
  updateProductId,
} from "../../services/productService";

import { validateForm } from "./js/ValidationForm";
import theme from "../../src/theme/theme";
import { getOtherURLsFromString } from "../../fetch/UseFetch";

const UNIDADES = [
  { label: "KILOGRAMO", value: "KILOGRAMO" },
  { label: "LITRO", value: "LITRO" },
  { label: "MetGRAMOro", value: "GRAMO" },
  { label: "ARROBA", value: "ARROBA" },
  { label: "LIBRA", value: "LIBRA" },
];

const RegisterProducts = ({ route, navigation }) => {
  const { title, idSeller, product } = route.params;
  const [imagen, setImagen] = useState([]);
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [isAlertOkVisible, setAlertOkVisible] = useState(false);
  const [form, setForm] = useState({
    productName: "",
    productDescription: "",
    unidad: "",
    categoria: "",
    productPrice: "",
    stock: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setIsEditing(true);
      setForm({
        productName: product.name || "",
        productDescription: product.description || "",
        unidad: product.measurementUnit || "",
        categoria: product.nameCategory || "",
        productPrice: product.price,
        stock: product.stock.toString(),
      });
      setImagen(getOtherURLsFromString(product.urlImage));
    } else {
      setIsEditing(false);
    }
  }, [isEditing, product]);

  const handleInputChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  async function createNewProduct() {
    const { show, idProduct } = await createProduct(form, idSeller);
    const imageUrl = await postImageFirebase(imagen, idProduct);
    if (imageUrl) {
      await updateProductImage(imageUrl, idProduct, idSeller);
    }
    if (show) {
      setAlertOkVisible(true);
      setImagen([]);
      setForm("");
    }
  }

  async function updateProduct() {
    const imageUrl = await postImageFirebase(imagen, product.idProduct);
    const show = await updateProductId(
      form,
      product.idProduct,
      idSeller,
      product.categoryId,
      imageUrl,
    );
    if (show) setAlertOkVisible(true);
  }

  const handleSubmit = async () => {
    const isValid = await validateForm(form, imagen, setErrors);
    if (isValid) {
      setLoading(true);
      if (isEditing) {
        await updateProduct();
      } else {
        await createNewProduct();
      }
      setLoading(false);
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

  const handleLongPress = (index) => {
    Alert.alert("¿Deseas eliminar la imagen?", "Elige una opción:", [
      {
        text: "Eliminar",
        onPress: () => removeImage(index),
      },
      { text: "Cancelar", style: "cancel" },
    ]);
  };

  const removeImage = (index) => {
    const updatedImages = imagen.filter((_, i) => i !== index);
    setImagen(updatedImages);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={30} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <ImageSelector
        imagen={imagen}
        errors={errors}
        handleLongPress={handleLongPress}
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
        title={loading ? "Cargando..." : TEXTS.homeSeller.ADD_PRODUCT}
        disabled={loading}
      />

      <Modal transparent={true} visible={loading} animationType="fade">
        <View style={styles.modalContainer}>
          <ActivityIndicator size="large" color={theme.colors.green} />
          <Text style={styles.loadingText}>Cargando...</Text>
        </View>
      </Modal>

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
          delayLongPress={10}
          onLongPress={() => handleLongPress(index)}
        >
          <Image source={{ uri: uri || " " }} style={HOME_STYLES.imageTop} />
        </TouchableOpacity>
      ))
    ) : (
      // eslint-disable-next-line react-native/no-color-literals, react-native/no-inline-styles
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
  backButton: {
    backgroundColor: theme.colors.greenMedium,
    borderRadius: 18,
    left: 15,
    padding: 5,
    position: "absolute",
    top: 35,
    zIndex: 1,
  },
  container: {
    backgroundColor: Color.colors.grey,
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  halfWidth: {
    flex: 1,
  },
  iconButton: {
    alignItems: "center",
    backgroundColor: Color.colors.greenMedium,
    borderRadius: 5,
    flex: 0.4,
    height: 111,
    justifyContent: "center",
    padding: 10,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  inputColumn: {
    flex: 0.6,
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  loadingText: {
    color: theme.colors.white,
    fontSize: 18,
    marginTop: 10,
  },
  modalContainer: {
    alignItems: "center",
    backgroundColor: theme.colors.backgroundColorBlack,
    flex: 1,
    justifyContent: "center",
  },
  rowContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  stockContainer: {
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default RegisterProducts;
