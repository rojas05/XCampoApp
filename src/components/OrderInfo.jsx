import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { formatPrice } from "../../src/utils/constants";
import ProductCard from "./ProductCard";
import Divider from "./Divider";

const OrderInfo = ({ order, totalCost }) => (
  <View style={styles.infoContainer}>
    <Text style={styles.infoTitle}>Pedido No. {order.id}</Text>
    <Text style={styles.orderId}>{order.products.length} Productos</Text>
    <Divider />
    {order.products.map((item) => (
      <ProductCard key={item.id} item={item} />
    ))}
    <Divider />
    <Text style={styles.orderId}>Total: ${formatPrice(totalCost)}</Text>
  </View>
);

const styles = StyleSheet.create({
  infoContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    elevation: 3,
    marginBottom: 8,
    alignItems: "center",
  },
  infoTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  orderId: {
    marginTop: 8,
    fontSize: 20,
  },
});

export default OrderInfo;
