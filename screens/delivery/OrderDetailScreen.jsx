import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Header from "../../src/components/HeaderCustomer";
import OrderInfo from "../../src/components/OrderInfo";
import OrderTotals from "../../src/components/OrderTotals";
import PaymentSwitch from "../../src/components/PaymentSwitch";
import StyledButton from "../../src/styles/StyledButton";
import { MARGINS } from "../../src/utils/constants";

const OrderDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const [isPaid, setIsPaid] = useState(false);
  const { order } = route.params || {};

  const calculateTotalCost = () =>
    order.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    );

  const totalCost = calculateTotalCost();
  const totalToPay = totalCost + order.shippingCost;

  const handleBackPress = () => {
    navigation.navigate("MapOrderDeliveryScreen", { activateAlert: true });
  };

  return (
    <View style={styles.container}>
      <Header
        title={order.fincaName || "Detalle del pedido"}
        onBackPress={handleBackPress}
      />

      <OrderInfo order={order} totalCost={totalCost} />

      <View style={styles.footerContainer}>
        <OrderTotals
          order={order}
          totalCost={totalCost}
          totalToPay={totalToPay}
        />
        <PaymentSwitch isPaid={isPaid} setIsPaid={setIsPaid} />
        <StyledButton green title="Aceptar pedido" onPress={handleBackPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  footerContainer: {
    position: "absolute",
    bottom: MARGINS.default,
    left: 5,
    right: 5,
  },
});

export default OrderDetailScreen;
