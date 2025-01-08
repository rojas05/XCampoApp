import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { WIDTH_SCREEN, BOTTOM_MARGIN } from "../utils/constants.js";
import theme from "../theme/theme.js";

const Tab = createBottomTabNavigator();

const TabNavigator = ({ screens, numberOfOrders }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: "relative",
          bottom: BOTTOM_MARGIN,
          width: WIDTH_SCREEN,
          alignSelf: "center",
          backgroundColor: "white",
          borderRadius: 15,
          elevation: 5,
          height: 55,
        },
        tabBarLabelPosition: "below-icon",
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: "bold",
          textAlign: "center",
          paddingTop: 3,
        },
        tabBarBadgeStyle: {
          color: "white",
          backgroundColor: theme.colors.red,
          fontWeight: "bold",
          textAlignVertical: "center",
        },
        tabBarInactiveTintColor: theme.colors.greenMedium,
        tabBarActiveTintColor: theme.colors.green,
      }}
    >
      {screens.map(({ name, component, options }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            ...options,
            tabBarBadge: name === "Pedidos" ? numberOfOrders : undefined,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigator;
