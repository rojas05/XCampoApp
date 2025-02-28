import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

/* Services */
import { postDeliveryProduct } from "../../../services/DeliveryProduct.js";

import theme from "../../theme/theme.js";
import StyledButton from "../../styles/StyledButton.jsx";
import { formatPrice } from "../../utils/constants.js";
import { generateDeliveryCode } from "../../../funcions/KeyOrder.js";

const OrderItem = React.memo(
  ({
    order,
    navigation,
    handleAcceptOrder,
    handleCancelOrder,
    setAlertVisible,
    setDeliveryCode,
    ...props
  }) => {
    const [fadeAnim] = useState(new Animated.Value(1));

    const productsData = React.useMemo(
      () =>
        order.shoppingCartId.cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      [order.shoppingCartId.cartItems],
    );

    async function acceptOrder(idOrder) {
      const stockUpdated = await props.handleUpdateStock(productsData);
      if (stockUpdated === false) {
        console.warn("Stock no actualizado, no se puede aceptar el pedido.");
        return;
      }
      // Primera animación: desvanecer
      await new Promise((resolve) => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(resolve);
      });

      // Ejecutar lógica después de la animación
      await handleAcceptOrder(idOrder);

      // Segunda animación: volver a aparecer
      await new Promise((resolve) => {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start(resolve);
      });

      await postDeliveryProduct(idOrder); // falta agregar la coordena del cliente o destino
    }

    const showKeyDelivery = (idOrder) => {
      let key = generateDeliveryCode(idOrder);
      setDeliveryCode(key);
      setAlertVisible(true);
    };

    return (
      <Animated.View style={[styles.orderContainer, { opacity: fadeAnim }]}>
        <OrderHeader
          order={order}
          onChatPress={() => navigation.navigate("ChatScreen")}
        />

        <Text style={styles.sectionTitle}>Productos</Text>
        <FlatList
          data={order.shoppingCartId.cartItems}
          keyExtractor={(product) => product.productId.toString()}
          renderItem={({ item: product }) => (
            <ProductItem
              product={product}
              productDetails={props.productDetails[product.productId]}
            />
          )}
        />

        {order.state === "CANCELADA" ? (
          <StyledButton red disabled title="Pedido Rechado" />
        ) : order.state === "ACEPTADA" ? (
          <View style={styles.buttonsContainer}>
            <StyledButton
              yellow
              textBlack
              onPress={() => showKeyDelivery(order.idOrder)}
              title="Entregar Pedido"
            />
            <StyledButton
              green
              textBlack
              onPress={() => console.log("Press")}
              title="Total a Cobrar"
            />
          </View>
        ) : (
          <>
            <StyledButton
              yellow
              textBlack
              onPress={() => acceptOrder(order.idOrder)}
              title="Aceptar Pedido"
            />
            <StyledButton
              red
              onPress={() => handleCancelOrder(order.idOrder)}
              title="Rechazar Pedido"
            />
          </>
        )}
      </Animated.View>
    );
  },
);
OrderItem.displayName = "OrderItem";

const OrderHeader = ({ order, onChatPress }) => (
  <View style={styles.headerContainer}>
    <View style={styles.headerInfo}>
      <Text style={styles.orderId}>Pedido No.{order.idOrder}</Text>
      <Text style={styles.orderTotal}>
        Total de artículos: {order.shoppingCartId?.cartItems?.length || 0}
      </Text>
      <Text style={styles.orderTotal}>
        Precio total: ${formatPrice(order.shoppingCartId.totalEarnings)}
      </Text>
      <Text style={styles.orderTotal}>
        <Text style={styles.delivery}>Repartidor: </Text>
        {order.delivery === true
          ? "Viene en camino un repartidor"
          : "A espera de un reaprtidor"}
      </Text>
    </View>
    <TouchableOpacity style={styles.chatButton} onPress={onChatPress}>
      <Ionicons
        name="chatbubble-outline"
        size={20}
        color={theme.colors.black}
      />
      <Text style={styles.buttonText}> Chat</Text>
    </TouchableOpacity>
  </View>
);

const ProductItem = React.memo(({ product, productDetails }) => {
  if (!productDetails)
    return <Text style={styles.productText}>Cargando producto...</Text>;

  const { name, measurementUnit, price } = productDetails;
  return (
    <Text style={styles.productText} key={product.productId}>
      {`- ${name} x ${measurementUnit} 
         Precio por unidad: $${formatPrice(price)}
         Cantida: ${product.quantity} ${measurementUnit} 
         Total = $${formatPrice(product.unitPrice)}`}
    </Text>
  );
});
ProductItem.displayName = "ProductItem";

const styles = StyleSheet.create({
  buttonText: {
    color: theme.colors.black,
    fontWeight: "bold",
  },
  buttonsContainer: {
    alignSelf: "center",
    flexDirection: "row",
    marginTop: 10,
  },
  chatButton: {
    alignItems: "center",
    borderBlockColor: theme.colors.black,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  delivery: {
    color: theme.colors.red,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  headerInfo: {
    flex: 1,
  },
  orderContainer: {
    backgroundColor: theme.colors.greenLiht,
    borderColor: theme.colors.green,
    borderRadius: 8,
    borderWidth: 2,
    elevation: 3,
    marginBottom: 28,
    marginHorizontal: 15,
    padding: 15,
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
  productText: {
    fontSize: 14,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 10,
  },
});

export default OrderItem;
