import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign"; // Librería para iconos

import { STYLES_HOMESELLER } from "../../src/utils/constants.js";
import { OrderListProducts } from "./GetOrderProducts.js";
import { AlertOk } from "../../src/components/CustomAlert.jsx";
import StyledButton from "../../src/styles/StyledButton.jsx";
import theme from "../../src/theme/theme.js";

const OrdersScreen = ({ navigation }) => {
  // eslint-disable-next-line no-unused-vars
  const [orders, setOrders] = useState(OrderListProducts);
  const [isAlertOkVisible, setAlertOkVisible] = useState(false);

  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedOrderId((prevId) => (prevId === id ? null : id));
  };

  const handleSubmit = () => {
    setAlertOkVisible(true);
  };

  const renderProduct = (product) => (
    <Text style={styles.productText} key={product.name}>
      {`- ${product.name} x ${product.unit} a $${product.price} (${product.quantity} ${product.unit}) \n Total = $${(product.price * product.quantity).toFixed(2)}`}
    </Text>
  );

  const renderOrder = (order, isLast) => (
    <View
      style={[styles.orderContainer, isLast && styles.lastOrderContainer]}
      key={order.id}
    >
      <View style={styles.chatButtonContainer}>
        <View style={{ flexDirection: "column", flex: 1 }}>
          <Text style={styles.orderId}>Pedido No.{order.id}</Text>
          <Text style={styles.orderTotal}>
            Total de artículos: {order.totalItems}
          </Text>
          <Text style={styles.orderTotal}>Precio total: ${order.total}</Text>
        </View>

        <TouchableOpacity
          style={styles.chatButton}
          onPress={() => navigation.navigate("ChatScreen")}
        >
          <Ionicons
            name="chatbubble-outline"
            size={20}
            color={theme.colors.black}
          />
          <Text style={styles.buttonText}> Chat</Text>
        </TouchableOpacity>
      </View>

      {isLast || expandedOrderId === order.id ? (
        <>
          <Text style={styles.sectionTitle}>Productos</Text>
          <View style={styles.productsList}>
            {order.products.map((product) => renderProduct(product))}
          </View>
          <View style={styles.buttonsContainer}>
            <StyledButton
              yellow
              textBlack
              onPress={handleSubmit}
              title="Entregar Pedido"
            />
            <StyledButton
              green
              textBlack
              //onPress={handleSubmit}
              title="Total a Cobrar"
            />
          </View>
          {!isLast && (
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => toggleExpand(order.id)}
            >
              <AntDesign name="caretup" size={15} color="black" />
              <Text style={styles.toggleButtonText}>Mostrar Menos</Text>
            </TouchableOpacity>
          )}
        </>
      ) : (
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => toggleExpand(order.id)}
        >
          <AntDesign name="caretdown" size={15} color="black" />
          <Text style={styles.toggleButtonText}>Ver Más</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={STYLES_HOMESELLER.container}>
      <Text style={styles.title}>Productos</Text>
      <ScrollView contentContainerStyle={STYLES_HOMESELLER.scrollContainer}>
        {renderOrder(orders[0], true)}
        {orders.slice(1).map((order) => renderOrder(order, false))}
      </ScrollView>
      {/* Alert */}
      <AlertOk
        visible={isAlertOkVisible}
        messege="¡Pedido entregado exitosamenete!"
        onClose={() => setAlertOkVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  orderContainer: {
    backgroundColor: "#C8E6C9",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
  },
  lastOrderContainer: {
    borderColor: "#4CAF50",
    borderWidth: 2,
  },
  orderId: {
    color: theme.colors.red,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  orderTotal: {
    fontSize: 16,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  productsList: {
    marginTop: 5,
  },
  productText: {
    fontSize: 14,
    marginBottom: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 10,
  },
  chatButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: theme.colors.black,
    fontWeight: "bold",
  },
  chatButton: {
    borderBlockColor: "#000",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  toggleButton: {
    borderBlockColor: "#000",
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    width: "100%",
  },
  toggleButtonText: {
    color: "#000",
    fontWeight: "bold",
    marginStart: 8,
  },
});

export default OrdersScreen;
