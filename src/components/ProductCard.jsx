import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import theme from "../../src/theme/theme";

const ProductCard = ({ item }) => (
  <View style={styles.productCard}>
    <Text style={styles.productName}>
      {item.id}.{item.name}
    </Text>
    <Text style={styles.productDetailText}>
      <FontAwesome name="shopping-cart" size={16} color={theme.colors.green} />
      {"  "}Cantidad: {item.quantity} {item.unit}
    </Text>
    <Text style={styles.productDetailText}>
      <FontAwesome name="tag" size={16} color={theme.colors.yellow} />
      {"  "}Precio: ${item.price}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  productCard: {
    marginVertical: 5,
    alignItems: "center",
  },
  productName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  productDetailText: {
    fontSize: 18,
    color: "#555",
  },
});

export default ProductCard;
