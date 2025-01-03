import React, {useState} from 'react';
import {Text, TextInput, View, StyleSheet, Image} from 'react-native';
import theme from '../theme/theme';
import StyledText from './StyledText';
import StyledButton from './StyledButton';

const StyledItemProductStore = (props) => {
    const {item} = props

  return (
    <View style={styles.gridItem}>
        <Image source={require("../../assets/background.png")} style={styles.imageItem}></Image>
        <View style={styles.containerItemInfo}>
            <StyledText bold lines={1} width="60%">{item}xxxxx</StyledText>
            <StyledText bold lines={1} width="35%">x uni</StyledText>
        </View>
        <StyledText red bold lines={1}>price</StyledText>
        <StyledButton yellow title={"Agregar"} height="15%"></StyledButton>
    </View>
  );
};

const styles = StyleSheet.create({
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
        height:"40%",
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


export default StyledItemProductStore;