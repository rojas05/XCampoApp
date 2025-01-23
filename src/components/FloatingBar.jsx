import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import theme from "../theme/theme";

const FloatingBar = ({ profileImage, userName }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCities, setSelectedCities] = useState([]);

  const cities = [
    "Bogotá",
    "Medellín",
    "Cali",
    "Barranquilla",
    "Cartagena",
    "Bucaramanga",
    "Manizales",
    "Pereira",
  ];

  const handleCitySelect = (city) => {
    if (selectedCities.includes(city)) {
      setSelectedCities(selectedCities.filter((c) => c !== city));
    } else if (selectedCities.length < 3) {
      setSelectedCities([...selectedCities, city]);
    }
  };

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      {isExpanded && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Seleccione 3 ciudades máximo"
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
          <FlatList
            data={filteredCities}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.cityItem,
                  selectedCities.includes(item) && styles.selectedCity,
                ]}
                onPress={() => handleCitySelect(item)}
              >
                <Text
                  style={[
                    styles.cityText,
                    selectedCities.includes(item) && styles.selectedCityText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
          <Text style={styles.selectedText}>
            Seleccionadas: {selectedCities.join(", ")}
          </Text>
        </View>
      )}

      <View style={styles.floatingBar}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>Hola, {userName}</Text>
          <View style={styles.statusContainer}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Conectado</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => setIsExpanded(!isExpanded)}
          style={styles.arrowButton}
        >
          <FontAwesome
            name={isExpanded ? "chevron-down" : "chevron-up"}
            size={24}
            color="#333"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    zIndex: 10,
  },
  floatingBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  statusDot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: theme.colors.green,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    color: theme.colors.greenText,
  },
  arrowButton: {
    padding: 5,
  },
  searchContainer: {
    marginTop: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },
  cityItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: theme.colors.black,
    borderRadius: 5,
    marginBottom: 5,
  },
  selectedCity: {
    backgroundColor: theme.colors.greenLiht,
    borderRadius: 5,
    borderColor: theme.colors.black,
    borderWidth: 0.8,
  },
  cityText: {
    fontSize: 16,
  },
  selectedCityText: {
    color: theme.colors.black,
  },
  selectedText: {
    marginTop: 10,
    fontSize: 14,
    fontStyle: "italic",
    color: "#555",
  },
});

export default FloatingBar;
