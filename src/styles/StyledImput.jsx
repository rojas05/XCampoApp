import React, { Children } from "react"
import { TextInput, StyleSheet } from "react-native"
import theme from '../theme/theme.js'

const styles = StyleSheet.create({
    imput : {
        fontSize: theme.fontSizes.body,
        color: theme.colors.textPrimary,
        marginStart: 5
    }
})

export default function StyledText ({text, setText, }){
    const textStyles = [
        styles.imput,
    ]
    return(
        <TextInput style={textStyles} onChangeText={newText => setText(newText)} placeholder={text}>
            
        </TextInput>
    )
}



