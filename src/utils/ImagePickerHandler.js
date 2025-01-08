import * as ImagePicker from "expo-image-picker";
import string from "../string/string";

export const openCamera = async (setImagen, setAlertVisible) => {
  const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

  if (!permissionResult.granted) {
    alert(string.alertAddProduct.CAMERA_PERMISSION);
    return;
  }

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    setImagen((prev) => [...prev, result.assets[0].uri]);
  }
  setAlertVisible(false);
};

export const openGallery = async (setImagen, setAlertVisible) => {
  const permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permissionResult.granted) {
    alert(string.GALLERY_PERMISSION);
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    setImagen((prev) => [...prev, result.assets[0].uri]);
  }
  setAlertVisible(false);
};
