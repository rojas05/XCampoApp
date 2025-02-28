import * as Notifications from "expo-notifications";
//import Constants from "expo-constants";  NO se esta usando
import * as SecureStore from "expo-secure-store";
import { fetchWithToken } from "../tokenStorage"; // No se esta usando getToken

export async function registerForPushNotificationsAsync(id) {
  let token;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("Permisos de notificación no concedidos.");
    return;
  }

  token = (await Notifications.getDevicePushTokenAsync()).data;
  console.log("Token de notificación:", token);

  // Guardar el token en AsyncStorage y enviarlo a la API si ha cambiado
  const storedToken = await SecureStore.getItemAsync("pushToken");
  if (storedToken !== token) {
    await SecureStore.setItemAsync("pushToken", token);
    await enviarTokenAServidor(token, id);
  }
  return token;
}

async function enviarTokenAServidor(token, id) {
  const requestBody = {
    user_id: id,
    nfs: token,
  };
  try {
    const response = await fetchWithToken(
      "http://192.168.0.121:8080/XCampo/api/v1/user/nfs",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", // Asegúrate de enviar el Content-Type
        },
        body: JSON.stringify(requestBody),
      },
    );

    if (response.ok) {
      console.log("Token enviado correctamente al servidor.");
    } else {
      throw new Error("Error al enviar el token al servidor " + response);
    }
  } catch (error) {
    console.error("Error enviando el token:", error);
  }
}
