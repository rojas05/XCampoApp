import { fetchWithToken } from "../tokenStorage";
import API_URL from "../fetch/ApiConfig";

export async function getDeliveryManByIdUser(id_user) {
  const endpoint = `${API_URL}deliveryman/getDeliveryMan/${id_user}`;

  try {
    const response = await fetchWithToken(endpoint, { method: "GET" });
    let result = await response.json();

    if (!response.ok)
      throw new Error(
        "No se pudo obtener el repartidor: ",
        JSON.stringify(result),
      );

    return result.rute;
  } catch (error) {
    console.error("Error fetching get delivery man:", error);
    throw error;
  }
}
