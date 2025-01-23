import React from "react";
import theme from "../theme/theme.js";

import { StyleSheet, Text, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  primaryButton: {
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: theme.colors.green,
    margin: 10,
    elevation: 3,
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  yellow: {
    backgroundColor: theme.colors.yellow,
  },
  green: {
    backgroundColor: theme.colors.green,
  },
  red: {
    backgroundColor: theme.colors.redBlack,
  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: theme.colors.primary,
    textAlign: "center",
  },
  textBlack: {
    color: theme.colors.black,
  },
});

export default function StyledButton(props) {
  const { title, onPress, yellow, green, red, textBlack, style, ...restOfPro } =
    props;
  const buttonStyles = [
    styles.primaryButton,
    yellow && styles.yellow,
    green && styles.green,
    red && styles.red,
    style,
  ];
  const textStyles = [styles.text, textBlack && styles.textBlack];
  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress} {...restOfPro}>
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
}
