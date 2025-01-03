import React from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground } from "react-native";
import Constants from 'expo-constants'
import StyledImput from "../src/styles/StyledImput";
import StyledText from "../src/styles/StyledText";
import theme from "../src/theme/theme";
import { HomeAlt, CheckCircle, Delivery, User } from "iconoir-react-native"
import StyledButton from "../src/styles/StyledButton";
import string from "../src/string/string";

const TypeUser = () => {

    return (
            <View style={styles.container}>

                <View style={styles.title}>
                    <StyledText title bold>¿Como quieres iniciar?</StyledText>
                    <StyledText>recuarda que puedes cambiar tu rol en cualquier momento</StyledText>
                </View>

                <ScrollView style={styles.scroll}>

                    <View style={{alignItems:"center"}}> 

                        <View style={styles.item}>

                            <View style={styles.header}>

                                <HomeAlt width={25} height={25} color={"black"} style={styles.icon} />
                                <StyledText bold > Vendedor </StyledText>

                            </View>

                            <View style={{flexDirection:"row", alignItems:"center", marginTop: 15}}>

                                <CheckCircle color={"grey"} width={30} height={30}/>

                                <StyledImput placeholder={"nombre de la finca"}>

                                </StyledImput>
                            </View>

                            <View style={{flexDirection:"row", alignItems:"center"}}>

                                <CheckCircle color={"grey"} width={30} height={30}/>

                                <StyledImput placeholder={"indicaciones para llegar"}>

                                </StyledImput>
                            </View>

                            <StyledButton title={string.App.next}></StyledButton>

                        </View>

                        

                        <View style={styles.item}>

                            <View style={styles.header}>

                                <Delivery width={25} height={25} color={"black"} style={styles.icon} />
                                <StyledText bold > Repartidor </StyledText>

                            </View>

                            <View style={{flexDirection:"row", alignItems:"center", marginTop: 15}}>

                                <CheckCircle color={"grey"} width={30} height={30}/>

                                <StyledImput placeholder={"veredas que transite"} green>

                                </StyledImput>
                            </View>

                            <StyledButton title={string.App.next}></StyledButton>

                        </View>

                        <View style={styles.item}>

                            <View style={styles.header}>

                                <User width={25} height={25} color={"black"} style={styles.icon} />
                                <StyledText bold >Cliente </StyledText>

                            </View>

                            <View style={{flexDirection:"row", alignItems:"center", marginTop: 15}}>

                                <CheckCircle color={"grey"} width={30} height={30}/>

                                <StyledImput placeholder={"veredas que transite"} green>

                                </StyledImput>
                            </View>

                            <StyledButton title={string.App.next}></StyledButton>

                        </View>

                    </View>

                </ScrollView>
            
            </View>
    )




    
}

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        flex:1,
        backgroundColor: theme.colors.yellow
    },
    item: {
        backgroundColor: theme.colors.opacity,
        width: 300,
        borderRadius: 20,
        marginTop: 10,
        alignItems: "center"
    },
    header: {
        backgroundColor: theme.colors.green,
        height: 40,
        width: 300,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        flexDirection: "row",
        padding: 5,
        justifyContent: "center",
    },
    scroll: {
        backgroundColor: theme.colors.opacity,
        
    },
    background: {
        flex: 1,
    }, title:{
        backgroundColor:theme.colors.opacity,
        alignItems: "center",
        marginBottom: 20,
        padding:10,
        justifyContent: "center"
    }
})

export default TypeUser;