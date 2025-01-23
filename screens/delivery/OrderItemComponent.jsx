import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { formatPrice } from "../../src/utils/constants";
import TimeAlert from "../../src/styles/StyledTimeAlert";
import theme from "../../src/theme/theme";

const OrderItem = ({
  item,
  timeLeft,
  status,
  isStarted,
  onViewOrder,
  onCancelOrder,
  displayMode,
}) => {
  const shouldDisplay = (mode) =>
    !displayMode || displayMode === "both" || displayMode === mode;

  const totalProducts = item.products.reduce(
    (total, product) => total + product.quantity * product.price,
    0,
  );

  const totalToPay = totalProducts + item.shippingCost;

  return (
    <View style={styles.orderView}>
      <Text style={styles.titleText}>Pedido ID: {item.id}</Text>
      <OrderDetails
        item={item}
        totalToPay={totalToPay}
        totalProducts={totalProducts}
      />

      {shouldDisplay("time") && (
        <TimeAlert timeLeft={timeLeft} status={status} isStarted={isStarted} />
      )}

      <View style={styles.buttonContainer}>
        {shouldDisplay("view") && (
          <OrderButton
            title="Ver Pedido"
            onPress={() => onViewOrder(item)}
            style={styles.viewOrderButton}
          />
        )}
        {shouldDisplay("cancel") && (
          <OrderButton
            title="Cancelar Pedido"
            onPress={() => onCancelOrder(item.id)}
            style={styles.cancelOrderButton}
          />
        )}
      </View>
    </View>
  );
};

const OrderDetails = ({ item, totalToPay, totalProducts }) => (
  <>
    <Text style={styles.infoText}>
      Órdenes: <Text style={styles.boldText}>{item.orders}</Text> | Paradas:{" "}
      <Text style={styles.boldText}>{item.stops}</Text> | Distancia:{" "}
      <Text style={styles.boldText}>{item.distance} Km</Text>
    </Text>
    <Text style={styles.infoText}>
      Total a pagar:{" "}
      <Text style={styles.boldText}>${formatPrice(totalToPay)}</Text>
    </Text>
    <Text style={styles.infoText}>
      Total de productos:{" "}
      <Text style={styles.boldText}>${formatPrice(totalProducts)}</Text>
    </Text>
  </>
);

const OrderButton = ({ title, onPress, style }) => (
  <TouchableOpacity style={style} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  orderView: {
    alignSelf: "center",
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.red,
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    width: "95%",
    marginVertical: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: theme.colors.textPrimary,
  },
  infoText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginVertical: 2,
  },
  boldText: {
    fontWeight: "bold",
    color: theme.colors.textPrimary,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  viewOrderButton: {
    backgroundColor: theme.colors.green,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: "center",
  },
  cancelOrderButton: {
    backgroundColor: theme.colors.red,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OrderItem;
