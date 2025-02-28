import { responseHeader } from "../fetch/UseFetch";
import { fetchWithToken } from "../tokenStorage";
import API_URL from "../fetch/ApiConfig";

import { getSavedLocation } from "../funcions/getCoordinates";

export async function postDeliveryProduct(orderId) {
  let state = "DISPONIBLE";
  try {
    const deliveryProducts = {
      available: true,
      state: state,
      startingPoint: await getSavedLocation(),
      destiny: "Customer Address", // falta
      orderId: orderId,
    };

    const response = await fetchWithToken(
      `${API_URL}delivery`,
      responseHeader(deliveryProducts, "POST"),
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Error al crear el delivery products: " + data);
    }
  } catch (error) {
    console.error("Error : " + error);
  }
}

// Falata agregar municio
export async function getDeliveryProductsState(state) {
  const endpoint = `${API_URL}delivery/getAll/${state}`;

  try {
    const response = await fetchWithToken(endpoint, { method: "GET" });
    if (response.status !== 302)
      throw new Error("No se pudo obtener los envios disponbles");

    let result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching get list delivery products:", error);
    throw error;
  }
}

export async function getDeliveryOrderById(idOrder) {
  const endpoint = `${API_URL}delivery/idOrder/${idOrder}`;

  try {
    const response = await fetchWithToken(endpoint, { method: "GET" });
    if (response.status !== 200)
      throw new Error("No se encontro envios disponbles ");

    let result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching get list delivery products:", error);
    throw error;
  }
}

export async function getDeliveryProductsStateMaps() {
  let state = "DISPONIBLE";
  const endpoint = `${API_URL}delivery/getListGroup/${state}`;

  try {
    const response = await fetchWithToken(endpoint, { method: "GET" });
    if (response.status !== 302)
      throw new Error("No se pudo obtener los envios disponbles");

    let result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching get list delivery products:", error);
    throw error;
  }
}

export async function getNewDeliveryProducts(params) {
  // para las ventanas emergentes
}

export async function updateDelivery_Man(params) {
  // aceptar pedido por repartidor
}

export async function updateStateDeliveryProducts(params) {
  // actualizar el estado
}

// Falata agregar municio
export async function getCountDeliveryAvailable() {
  let state = "DISPONIBLE";
  const endpoint = `${API_URL}delivery/getTotalAvailable/${state}`;

  try {
    const response = await fetchWithToken(endpoint, { method: "GET" });
    if (!response.status === 200)
      throw new Error("No se pudo obtener el total Ordenes dispobles");

    let result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching Order length:", error);
    throw error;
  }
}
