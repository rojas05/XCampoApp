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

const StopInfo = ({ stop, index, onPress }) => {
  let costTotal = stop
    .map((item) => item.unitPrice)
    .reduce((acc, price) => acc + price, 0);

  return (
    <TouchableOpacity onPress={() => onPress(stop, index)}>
      <Text style={styles.stopInfo}>
        <Text style={styles.boldText}>Parada {index + 1}: </Text>
        {stop.sellerName + "\n"}
        <Text style={styles.boldText}>Pagas: </Text>
        {"$ " + costTotal + " / "}
        {stop.products.length + " productos"}
      </Text>
    </TouchableOpacity>
  );
};

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
  }, []);

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
          {stops.sellerName} Tiene {stops.totalOrders} pedidos (
          {stops.totalOrders} paradas)
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
  boldText: {
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    backgroundColor: theme.colors.green,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  countdownButton: {
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  countdownButtonText: {
    color: theme.colors.red,
    fontSize: 16,
    fontWeight: "bold",
  },
  orderInfo: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.greyMedium,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    borderWidth: 0.5,
    marginTop: 60,
    paddingTop: 20,
    padding: 10,
    width: "100%",
  },
  reservationText: {
    color: theme.colors.black,
    fontWeight: "bold",
    marginLeft: 5,
  },
  scrollableStopsContainer: {
    marginBottom: 10,
    maxHeight: 220,
  },
  stopInfo: {
    color: theme.colors.textPrimary,
    fontSize: 18,
    lineHeight: 24,
    paddingTop: 5,
  },
  stopsContainer: {
    alignSelf: "flex-start",
    marginHorizontal: 10,
  },
  summaryText: {
    alignSelf: "center",
    color: theme.colors.textPrimary,
    fontSize: 24,
    marginBottom: 3,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 1,
  },
});

export default OrderInfo;
