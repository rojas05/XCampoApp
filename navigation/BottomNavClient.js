import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import React from "react"
import HomeClient from "../screens/client/HomeClient";
import ChatClient from "../screens/client/chat";
import FavoriteClient from "../screens/client/favoritesClient";
import ProfileClient from "../screens/client/porfileClient";
import {HomeAlt, HeadsetHelp, Heart, User, Import} from "iconoir-react-native"
import { Text } from "react-native";
import string from "../src/string/string";
import StyledText from "../src/styles/StyledText";
import theme from "../src/theme/theme"; 
import Support from "../screens/support";

import { WIDTH_SCREEN, BOTTOM_MARGIN } from "../src/utils/constants.js";


const Tap = createBottomTabNavigator();
const BottomTavClient = () => {

    return(
        <Tap.Navigator 
        screenOptions={{
            headerShown:false,
            tabBarStyle:{
                backgroundColor:theme.colors.greenOpacity,
                position: "relative",
                bottom: BOTTOM_MARGIN,
                width: WIDTH_SCREEN,
                alignSelf: "center",
                borderRadius: 15,
                elevation: 5,
                height: 55,
            }
            
        }}>

            <Tap.Screen name="Home" component={HomeClient}
                options={{
                    tabBarIcon: () => <HomeAlt width={30} height={30} color={"black"}/>,
                    title: () => <StyledText bold>{string.client.home}</StyledText>
                }}
            />

            <Tap.Screen name="Support" component={Support} 
                options={{
                    tabBarIcon: () => <HeadsetHelp width={30} height={30} color={"black"}/>,
                    title: () => <StyledText bold>{string.client.chat}</StyledText>
                }}
            />

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

export default BottomTavClient;