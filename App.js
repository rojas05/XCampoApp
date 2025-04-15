import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import MainStack from "./navigation/MainStack";
import BottomTabClient from "./navigation/BottomNabClient";
import { navigationRef } from "./src/utils/RootNavigation";
import { RoutesProvider } from "./screens/delivery/context/RoutesContext";

export default function App() {
  return (
    <RoutesProvider>
      <NavigationContainer ref={navigationRef}>
        <StatusBar style="light" hidden={true} translucent={true} />
        <MainStack>
          <BottomTabClient></BottomTabClient>
        </MainStack>
      </NavigationContainer>
    </RoutesProvider>
  );
}
