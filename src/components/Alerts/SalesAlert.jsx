import React from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import theme from "../../theme/theme.js";

const SalesAlert = ({
  visible,
  onClose,
  productName,
  productId,
  totalSales,
}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Título */}
          <Text style={styles.title}>Ventas del Producto</Text>

          {/* Información del producto */}
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{productName}</Text>
            <Text style={styles.productId}>ID: {productId}</Text>
          </View>

          {/* Total de ventas */}
          <View style={styles.salesContainer}>
            <Text style={styles.salesLabel}>Total de Ventas:</Text>
            <Text style={styles.salesValue}>{totalSales} Unidades</Text>
          </View>

          {/* Botón de cierre */}
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.greenMedium,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContent: {
    alignItems: "center",
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  modalOverlay: {
    alignItems: "center",
    backgroundColor: theme.colors.backgroundColor,
    flex: 1,
    justifyContent: "center",
  },
  productId: {
    color: theme.colors.greyBlack,
    fontSize: 14,
  },
  productInfo: {
    alignItems: "center",
    marginBottom: 20,
    textAlign: "center",
  },
  productName: {
    color: theme.colors.black,
    fontSize: 20,
    fontWeight: "bold",
    padding: 2,
  },
  salesContainer: {
    alignItems: "center",
    borderColor: theme.colors.greenLiht,
    borderRadius: 8,
    borderWidth: 2,
    marginBottom: 20,
    padding: 15,
    width: "100%",
  },
  salesLabel: {
    color: theme.colors.greyDark,
    fontSize: 16,
  },
  salesValue: {
    color: theme.colors.greenMedium,
    fontSize: 24,
    fontWeight: "bold",
  },
  title: {
    color: theme.colors.greenMedium,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default SalesAlert;
