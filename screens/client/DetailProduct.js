import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import Constants from 'expo-constants'
import StyledText from "../../src/styles/StyledText";
import StyledButton from "../../src/styles/StyledButton"
import theme from "../../src/theme/theme";
import string from "../../src/string/string";
import PagerView from "react-native-pager-view";
import { Xmark } from "iconoir-react-native";

const DetailProduct = () =>{
    const img = {
        images: [
            require("../../assets/background.png"),
            require("../../assets/XCampo.png")
        ]
    }

    return(

        <View style={styles.container}>

            <PagerView style={styles.pager}>
                <View style={styles.ImageContainer}>

                    <Image style={styles.image} source={require("../../assets/background.png")}/>
                    <View style={styles.imageIndexContainer}>
                        <View style={styles.imageIndexA}></View>
                        <View style={styles.imageIndexB}></View>
                    </View>
                    
                </View>
                
                <View style={styles.ImageContainer}>

                    <Image style={styles.image} source={require("../../assets/XCampo.png")}/>
                    <View style={styles.imageIndexContainer}>
                        <View style={styles.imageIndexB}></View>
                        <View style={styles.imageIndexA}></View>
                    </View>
                    
                </View>
                
            </PagerView>

            

            <View style={styles.containerInfo}>

                <StyledText title bold >Platano verde</StyledText>

                <StyledText title bold paddingBottom={10}>unidad por $1000</StyledText>

                <StyledText paddingBottom={10}>Quedan 20 unidades disponibles</StyledText>

                <StyledText>platano organico de buena calidad, parejo, producido por campecinos</StyledText>

            </View>

            <View style={styles.containerProduct}>

                <StyledButton title={string.client.add} padding={10}> </StyledButton>

            </View>

            <TouchableOpacity style={styles.exit}>
                    <Xmark width={40} height={40} color={"white"}/>  
            </TouchableOpacity>
            
        </View>

    )

}

const styles = StyleSheet.create({
    container:{
        marginTop: Constants.statusBarHeight,
        flex: 1,
        justifyContent:"space-evenly"
    },
    containerInfo:{
        backgroundColor : theme.colors.greenLiht,
        margin:"2%",
        borderRadius: 10,
        padding: 10,
        justifyContent:"center"
    },
    containerProduct:{
        flexDirection:"column-reverse",
        backgroundColor : theme.colors.greenLiht,
        height:"30%",
        margin:"2%",
        bottom:2,
        borderTopStartRadius: 80,
        borderTopEndRadius: 80,
        borderBottomEndRadius: 80,
        padding:40
    },
    image:{
        resizeMode: "cover",
        width:"96%",
        height:"100%",
        margin:"2%",
        borderRadius: 10
    },
    pager:{
        width:"100%",
        height:300,  
    },
    ImageContainer:{
        position: "relative",
        height:290,
    },
    imageIndexContainer:{
        width:40,
        height:20,
        backgroundColor: theme.colors.opacity,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        position: "absolute",
        bottom:10,
        right: "45%",
        borderRadius: 20,
    },
    imageIndexA:{
        width: 10,
        height: 10,
        backgroundColor: theme.colors.green,
        borderRadius:5
    },
    imageIndexB:{
        width: 10,
        height: 10,
        backgroundColor: theme.colors.greenMedium,
        borderRadius:5
    },
    exit:{
        flexDirection:"row",
        position: 'absolute',
        top: 10, 
        left: 5,
        backgroundColor: theme.colors.green,
        borderRadius: 10, 
        justifyContent: 'center',
        alignItems:"center",
        padding: 5
    },
})

export default DetailProduct;