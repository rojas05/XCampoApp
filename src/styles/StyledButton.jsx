import React from "react"
import { Pressable, StyleSheet, Text, Alert } from "react-native"
import theme from '../theme/theme.js'
import StyledText from "./StyledText"

const styles = StyleSheet.create({
    primaryButton : {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 8,
        elevation: 3,
        backgroundColor: theme.colors.green, 
        margin: 10
    },
    yellow : {
        backgroundColor: theme.colors.yellow, 
    },
    green: {
        backgroundColor: theme.colors.greenMedium, 
    },
    red : {
        backgroundColor: theme.colors.redBlack, 
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: theme.colors.primary,
        textAlign: 'center'
      },
    textBlack: {
        color: theme.colors.black, 
    }
})

export default function StyledButton (props){
    const {title,onPress,yellow,green,red,textBlack,style,...restOfPro} = props;
    const buttonStyles = [
        styles.primaryButton,
        yellow && styles.yellow,
        green && styles.green,
        red && styles.red,
        style
    ]
    const textStyles = [
        styles.text,
        textBlack && styles.textBlack
    ]
    return(
        <Pressable style={buttonStyles} onPress={onPress} {...restOfPro}>
            <Text style={textStyles}>{title}</Text>
        </Pressable>
    )
}