import React from "react";
import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity, FlatList} from "react-native";
import Constants from 'expo-constants'
import StyledText from "../../src/styles/StyledText";
import {InfoCircle, SendDiagonalSolid, StarSolid, Xmark} from "iconoir-react-native"
import theme from "../../src/theme/theme";
import StyledButton from "../../src/styles/StyledButton";
import string from "../../src/string/string";
import StyledItemProductCart from "../../src/styles/styledItemProductCar";
import StyledItemProductStore from "../../src/styles/StyledItemProductStore";

const DetailStore = () =>{

    const items = Array.from({ length: 11 }, (_, index) => `Item ${index + 1}`);

  const renderItem = ({ item }) => (
    <StyledItemProductStore item={item}></StyledItemProductStore>
  );

    return(

        <View style={styles.container}>

            <Image source={require("../../assets/XCampo.png")} style={styles.imageStore}></Image>

            <View style={styles.containerInfo}>
                <View>
                    <StyledText title bold>Name finca</StyledText>
                    <View style={styles.containerStar}>
                        <StyledText>star</StyledText>
                        <StarSolid width={20} height={20} color={"black"}/>
                    </View>
                </View>
                <Pressable style={styles.send}>
                    <InfoCircle width={20} height={20} color={"black"}/>
                </Pressable>
            </View>

            

            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2} // Especifica el número de columnas
                columnWrapperStyle={styles.columnWrapper} // Espaciado entre columnas
                width="95%"
            />


            <TouchableOpacity style={styles.fab}>
                    <StyledText whiteButton bold>Ver carrito ()</StyledText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.exit}>
                    <Xmark width={20} height={20} color={"black"}/>  
            </TouchableOpacity>

        </View>

    )

}

const styles = StyleSheet.create({
    container :{
        backgroundColor: theme.colors.greenOpacity,
        position:"relative" ,
        flex:1,
        marginTop: Constants.statusBarHeight,
        alignItems: "center",
    },
    imageStore:{
        resizeMode: "cover",
        width:"100%",
        height:"30%"
    },
    containerInfo:{
        flexDirection: "row",
        width:"100%",
        justifyContent:"space-between",
        alignItems:"center",
        padding:10,
    },
    scroll:{

    },
    fab:{
        position: 'absolute',
        bottom: 20, 
        right: "30%",
        backgroundColor: theme.colors.green,
        width: "40%",
        height: 40,
        borderRadius: 10, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    exit:{
        position: 'absolute',
        top: 10, 
        left: 10,
        backgroundColor: theme.colors.opacity,
        width: 30,
        height: 30,
        borderRadius: 10, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    send:{
        backgroundColor: theme.colors.greenLiht,
        borderRadius:10,
        width: 50,
        height:30,
        justifyContent:"center",
        alignItems:"center"
    },
    containerStar:{
        width: 60,
        flexDirection: "row",
        alignItems:"center",
        justifyContent: "center"
    },
    gridItem:{
        margin: 5,
        backgroundColor: theme.colors.primary,
        width:150,
        height:200,
        borderRadius: 10,
    },
    imageItem:{
        resizeMode:"cover",
        width:"100%",
        height:"50%",
        borderTopLeftRadius:10,
        borderTopRightRadius:10
    },
    containerItemInfo:{
        flexDirection:"row",
        width:"100%"
    },
    columnWrapper: {
        justifyContent: 'space-between', // Espaciado uniforme entre columnas
        marginBottom: 10, // Espaciado vertical entre filas
    },
})

export default DetailStore;