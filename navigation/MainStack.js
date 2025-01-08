import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import WelcomePage from "../screens/Welcome";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Hello from "../screens/Hello";
import TypeUser from "../screens/TypeUser";
// seller
import RegisterProducts from "../screens/store/RegisterProducts";
import HomeSeller from "../screens/store/HomeSeller";
// delivery
import HomeDelivery from "../screens/delivery/HomeDelivery";
import MapDeliveryScreen from "../screens/delivery/MapScreen";
// chats
import ChatScreen from "../screens/chats/ChatScreen";
import ChatHeader from "../screens/chats/ChatHeader";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="WelcomePage" component={WelcomePage} />

        <Stack.Screen name="Hello" component={Hello} />

        <Stack.Screen name="Login" component={Login} />

        <Stack.Screen name="Signup" component={Signup} />

        <Stack.Screen name="TypeUser" component={TypeUser} />

        {/* -------------------------------------------- */}

        <Stack.Screen name="RegisterProducts" component={RegisterProducts} />

        <Stack.Screen name="HomeSeller" component={HomeSeller} />

        <Stack.Screen name="HomeDelivery" component={HomeDelivery} />

        <Stack.Screen name="MapScreen" component={MapDeliveryScreen} />

        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={({ navigation }) => ({
            headerShown: true,
            header: () => <ChatHeader navigation={navigation} />,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
