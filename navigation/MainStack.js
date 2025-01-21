import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import WelcomePage from "../screens/Welcome";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Hello from "../screens/Hello";
import TypeUser from "../screens/TypeUser";
import Splash from "../screens/Splash";
import IndexClient from "../screens/client/IndexClient";
import BottomTavClient from "./BottomNabClient";
import DetailStore from "../screens/client/DetailStore"
import DetailProduct from "../screens/client/DetailProduct"
import InfoStore from "../screens/client/InfoStore"


const Stack = createNativeStackNavigator()

const MainStack = () => {
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

            <Stack.Screen
                name="WelcomePage"
                component={WelcomePage}
                />

            <Stack.Screen
                name="Hello"
                component={Hello}
                
                />

            <Stack.Screen
                name="Login"
                component={Login}
                />

            <Stack.Screen
                name="Signup"
                component={Signup}
                />

            <Stack.Screen
                name="TypeUser"
                component={TypeUser}
                />

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

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack