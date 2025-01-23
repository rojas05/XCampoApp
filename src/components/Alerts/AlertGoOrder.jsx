import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import StyledButton from "../../styles/StyledButton";
import theme from "../../theme/theme";
import { formatPrice } from "../../utils/constants";

const AlertGoOrder = ({ orders, isVisible }) => {
  const navigation = useNavigation();
  const stops = orders.paradas;
  const [isHidden, setIsHidden] = useState(true);

  const toggleVisibility = () => {
    setIsHidden((prev) => !prev);
    isVisible(false);
  };

  const totalAmount = stops.reduce((total, order) => total + order.total, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.clientText}>{orders.nombre}</Text>

      {!isHidden && <Text style={styles.orderTextTitle}># Pedido 763</Text>}

      <View style={styles.stopsContainer}>
        {stops.map((order, index) => (
          <View style={styles.orderDetails} key={order.id}>
            <Text style={styles.orderTextBold}>
              Pedido {index + 1}:{" "}
              <Text style={styles.orderText}>
                {order.productos.length} productos / ${formatPrice(order.total)}
              </Text>
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("DeliverOrderClient")}
            >
              <Text style={styles.viewLink}>Ver</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {!isHidden && (
        <>
          <Text style={styles.amountText}>
            Cobrar ${formatPrice(totalAmount)}
          </Text>
          <Text style={styles.reminderText}>
            ¡Recuerda entregar el pedido correcto al cliente!
          </Text>
        </>
      )}

      <StyledButton
        green
        title={isHidden ? "Ir a la finca" : "Vamos"}
        onPress={
          isHidden
            ? () => navigation.navigate("MapOrderDeliveryScreen")
            : toggleVisibility
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 12,
    width: "93%",
    shadowRadius: 6,
    elevation: 8,
    alignItems: "center",
  },
  floatingBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  clientText: {
    color: theme.colors.greenText,
    fontWeight: "bold",
    fontSize: 28,
    marginBottom: 10,
  },
  orderTextTitle: {
    color: theme.colors.green,
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 15,
  },
  stopsContainer: {
    width: "100%",
    marginBottom: 15,
  },
  orderDetails: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  orderText: {
    fontWeight: "normal",
    fontSize: 20,
    color: "#555",
  },
  orderTextBold: {
    color: "black",
    fontSize: 22,
    fontWeight: "bold",
  },
  viewLink: {
    fontSize: 20,
    color: theme.colors.black,
    textDecorationLine: "underline",
  },
  amountText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  reminderText: {
    fontSize: 19,
    color: "gray",
    textAlign: "center",
    marginBottom: 8,
  },
});

export default AlertGoOrder;
