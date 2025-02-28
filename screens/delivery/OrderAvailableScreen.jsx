import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

import OrderItem from "./OrderItemComponent";
import { HOME_STYLES } from "../../src/utils/constants";
import LoadingView from "../../src/components/loading";
import NoDataView from "../../src/components/NotDataView";
/* Services */
import { getDeliveryProductsState } from "../../services/DeliveryProduct";
import OrderItemTimes from "./js/OrderItemTimes";

const OrderComponent = ({ orders }) => {
  const navigation = useNavigation();
  const { timeLefts } = OrderItemTimes(orders);

  const onViewOrder = (order) => {
    navigation.navigate("OrderDetail", {
      order,
      context: "OrderAvailableScreen",
    });
  };

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <OrderItem
          item={item}
          timeLeft={timeLefts[item.id]?.timeLeft}
          status={timeLefts[item.id]?.status}
          isStarted={timeLefts[item.id]?.isStarted}
          onViewOrder={onViewOrder}
          displayMode="view"
        />
      )}
    />
  );
};

const OrderAvailableScreen = () => {
  const [orders, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        setIsLoading(true);
        const deliveryList = await getDeliveryProductsState("disponible");

        const formattedOrders = deliveryList.map((item) => ({
          id: `ORD-${item.idDelivery}`,
          fincaName: item.sellerName,
          stops: item.stops,
          userName: item.userName,
          shippingCost: item.deliveryCost,
          products: item.products,
        }));

        setOrder(formattedOrders);
      } catch (error) {
        console.error("Error loading orders:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrderList();
  }, []);

  if (isLoading) return <LoadingView />;
  if (!orders?.length)
    return (
      <View style={HOME_STYLES.container}>
        <NoDataView dataText="envios" />
      </View>
    );

  return (
    <View style={HOME_STYLES.containerBasic}>
      <OrderComponent orders={orders} />
    </View>
  );
};

export default OrderAvailableScreen;
