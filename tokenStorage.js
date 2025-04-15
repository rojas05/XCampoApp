import * as SecureStore from "expo-secure-store";
import URL_API from "./fetch/ApiConfig";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const API_URL = `${URL_API}auth/`;

/**
 * Guarda un token en SecureStore
 * @param {string} key - La clave del token (ACCESS_TOKEN_KEY o REFRESH_TOKEN_KEY)
 * @param {string} token - El token a almacenar
 */
export const saveToken = async (key, token) => {
  try {
    const stringToken = await JSON.stringify(token);
    await SecureStore.setItemAsync(key, stringToken);
  } catch (error) {
    console.error("Error al guardar el token:", error);
  }
};

/**
 * Obtiene un token desde SecureStore
 * @param {string} key - La clave del token (ACCESS_TOKEN_KEY o REFRESH_TOKEN_KEY)
 * @returns {string|null} - El token almacenado o null si no existe
 */
export const getToken = async (key) => {
  try {
    const token = await SecureStore.getItemAsync(key);
    if (token === null) {
      throw new Error("Sesión cerrada"); // Lanza un error específico para sesión cerrada
    }

    return token.replace(/"/g, "");
  } catch (error) {
    if (error.message === "Sesión cerrada") {
      console.warn("Sesión cerrada, no se puede obtener el token");
    } else {
      console.error("Error al obtener el token:", error);
    }
    return null;
  }
};

/**
 * Elimina un token de SecureStore
 * @param {string} key - La clave del token (ACCESS_TOKEN_KEY o REFRESH_TOKEN_KEY)
 */
export const deleteToken = async (key) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error("Error al eliminar el token:", error);
  }
};

/**
 * Actualiza el access token utilizando el refresh token
 * @returns {boolean} - Indica si la actualización fue exitosa
 */
export const refreshAccessToken = async () => {
  const refreshToken = await getToken(REFRESH_TOKEN_KEY);

  if (!refreshToken) {
    console.warn(
      "No se encontró un refresh token para actualizar el access token.",
    );
    throw "error";
  }

  try {
    const response = await fetch(`${API_URL}refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      console.warn("Error al actualizar el access token:", response);
      return false;
    }

    const data = await response.json();

    if (data.accessToken) {
      await saveToken(ACCESS_TOKEN_KEY, data.accessToken);
      await saveToken(REFRESH_TOKEN_KEY, data.refreshToken);
      return data.accessToken;
    } else {
      console.warn("Respuesta inválida al actualizar el access token:", data);
      return false;
    }
  } catch (error) {
    console.error(
      "Error al realizar la solicitud para actualizar el access token:",
      error,
    );
    return false;
  }
};

// Función para hacer solicitudes con un Access Token
export async function fetchWithToken(url, options = {}) {
  try {
    let accessToken = await getToken("accessToken");

    if (!accessToken) {
      throw new Error("Sesión cerrada"); // Lanza un error si no hay token
    }

    const headers = {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    };

    let response = await fetch(url, { ...options, headers });

    // Si el token está expirado (respuesta 403), intenta renovarlo y vuelve a hacer la solicitud
    if (response.status === 403) {
      console.log("Access token expired. Attempting to refresh...");
      accessToken = await refreshAccessToken(); // Renueva el access token

      if (!accessToken) {
        throw new Error("Sesión cerrada"); // Lanza un error si no se pudo refrescar el token
      }

      // Reintenta la solicitud con el nuevo token
      headers.Authorization = `Bearer ${accessToken}`;
      response = await fetch(url, { ...options, headers });
    }

    return response; // Devuelve la respuesta de la solicitud
  } catch (error) {
    if (error.message === "Sesión cerrada") {
      console.warn("Sesión cerrada, redirigiendo al login...");
      // Aquí puedes agregar la lógica para redirigir al usuario al login
    } else {
      console.error("Error in fetchWithToken:", error);
    }
    throw error;
  }
}

export async function clearData() {
  try {
    const keysToDelete = [
      "accessToken",
      "refreshToken",
      "id",
      "userInfo",
      "client_id",
    ]; // 🔑 Ajusta aquí las claves que estás usando

    for (const key of keysToDelete) {
      await SecureStore.deleteItemAsync(key);
    }

    console.log("✅ Datos seguros eliminados correctamente.");
    // Aquí podrías redirigir al login o reiniciar algún estado
  } catch (e) {
    console.error("❌ Error al eliminar datos de SecureStore:", e);
  }
}
