import React, { Children } from "react"
import { Text, StyleSheet } from "react-native"
import theme from '../theme/theme.js'

const styles = StyleSheet.create({
    text : {
        fontSize: theme.fontSizes.body,
        color: theme.colors.textPrimary,
        marginStart: 5
    },
    title : {
        fontSize: 20
    },
    green: {
        color : theme.colors.greenText
    },
    red: {
        color : theme.colors.red
    },
    redBlack: {
        color : theme.colors.redBlack
    },
    bold: {
        fontWeight: 'bold'
    },
    whiteButton: {
        color : theme.colors.primary,
        fontSize: 20,
        paddingStart: 5
    }
})

export default function StyledText ({red,bold,title,children,green,redBlack,whiteButton}){
    const textStyles = [
        styles.text,
        red && styles.red,
        bold && styles.bold,
        title && styles.title,
        green && styles.green,
        redBlack && styles.redBlack,
        whiteButton && styles.whiteButton
    ]
    return(
        <Text style={textStyles}>
            {children}
        </Text>
    )
}