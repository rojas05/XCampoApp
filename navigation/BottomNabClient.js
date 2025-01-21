<<<<<<< HEAD:navigation/BottomNabClient.js
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import React from "react"
import HomeClient from "../screens/client/HomeClient.js";
import ChatClient from "../screens/client/chat.js";
import FavoriteClient from "../screens/client/favoritesClient.js";
import ProfileClient from "../screens/client/porfileClient.js";
import {HomeAlt, HeadsetHelp, Heart, User, Import} from "iconoir-react-native"
import { Text } from "react-native";
import string from "../src/string/string.js";
import StyledText from "../src/styles/StyledText.jsx";
import theme from "../src/theme/theme.js"; 
import Support from "../screens/support.js";
=======
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeClient from "../screens/client/HomeClient";
import FavoriteClient from "../screens/client/favoritesClient";
import ProfileClient from "../screens/client/porfileClient";
import { HomeAlt, HeadsetHelp, Heart, User } from "iconoir-react-native";
import string from "../src/string/string";
import StyledText from "../src/styles/StyledText";
import theme from "../src/theme/theme";
import Support from "../screens/support";
>>>>>>> eb56ae6fa782673cb05f5b18082abb982f32ae4f:navigation/BottomNavClient.js

import { WIDTH_SCREEN, BOTTOM_MARGIN } from "../src/utils/constants.js";

const Tap = createBottomTabNavigator();
<<<<<<< HEAD:navigation/BottomNabClient.js
const BottomTabClient = () => {
=======
const BottomTavClient = () => {
  return (
    <Tap.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.greenOpacity,
          position: "relative",
          bottom: BOTTOM_MARGIN,
          width: WIDTH_SCREEN,
          alignSelf: "center",
          borderRadius: 15,
          elevation: 5,
          height: 55,
        },
      }}
    >
      <Tap.Screen
        name="Home"
        component={HomeClient}
        options={{
          tabBarIcon: () => <HomeAlt width={30} height={30} color={"black"} />,
          title: () => <StyledText bold>{string.client.home}</StyledText>,
        }}
      />
>>>>>>> eb56ae6fa782673cb05f5b18082abb982f32ae4f:navigation/BottomNavClient.js

      <Tap.Screen
        name="Support"
        component={Support}
        options={{
          tabBarIcon: () => (
            <HeadsetHelp width={30} height={30} color={"black"} />
          ),
          title: () => <StyledText bold>{string.client.chat}</StyledText>,
        }}
      />

      <Tap.Screen
        name="Favorite"
        component={FavoriteClient}
        options={{
          tabBarIcon: () => <Heart width={30} height={30} color={"black"} />,
          title: () => <StyledText bold>{string.client.favorite}</StyledText>,
        }}
      />

      <Tap.Screen
        name="Profile"
        component={ProfileClient}
        options={{
          tabBarIcon: () => <User width={30} height={30} color={"black"} />,
          title: () => <StyledText bold>{string.client.profile}</StyledText>,
        }}
      />
    </Tap.Navigator>
  );
};

<<<<<<< HEAD:navigation/BottomNabClient.js
            <Tap.Screen name="Favorite" component={FavoriteClient}
                options={{
                    tabBarIcon: () => <Heart width={30} height={30} color={"black"}/>,
                    title: () => <StyledText bold>{string.client.favorite}</StyledText>
                }}
            />

            <Tap.Screen name="Profile" component={ProfileClient}
                options={{
                    tabBarIcon: () => <User width={30} height={30} color={"black"}/>,
                    title: () => <StyledText bold>{string.client.profile}</StyledText>
                }}
            />

        </Tap.Navigator>
    )

}

export default BottomTabClient;
=======
export default BottomTavClient;
>>>>>>> eb56ae6fa782673cb05f5b18082abb982f32ae4f:navigation/BottomNavClient.js
