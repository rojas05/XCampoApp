import React from "react";
import TabNavigator from "../../components/TabNavigator.jsx";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import orders from "./ReservedOrdersScreen.jsx";
import Map from "./MapScreen.jsx";

const HomeDelivery = () => {
  const screens = [
    {
      name: "ReservedOrders",
      component: orders,
      options: {
        headerShown: false,
        tabBarLabel: "Pedidos Reservados",
        tabBarIcon: ({ color, size }) => (
          <Entypo name="shopping-cart" size={size} color={color} />
        ),
      },
    },
    {
      name: "Ruta",
      component: Map,
      options: {
        headerShown: false,
        tabBarLabel: "Ruta",
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="add-shopping-cart" size={size} color={color} />
        ),
      },
    },
  ];

  return <TabNavigator screens={screens} />;
};

export default HomeDelivery;
