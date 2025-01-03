import React from "react";
import { View, Text, StyleSheet, Pressable,FlatList,} from "react-native";
import Constants from "expo-constants"
import { DeliveryTruck, DoubleCheck, HomeAlt, PlusCircle, SendDiagonal, Xmark } from "iconoir-react-native";
import StyledText from "../../src/styles/StyledText";
import theme from "../../src/theme/theme";
import StyledItemProductCart from "../../src/styles/styledItemProductCar";

const DetailOrder = () =>{

    const items = Array.from({ length: 11 }, (_, index) => `Item ${index + 1}`);

    const renderItemC = ({ item }) => (
        <StyledItemProductCart></StyledItemProductCart>
    );

    return(

        <View style={styles.container}>
            
            <View style={styles.header}>
                <Pressable>
                    <Xmark width={30} height={30} color={"black"}/> 
                </Pressable>
                <StyledText title bold>N.O 1234567890</StyledText>
                <Pressable>
                    <SendDiagonal width={30} height={30} color={"black"}/>
                </Pressable>
            </View>

            <StyledText title bold>Estado de la orden</StyledText>

            <View style={styles.containerState}>
                <View style={styles.stateItem}>
                    <HomeAlt width={40} height={40} color={"black"}/>
                    <View style={styles.color}>
                    </View>
                </View>

                <View style={styles.stateItem}>
                    <DeliveryTruck width={40} height={40} color={"black"}/>
                    <View style={styles.colorN}>
                    </View>
                </View>

                <View style={styles.stateItem}>
                    <DoubleCheck width={40} height={40} color={"black"}/>
                    <View style={styles.colorN}>
                    </View>
                </View>
            </View>

            <View style={styles.containerCar}>

                <StyledText title bold>Productos</StyledText>

                <FlatList
                data={items}
                renderItem={renderItemC}
                keyExtractor={(item, index) => index.toString()}
                columnWrapperStyle={styles.columnWrapper} // Espaciado entre columnas
                width="100%"
            />

            </View>


        </View>

    )

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop: Constants.statusBarHeight
    },
    header:{
        width:"100%",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-around",
        marginBottom: 15
    },
    ScrollView:{
        marginTop:20
    },
    buttonPlus:{
        backgroundColor: theme.colors.grey,
        width: "30%",
        alignItems:"center",
        padding:2,
        borderRadius:5,
        marginStart:"35%"
    },
    buttonAdd:{
        flexDirection:"row",
        backgroundColor: theme.colors.grey,
        width: "70%",
        alignItems:"center",
        justifyContent:"space-around",
        padding:2,
        borderRadius:5,
        marginStart:"10%"
    },
    containerState:{
        marginStart:"15%",
        width:"70%",
        flexDirection:"row",
        marginBottom:15
    },
    stateItem:{
        width:"33%",
        height:50,
        borderWidth: 1,
        borderColor: "gray",
        alignItems:"center"
    },
    color:{
        width:"100%",
        height:8,
        backgroundColor:"green",
        borderTopWidth: 1,
        borderTopColor: "gray"
    },
    colorN:{
        width:"100%",
        height:8,
        backgroundColor:theme.colors.greenOpacity,
        borderTopWidth: 1,
        borderTopColor: "gray"
    },
})


export default DetailOrder;