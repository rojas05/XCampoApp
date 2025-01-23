import React from "react";
import { View, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

import OrderItem from "./OrderItemComponent";
import OrderItemTimes from "./js/OrderItemTimes";
import { HOME_STYLES } from "../../src/utils/constants";
import { orders } from "./js/GetOrderStoge";

const OrderComponent = ({ orders }) => {
  const navigation = useNavigation();
  const { timeLefts } = OrderItemTimes(orders);

  const onViewOrder = (order) => {
    navigation.navigate("OrderDetail", { order });
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
  return (
    <View style={HOME_STYLES.containerBasic}>
      <OrderComponent orders={orders} />
    </View>
  );
};

export default OrderAvailableScreen;
