import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  Alert,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const CustomAlert = ({ visible, onClose, onCamera, onGallery }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          <Text style={styles.title}>Seleccionar Imagen</Text>
          <TouchableOpacity style={styles.optionButton} onPress={onCamera}>
            <FontAwesome name="camera" size={24} color="black" />
            <Text style={styles.optionText}>Tomar Foto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={onGallery}>
            <FontAwesome name="photo" size={24} color="black" />
            <Text style={styles.optionText}>Elegir de Galería</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, styles.cancelButton]}
            onPress={onClose}
          >
            <Text style={styles.optionText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const AlertOk = ({ visible, messege, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          <Text style={styles.title}>{messege}</Text>
          <Image
            source={require("../../assets/checkList.png")}
            style={styles.image}
          />
          <TouchableOpacity style={[styles.optionButton]} onPress={onClose}>
            <Text style={styles.optionText}>Aceptar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const handleLongPress = (index, imagen, setImagen) => {
  Alert.alert(
    "¿Deseas eliminar la imagen?",
    "Selecciona una opción",
    [
      {
        text: "Eliminar",
        onPress: () => {
          const newImagen = imagen.filter((_, i) => i !== index);
          setImagen(newImagen);
        },
      },
      {
        text: "Cancelar",
        style: "cancel",
      },
    ],
    { cancelable: true },
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  alertContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  optionButton: {
    width: "100%",
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#98d187",
    alignItems: "center",
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: "#f1948a",
  },
  optionText: {
    fontSize: 16,
    color: "#000",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    resizeMode: "cover",
    marginBottom: 10,
  },
});

export { CustomAlert, AlertOk, handleLongPress };
