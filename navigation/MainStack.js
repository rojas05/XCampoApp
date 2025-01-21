import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import WelcomePage from "../screens/Welcome";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Hello from "../screens/Hello";
import TypeUser from "../screens/TypeUser";
<<<<<<< HEAD
import Splash from "../screens/Splash";
import IndexClient from "../screens/client/IndexClient";
import BottomTavClient from "./BottomNabClient";
import DetailStore from "../screens/client/DetailStore"
import DetailProduct from "../screens/client/DetailProduct"
import InfoStore from "../screens/client/InfoStore"
=======
// seller
import RegisterProducts from "../screens/store/RegisterProducts";
import HomeSeller from "../screens/store/HomeSeller";
// delivery
import HomeDelivery from "../screens/delivery/HomeDelivery";
import MapDeliveryScreen from "../screens/delivery/MapScreen";
// chats
import ChatScreen from "../screens/chats/ChatScreen";
import ChatHeader from "../screens/chats/ChatHeader";
>>>>>>> eb56ae6fa782673cb05f5b18082abb982f32ae4f

const Stack = createNativeStackNavigator();

const MainStack = () => {
<<<<<<< HEAD
    return(
        <NavigationContainer>
            <Stack.Navigator 
            screenOptions={{
                headerShown:false,
                detachPreviousScreen: true,
                }}>

            <Stack.Screen
                name="Splash"
                component={Splash}
                />
=======
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="WelcomePage" component={WelcomePage} />
>>>>>>> eb56ae6fa782673cb05f5b18082abb982f32ae4f

        <Stack.Screen name="Hello" component={Hello} />

        <Stack.Screen name="Login" component={Login} />

        <Stack.Screen name="Signup" component={Signup} />

        <Stack.Screen name="TypeUser" component={TypeUser} />

        {/* -------------------------------------------- */}

<<<<<<< HEAD
            <Stack.Screen
                name="IndexClient"
                component={BottomTavClient}
                />

            <Stack.Screen
                name="DetailProduct"
                component={DetailProduct}
                />

            <Stack.Screen
                name="DetailStore"
                component={DetailStore}
                />

            <Stack.Screen
                name="InfoStore"
                component={InfoStore}
                />
=======
        <Stack.Screen name="RegisterProducts" component={RegisterProducts} />
>>>>>>> eb56ae6fa782673cb05f5b18082abb982f32ae4f

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
