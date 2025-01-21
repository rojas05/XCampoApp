import React from "react";
import { Text, StyleSheet } from "react-native";
import theme from "../theme/theme.js";

const styles = StyleSheet.create({
<<<<<<< HEAD
    text : {
        fontSize: theme.fontSizes.body,
        color: theme.colors.textPrimary,
        marginStart: 5,
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
    blue:{
        color : theme.colors.blue
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

export default function StyledText ({red,bold,title,children,green,redBlack,whiteButton,blue}){
    const textStyles = [
        styles.text,
        red && styles.red,
        bold && styles.bold,
        title && styles.title,
        green && styles.green,
        redBlack && styles.redBlack,
        whiteButton && styles.whiteButton,
        blue && styles.blue
    ]
    return(
        <Text style={textStyles}>
            {children}
        </Text>
    )
}
=======
  text: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textPrimary,
    marginStart: 5,
  },
  title: {
    fontSize: 20,
  },
  green: {
    color: theme.colors.greenText,
  },
  red: {
    color: theme.colors.red,
  },
  redBlack: {
    color: theme.colors.redBlack,
  },
  bold: {
    fontWeight: "bold",
  },
  whiteButton: {
    color: theme.colors.primary,
    fontSize: 20,
    paddingStart: 5,
  },
});

export default function StyledText({
  red,
  bold,
  title,
  children,
  green,
  redBlack,
  whiteButton,
}) {
  const textStyles = [
    styles.text,
    red && styles.red,
    bold && styles.bold,
    title && styles.title,
    green && styles.green,
    redBlack && styles.redBlack,
    whiteButton && styles.whiteButton,
  ];
  return <Text style={textStyles}>{children}</Text>;
}
>>>>>>> eb56ae6fa782673cb05f5b18082abb982f32ae4f
