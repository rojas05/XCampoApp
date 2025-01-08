import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

import { BOTTOM_MARGIN } from "../utils/constants.js";
import theme from "../theme/theme.js";

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.green,
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    elevation: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
  buttonIcon: {
    marginRight: 5,
  },
  fab: {
    backgroundColor: theme.colors.green,
    borderColor: theme.colors.greenMedium,
    borderWidth: 1,
    borderEndEndRadius: 0,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    borderBottomStartRadius: 30,
    padding: 12,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
  },
  fabLocation: {
    position: "absolute",
    bottom: BOTTOM_MARGIN,
    right: 20,
  },
  logoutButton: {
    backgroundColor: theme.colors.red,
    width: "100%",
    justifyContent: "center",
  },
  yellow: {
    backgroundColor: theme.colors.yellow,
    width: "50%",
    borderRadius: 5,
    alignSelf: "center",
  },
  green: {
    backgroundColor: theme.colors.greenMedium,
  },
  textBlack: {
    color: theme.colors.black,
  },
});

export default function StyledButtonIcon(props) {
  const {
    title = " ",
    onPress,
    nameIcon,
    iconLibrary: IconLibrary,
    logoutButton,
    textBlack,
    colorIcons = theme.colors.white,
    size = 20,
    btnFab,
    fab,
    style,
    ...restOfPro
  } = props;
  const buttonStyles = [
    styles.button,
    logoutButton && styles.logoutButton,
    colorIcons,
    textBlack && styles.textBlack,
    btnFab && styles.fabLocation,
    fab && styles.fab,
    style,
  ];
  const textStyles = [styles.buttonText];

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress} {...restOfPro}>
      <IconLibrary
        name={nameIcon}
        size={size}
        color={colorIcons}
        style={styles.buttonIcon}
      />
      {title !== " " ? <Text style={textStyles}>{title}</Text> : null}
    </TouchableOpacity>
  );
}
