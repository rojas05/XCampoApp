import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import TabNavigator from "../../components/TabNavigator.jsx";
import { OrderListProducts } from "./GetOrderProducts.js";

// Screens
import Products from "./ProductsScreen.jsx";
import Profile from "./SellerProfileScreen.jsx";
import Pedidos from "./OrdersScreen.jsx";

const nummberOfOrders = OrderListProducts.length;

const HomeSeller = () => {
  const screens = [
    {
      name: "Pedidos",
      component: Pedidos,
      options: {
        headerShown: false,
        tabBarLabel: "Pedidos",
        tabBarIcon: ({ color, size }) => (
          <Entypo name="shopping-cart" size={size} color={color} />
        ),
      },
    },
    {
      name: "Products",
      component: Products,
      options: {
        headerShown: false,
        tabBarLabel: "Productos",
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="add-shopping-cart" size={size} color={color} />
        ),
      },
    },
    {
      name: "Profile",
      component: Profile,
      options: {
        headerShown: false,
        tabBarLabel: "Perfil",
        tabBarIcon: ({ color, size }) => (
          <Entypo name="shop" size={size} color={color} />
        ),
      },
    },
  ];

  return <TabNavigator screens={screens} numberOfOrders={nummberOfOrders} />;
};

export default HomeSeller;
