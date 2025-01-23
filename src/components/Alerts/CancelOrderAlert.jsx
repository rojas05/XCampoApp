import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import theme from "../../theme/theme";

const OrderCancelModal = ({ isVisible, onConfirm, orderId, closeModal }) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={closeModal}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.text}>
            Si Cancelas el pedido te afectara en tus proximas ordenes {"\n"}
            ¿Estás seguro de que deseas cancelar el pedido #{orderId}?
          </Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 10,
    lineHeight: 24,
  },
  buttonsContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-evenly",
    width: "100%",
  },
  cancelButton: {
    width: "45%",
    backgroundColor: theme.colors.redLinht,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  confirmButton: {
    width: "45%",
    backgroundColor: theme.colors.redLinht,
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default OrderCancelModal;
