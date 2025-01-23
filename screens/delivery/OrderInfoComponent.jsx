import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import StyledButton from "../../src/styles/StyledButton";
import theme from "../../src/theme/theme";

const StopInfo = ({ stop, index, onPress }) => (
  <TouchableOpacity onPress={() => onPress(stop, index)}>
    <Text style={styles.stopInfo}>
      <Text style={styles.boldText}>Parada {index + 1}: </Text>
      {stop.tienda + "\n"}
      <Text style={styles.boldText}>Pagas: </Text>
      {"$ " + stop.total + " / "}
      {stop.productos.length + " productos"}
    </Text>
  </TouchableOpacity>
);

const Button = ({ title, onPress, style }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const OrderInfo = ({ stops, setShowAlert }) => {
  const time = 300;
  const [timeRemaining, setTimeRemaining] = useState(time);
  const [timerActive, setTimerActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isTaken, setIsTaken] = useState(false);
  const [showCounter, setShowCounter] = useState(true); // Controla si el contador es visible

  useEffect(() => {
    setTimeRemaining(time);
    setIsCompleted(false);
    setTimerActive(true);
    setIsTaken(false);
    setShowCounter(true); // Reinicia la visibilidad del contador al cambiar las paradas
  }, [stops]);

  useEffect(() => {
    let timer;
    if (timerActive && timeRemaining > 0) {
      timer = setInterval(() => setTimeRemaining((prev) => prev - 1), 1000);
    } else if (timeRemaining === 0 || isTaken) {
      setTimerActive(false);
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [timeRemaining, timerActive, isTaken]);

  function handleReservePress() {
    setTimerActive(false); // Detiene el contador
    setShowCounter(false); // Oculta el contador
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;
    return `${minutes}:${secondsRemaining < 10 ? "0" : ""}${secondsRemaining}`;
  };

  const handleTakeOrder = () => {
    setIsTaken(true);
    setTimerActive(false); // Detiene el contador si no estaba detenido
    setShowAlert(true);
  };

  if (isCompleted) return null;

  return (
    <View style={styles.container}>
      {showCounter && timeRemaining > 0 && (
        <View style={styles.topContainer}>
          <TouchableOpacity
            style={[
              styles.countdownButton,
              { backgroundColor: theme.colors.yellow },
            ]}
            onPress={() => handleReservePress()}
          >
            <Text style={styles.countdownButtonText}>
              {formatTime(timeRemaining)}
            </Text>
            <Text style={styles.reservationText}>Reservar</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.orderInfo}>
        <Text style={styles.summaryText}>
          {stops.nombre} Tiene {stops.length} pedidos ({stops.length} paradas)
        </Text>
        <Text style={styles.summaryText}>
          <Text style={styles.boldText}>$10.000 </Text>. 10,4 Km
        </Text>

        <StyledButton
          green
          title="Total pedidos a pagar $116.900"
          onPress={() => {}}
        />

        <View style={styles.scrollableStopsContainer}>
          <FlatList
            data={stops}
            contentContainerStyle={styles.stopsContainer}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <StopInfo stop={item} index={index} onPress={() => {}} />
            )}
          />
        </View>

        <View style={styles.buttonsContainer}>
          <Button title="Ver Ruta" onPress={() => {}} />
          {!showCounter && (
            <Button
              title={isTaken ? "Tomado" : "Tomar Pedido"}
              onPress={handleTakeOrder}
              style={isTaken}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  topContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
    position: "absolute",
    zIndex: 1,
    top: 0,
  },
  countdownButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  countdownButtonText: {
    color: theme.colors.red,
    fontSize: 16,
    fontWeight: "bold",
  },
  reservationText: {
    color: theme.colors.black,
    fontWeight: "bold",
    marginLeft: 5,
  },
  orderInfo: {
    width: "100%",
    backgroundColor: theme.colors.white,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    paddingTop: 20,
    padding: 10,
    marginTop: 60,
    borderColor: theme.colors.greyMedium,
    borderWidth: 0.5,
  },
  summaryText: {
    fontSize: 24,
    alignSelf: "center",
    color: theme.colors.textPrimary,
    marginBottom: 3,
  },
  boldText: {
    fontWeight: "bold",
  },
  scrollableStopsContainer: {
    maxHeight: 220,
    marginBottom: 10,
  },
  stopsContainer: {
    alignSelf: "flex-start",
    marginHorizontal: 10,
  },
  stopInfo: {
    fontSize: 18,
    lineHeight: 24,
    color: theme.colors.textPrimary,
    paddingTop: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  button: {
    backgroundColor: theme.colors.green,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OrderInfo;
