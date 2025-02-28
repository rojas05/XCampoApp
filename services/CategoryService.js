import { Alert } from "react-native";
import { responseHeader } from "../fetch/UseFetch";
import { fetchWithToken } from "../tokenStorage";
import API_URL from "../fetch/ApiConfig";

export async function postCategory(categoria) {
  const endpoint = `${API_URL}category`;
  const requestBody = {
    name: categoria,
    productList: [],
  };

  try {
    const response = await fetchWithToken(
      endpoint,
      responseHeader(requestBody, "POST"),
    );

    if (response.ok) {
      const data = await response.json();
      const id_product = data.id_category;
      return id_product;
    } else {
      Alert.alert("Error", "No se pudo obtener el ID de la categoría.");
      return;
    }
  } catch (error) {
    console.error("Error fetching category:", error);
  }
}
