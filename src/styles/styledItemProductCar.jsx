import React, {useState} from 'react';
import {Text, TextInput, View, StyleSheet, Image} from 'react-native';
import theme from '../theme/theme';
import StyledText from './StyledText';

const StyledItemProductCart = (props) => {
    const {store} = props
    const imageStyles = [
        styles.image
    ]
  return (
    <View style={styles.container}> 
        <Image source={require("../../assets/background.png")} style={styles.image} />
        <View>
            <StyledText bold lines={1} width={150} marginBottom={5}>platano verde</StyledText>
            <View style={{flexDirection:"row"}}>
                <StyledText bold lines={1}>1 kilo x</StyledText>
                <StyledText red bold lines={1} width={75}>$1200</StyledText>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create(
    {
        container:{
            flexDirection:"row", 
            alignItems:"center",
            borderBottomWidth: 1,
            borderColor: theme.colors.grey,
            margin:10,
        },
        image:{
            width: 80, 
            height:80, 
            marginEnd:10
        },
        containerText:{
            width:"100%",
            flexDirection:"row", 
            justifyContent:"space-between", 
        },
        icon:{
            marginEnd: 5
        }
    }
)

export default StyledItemProductCart;