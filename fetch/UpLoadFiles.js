import { Alert } from "react-native";
import API_URL from "./ApiConfig";
import { fetchWithToken } from "../tokenStorage";

export async function UpLoadFilesPost(images, context, URL, initialIndex = 0) {
  if (images.length === 0) {
    Alert.alert("Error al subir imagen", "No hay imágenes seleccionadas");
    return;
  }

  const formData = new FormData();
  formData.append("context", context);

  images.forEach((file, index) => {
    const fileExtension = file.split(".").pop() || "jpeg";
    const adjustedIndex = initialIndex + index; // Sumar el índice inicial

    formData.append("images", {
      uri: file,
      type: `image/${fileExtension}`,
      name: `Image-${adjustedIndex}`,
    });
  });

  try {
    const response = await fetchWithToken(`${API_URL}${URL}`, {
      method: "POST",
      body: formData,
    });

    const result = await response.text();

    if (!response.ok)
      throw new Error("Error al subir imagen: " + JSON.stringify(result));

    return result;
  } catch (error) {
    console.error("Error al subir imagen", error.message);
    return [];
  }
}
