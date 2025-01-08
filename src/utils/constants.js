import Constants from "expo-constants";
import { Dimensions } from "react-native";
import theme from "../theme/theme.js";

const { width } = Dimensions.get("screen");

const WIDTH_SCREEN = width * 0.9;
const BOTTOM_MARGIN = Constants.statusBarHeight - 10;
const STATUSBAR = Constants.statusBarHeight;

export { WIDTH_SCREEN, BOTTOM_MARGIN, STATUSBAR };

export const STYLES_HOMESELLER = {
  container: {
    flex: 1,
    backgroundColor: theme.colors.grey,
    paddingTop: STATUSBAR,
  },
  scrollContainer: {
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  inputDescription: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    textAlignVertical: "top",
    marginBottom: 10,
    paddingLeft: 10,
  },
  imageTop: {
    width: 170,
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
    elevation: 8,
  },
  button: {
    backgroundColor: "#98d187",
    borderRadius: 5,
    padding: 10,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
};
