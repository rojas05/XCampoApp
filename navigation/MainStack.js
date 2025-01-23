import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Screens
import WelcomePage from "../screens/Welcome";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Hello from "../screens/Hello";
import TypeUser from "../screens/TypeUser";
import DrawerContent from "../src/components/DrawerContent";
import Splash from "../screens/Splash";
// client
// import IndexClient from "../screens/client/IndexClient";
import BottomTavClient from "./BottomNabClient";
import DetailStore from "../screens/client/DetailStore";
import DetailProduct from "../screens/client/DetailProduct";
import InfoStore from "../screens/client/InfoStore";
// seller
import RegisterProducts from "../screens/store/RegisterProducts";
import HomeSeller from "../screens/store/HomeSeller";
// delivery
import HomeDelivery from "../screens/delivery/js/HomeDelivery";
import MapDeliveryScreen from "../screens/delivery/MapScreen";
import MapOrderDeliveryScreen from "../screens/delivery/MapDeliveryScreen.jsx";
import ReservedOrdersScreen from "../screens/delivery/ReservedOrdersScreen.jsx";
import OrderAvailableScreen from "../screens/delivery/OrderAvailableScreen.jsx";
import OrderDetail from "../screens/delivery/OrderDetailScreen.jsx";
import DeliveyProfile from "../screens/delivery/DeliveryProfileScreen.jsx";
import DeliverOrderClient from "../screens/delivery/OrderDeliverCustomerScreen.jsx";
// chats
import ChatScreen from "../screens/chats/ChatScreen";
import ChatHeader from "../screens/chats/ChatHeader";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerStyle: { width: 280 },
        drawerType: "slide",
      }}
    >
      <Drawer.Screen
        name="MapScreen"
        component={MapDeliveryScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="OrderAvailableScreen"
        component={OrderAvailableScreen}
        options={{
          title: "Pedidos Disponibles",
          headerTitleAlign: "center",
        }}
      />
      <Drawer.Screen
        name="ReservedOrdersScreen"
        component={ReservedOrdersScreen}
        options={{ title: "Pedidos Reservados", headerTitleAlign: "center" }}
      />
      <Drawer.Screen
        name="DeliveyProfile"
        component={DeliveyProfile}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="WelcomePage"
        screenOptions={{ headerShown: false, detachPreviousScreen: true }}
      >
        <Stack.Screen name="Splash" component={Splash} />

        <Stack.Screen name="WelcomePage" component={WelcomePage} />

        <Stack.Screen name="Hello" component={Hello} />

        <Stack.Screen name="Login" component={Login} />

        <Stack.Screen name="Signup" component={Signup} />

        <Stack.Screen name="TypeUser" component={TypeUser} />

        {/* -------------------------------------------- */}

        <Stack.Screen name="IndexClient" component={BottomTavClient} />

        <Stack.Screen name="DetailProduct" component={DetailProduct} />

        <Stack.Screen name="DetailStore" component={DetailStore} />

        <Stack.Screen name="InfoStore" component={InfoStore} />

        <Stack.Screen name="RegisterProducts" component={RegisterProducts} />

        <Stack.Screen name="HomeSeller" component={HomeSeller} />

        <Stack.Screen name="HomeDelivery" component={HomeDelivery} />

        <Stack.Screen
          name="MapOrderDeliveryScreen"
          component={MapOrderDeliveryScreen}
        />

        <Stack.Screen
          name="DeliverOrderClient"
          component={DeliverOrderClient}
        />

        <Stack.Screen name="OrderDetail" component={OrderDetail} />

        <Stack.Screen name="MainDrawer" component={MainDrawer} />

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
