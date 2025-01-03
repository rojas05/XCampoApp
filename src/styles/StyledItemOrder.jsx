import { DeliveryTruck, DoubleCheck, HomeAlt } from "iconoir-react-native"
import React from "react"
import { Text, View, StyleSheet } from "react-native"
import StyledText from "./StyledText"
import theme from "../theme/theme"

const StyledItemOrder = () =>{

    return(
        <View style={styles.item}>

            <View style={styles.circle}></View>

            <StyledText bold title>N.O 12345</StyledText>

            <Text>Fecha</Text>

            <StyledText bold title>15/03/2020</StyledText>

            <StyledText>Estado</StyledText>

            <View style={styles.containerState}>
                <View style={styles.stateItem}>
                    <HomeAlt width={30} height={30} color={"black"}/>
                    <View style={styles.color}>
                    </View>
                </View>

                <View style={styles.stateItem}>
                    <DeliveryTruck width={30} height={30} color={"black"}/>
                    <View style={styles.colorN}>
                    </View>
                </View>

                <View style={styles.stateItem}>
                    <DoubleCheck width={30} height={30} color={"black"}/>
                    <View style={styles.colorN}>
                    </View>
                </View>
            </View>

    </View>               
    )
}

const styles = StyleSheet.create({
    item:{
        borderWidth: 1,
        borderColor: "gray",
        width: 150,
        height: 180,
        alignItems:"center",
        padding: 15,
        borderRadius: 10,
        margin:5
    },
    containerState:{
        flexDirection:"row"
    },
    stateItem:{
        width:40,
        height:40,
        borderWidth: 1,
        borderColor: "gray",
        alignItems:"center"
    },
    color:{
        width:38,
        height:8,
        backgroundColor:"green",
        borderTopWidth: 1,
        borderTopColor: "gray"
    },
    colorN:{
        width:38,
        height:8,
        backgroundColor:theme.colors.greenOpacity,
        borderTopWidth: 1,
        borderTopColor: "gray"
    },
    circle:{
        width:15,
        height:15,
        borderWidth: 1,
        borderRadius:8,
        position:"absolute",
        top: 2,
        right: 2,
        backgroundColor: theme.colors.red
    }
})

export default StyledItemOrder