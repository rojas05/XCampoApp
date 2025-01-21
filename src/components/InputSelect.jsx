import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Color from "../theme/theme";

const CustomPicker = ({ value, setValue, items, error }) => {
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  return (
    <View style={[styles.pickerContainer, error && styles.pickerError]}>
      <Picker
        selectedValue={value}
        onValueChange={(itemValue) => {
          setValue(itemValue);
          setShowPlaceholder(true); // Muestra el placeholder después de seleccionar
        }}
        onFocus={() => setShowPlaceholder(false)} // Oculta el placeholder al interactuar
        style={styles.picker}
      >
        {showPlaceholder && (
          <Picker.Item
            label={error || "Seleccionar Unidad"}
            value=" "
            style={{ color: error ? "red" : "gray" }}
          />
        )}
        {items.map((item, index) => (
          <Picker.Item key={index} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    borderColor: Color.colors.greyMedium,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  pickerError: {
    borderColor: "red",
    borderWidth: 1,
  },
});

export default CustomPicker;
