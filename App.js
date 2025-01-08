import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import Welcome from "./src/screens/Welcome";
// seller
import RegisterProducts from "./src/screens/seller/RegisterProducts";
import HomeSeller from "./src/screens/seller/HomeSeller";
// delivery
import HomeDelivery from "./src/screens/delivery/HomeDelivery";
import MapScreen from "./src/screens/delivery/MapScreen";
// chats
import ChatScreen from "./src/screens/chats/ChatScreen";
import ChatHeader from "./src/screens/chats/ChatHeader";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterProducts"
          component={RegisterProducts}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeSeller"
          component={HomeSeller}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeDelivery"
          component={HomeDelivery}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={({ navigation }) => ({
            header: () => <ChatHeader navigation={navigation} />,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
