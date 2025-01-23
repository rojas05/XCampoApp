import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { orders } from "./js/GetOrderStoge";
import { formatPrice } from "../../src/utils/constants";
import Header from "../../src/components/HeaderCustomer";
import theme from "../../src/theme/theme";
import StyledButton from "../../src/styles/StyledButton";
import PaymentSwitch from "../../src/components/PaymentSwitch";

const order = orders[0];

const DeliverOrderClient = ({ navigation }) => {
  const [isPaid, setIsPaid] = useState(false);

  const calculateTotalCost = () =>
    order.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    );

  const totalCost = calculateTotalCost();
  const totalToPay = totalCost + order.shippingCost;

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header
        title={order.fincaName || "Detalle del pedido"}
        onBackPress={handleBackPress}
      />
      <OrderInfo order={order} />
      <ProductList products={order.products} />
      <OrderTotals totalCost={totalCost} totalToPay={totalToPay} />
      <PaymentSwitch isPaid={isPaid} setIsPaid={setIsPaid} />
      <StyledButton
        green
        title="Continuar Entregando"
        onPress={() => navigation.navigate("MapScreen")}
      />
    </View>
  );
};

const OrderInfo = ({ order }) => (
  <View style={styles.infoContainer}>
    <Text style={styles.infoTitle}>Sr {order.userName}</Text>
    <Text style={styles.orderId}>Pedido No: {order.id}</Text>
    <Text style={styles.infoText}>Productos: {order.products.length}</Text>
  </View>
);

const ProductList = ({ products }) => {
  const screenHeight = Dimensions.get("window").height;
  const maxHeight = screenHeight * 0.44;
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <ProductCard product={item} />}
      contentContainerStyle={styles.productList}
      style={{ maxHeight }}
    />
  );
};

const ProductCard = ({ product }) => (
  <View style={styles.productCard}>
    <View style={styles.productHeader}>
      <Text style={styles.productName}>{product.name}</Text>
    </View>
    <View style={styles.productDetails}>
      <Text style={styles.productDetailText}>
        <FontAwesome
          name="shopping-cart"
          size={16}
          color={theme.colors.green}
        />
        {"  "}Cantidad: {product.quantity} {product.unit}
      </Text>
      <Text style={styles.productDetailText}>
        <FontAwesome name="tag" size={16} color={theme.colors.yellow} />
        {"  "}Precio: ${formatPrice(product.price)}
      </Text>
    </View>
  </View>
);

const OrderTotals = ({ totalCost, totalToPay }) => (
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
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  infoContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    elevation: 3,
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: theme.colors.black,
  },
  orderId: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.red,
  },
  infoText: {
    fontSize: 20,
    color: theme.colors.black,
  },
  productList: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  productCard: {
    elevation: 3,
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    marginVertical: 8,
  },
  productHeader: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 8,
    marginBottom: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  productDetails: {
    gap: 5,
  },
  productDetailText: {
    fontSize: 16,
    color: "#555",
  },
  totals: {
    alignSelf: "center",
    marginVertical: 20,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default DeliverOrderClient;
