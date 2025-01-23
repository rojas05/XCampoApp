import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { formatPrice } from "../../src/utils/constants";

const OrderTotals = ({ order, totalCost, totalToPay }) => (
  <View style={styles.totals}>
    <TotalRow
      icon="shopping-bag"
      label={`Total de Productos: ${order.products.length}`}
    />
    <TotalRow icon="money" label={`Costo Total: $${formatPrice(totalCost)}`} />
    <TotalRow
      icon="truck"
      label={`Total a Pagar (incluye envío): $${formatPrice(totalToPay)}`}
    />
  </View>
);

const TotalRow = ({ icon, label }) => (
  <View style={styles.row}>
    <FontAwesome name={icon} size={20} color="#333" />
    <Text style={styles.totalText}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  totals: {
    alignSelf: "center",
    marginVertical: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
  },
});

export default OrderTotals;
