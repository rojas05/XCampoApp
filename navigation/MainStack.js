import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import WelcomePage from "../screens/Welcome";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Hello from "../screens/Hello";
import TypeUser from "../screens/TypeUser";


const Stack = createNativeStackNavigator()

const MainStack = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator 
            screenOptions={{headerShown:false}}>

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


            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack