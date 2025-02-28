import { Alert } from "react-native";
import { fetchWithToken } from "../tokenStorage";
import { UpLoadFilesPost } from "../fetch/UpLoadFiles";
import API_URL from "../fetch/ApiConfig";

export async function getSellerID(id_user) {
  const endpoint = `${API_URL}seller/idUser/${id_user}`;

  try {
    const response = await fetchWithToken(endpoint, { method: "GET" });
    if (!response.ok) throw new Error("No se pudo obtener el vendedor.");

    return await response.json();
  } catch (error) {
    console.error("Error fetching seller ID:", error);
    Alert.alert(
      "Error",
      "Ocurrió un error al obtener el ID del vendedor" + error,
    );
  }
}

export async function getSellerById(id_seller) {
  const endpoint = `${API_URL}seller/${id_seller}`;

  try {
    const response = await fetchWithToken(endpoint, { method: "GET" });
    if (!response.ok) throw new Error("No se pudo obtener el vendedor.");

    return await response.json();
  } catch (error) {
    console.error("Error fetching seller ID:", error);
    Alert.alert(
      "Error",
      "Ocurrió un error al obtener el ID del vendedor" + error,
    );
  }
}

export async function postImageFirebaseSeller(
  imagen,
  id_seller,
  constext = "seller/location",
) {
  const URL = `storage/${id_seller}`;
  let url2 = null;

  const localImages = imagen.reduce((acc, file) => {
    if (file.startsWith("file://")) {
      acc.push({ uri: file, isFile: true });
    } else if (file.startsWith("https://")) {
      url2 = file;
      acc.push({ uri: file, isFile: false });
    }
    return acc;
  }, []);

  const result = await UpLoadFilesPost(localImages, constext, URL);

  return url2 ? `${url2} ${result}` : result;
}

export async function updateSellerImage(Urlimage, idSeller) {
  const endpoint = `${API_URL}seller/imgUpdate/${idSeller}`;
  const formData = new FormData();

  try {
    formData.append("images", Urlimage);

    const response = await fetchWithToken(endpoint, {
      method: "PATCH",
      body: formData,
    });

    const result = await response.text();

    if (response.ok) return result;
    else throw new Error("Error al subir imagen." + result);
  } catch (error) {
    console.error("Error al subir imagen", error.message);
    return error;
  }
}
