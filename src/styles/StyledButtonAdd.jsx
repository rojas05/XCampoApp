import React, { Children } from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import theme from "../theme/theme.js";
import { PlusCircle } from "iconoir-react-native";

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    padding: 10,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  text: {
    color: theme.colors.primary,
    fontSize: 20,
    paddingStart: 5,
  },
});

export default function StyledText(onPress) {
  const textStyles = [styles.text];

  const buttonStyles = [styles.button];
  return (
    <Pressable
      style={buttonStyles}
      backgroundColor={theme.colors.green}
      onPress={onPress}
    >
      <PlusCircle color="white" height={30} width={30} />
      <Text style={textStyles}>Agg Producto</Text>
    </Pressable>
  );
}
