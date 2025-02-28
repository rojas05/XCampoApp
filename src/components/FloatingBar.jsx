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
  arrowButton: {
    padding: 5,
  },
  cityItem: {
    borderColor: theme.colors.black,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 5,
    padding: 10,
  },
  cityText: {
    fontSize: 16,
  },
  container: {
    bottom: 10,
    flex: 1,
    left: 10,
    position: "absolute",
    right: 10,
    zIndex: 10,
  },
  floatingBar: {
    alignItems: "center",
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    elevation: 6,
    flexDirection: "row",
    marginTop: 10,
    padding: 10,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  profileImage: {
    borderRadius: 25,
    height: 50,
    marginRight: 10,
    width: 50,
  },
  searchContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    elevation: 4,
    marginTop: 10,
    padding: 10,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  searchInput: {
    borderColor: theme.colors.greyBlack,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  selectedCity: {
    backgroundColor: theme.colors.greenLiht,
    borderColor: theme.colors.black,
    borderRadius: 5,
    borderWidth: 0.8,
  },
  selectedCityText: {
    color: theme.colors.black,
  },
  selectedText: {
    color: theme.colors.black,
    fontSize: 14,
    fontStyle: "italic",
    marginTop: 10,
  },
  statusContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 4,
  },
  statusDot: {
    backgroundColor: theme.colors.green,
    borderRadius: 7.5,
    height: 15,
    marginRight: 6,
    width: 15,
  },
  statusText: {
    color: theme.colors.greenText,
    fontSize: 14,
  },
  textContainer: {
    flex: 1,
  },
  welcomeText: {
    color: theme.colors.black,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FloatingBar;
