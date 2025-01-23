import React, { useState, useCallback } from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import { CustomInput } from "../../components/InputCustom";
import StyledButton from "../../styles/StyledButton";
import theme from "../../theme/theme";
import { orders } from "../../../screens/delivery/js/GetOrderStoge";

const useForm = (initialState) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.code) {
      newErrors.code = "El campo de verificación está vacío";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    form,
    errors,
    handleInputChange,
    validateForm,
  };
};

const AlertInputCodeOrder = ({ navegation, isVisible, closeModal }) => {
  const { form, errors, handleInputChange, validateForm } = useForm({
    code: "",
  });

  const handleSubmit = useCallback(() => {
    if (validateForm()) {
      navegation.navigate("OrderDetail", {
        order: orders[0],
        activateAlert: true,
      });
      closeModal();
    }
  }, [validateForm, navegation, closeModal]);

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={closeModal}
    >
      <View style={theme.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.text}>Introduce el código de la finca</Text>
          <CustomInput
            value={form.code}
            placeholder="Ingresa código de verificación"
            onChangeText={(value) => handleInputChange("code", value)}
            errorMessage={errors.code}
            style={styles.input}
          />
          <StyledButton
            style={styles.buttonsContainer}
            title="Confirmar"
            onPress={handleSubmit}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: theme.colors.white,
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
  },
  buttonsContainer: {
    width: "100%",
    marginBottom: 0,
  },
});

export default AlertInputCodeOrder;
