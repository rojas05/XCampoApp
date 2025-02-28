/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Constants from "expo-constants";
import {
  CartAlt,
  BellNotification,
  Search,
  FastArrowRight,
  MapPin,
} from "iconoir-react-native";

import API_URL from "../../fetch/ApiConfig";
import theme from "../../src/theme/theme";
import string from "../../src/string/string";
import { fetchWithToken } from "../../tokenStorage";
import StyledText from "../../src/styles/StyledText";
import StyledItemProduct from "../../src/styles/StyledItemProduct";

const HomeClient = () => {
  const [location] = useState("villanueva");

  const [city, setCity] = useState("Isnos");

  const [allStore, setAllstore] = useState([]);
  const [locationStore, setLocationStore] = useState([]);
  let response;

  useEffect(() => {
    getDateAPI(`${API_URL}seller/city/${city}`, setAllstore); // all store
    getDateAPI(`${API_URL}seller/location/${location}`, setLocationStore); // location
  }, [city, location]);

  const getDateAPI = useCallback(async (url, setDate) => {
    try {
      response = await fetchWithToken(url, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setDate(data);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const renderItem = ({ item }) => {
    console.log("Elemento de la lista:", item);
    return <StyledItemProduct item={item} />; // Pasa el objeto completo
  };

  const renderItemLocation = ({ item }) => {
    console.log("Elemento de la lista:", item);
    return <StyledItemProduct item={item} store />; // Pasa el objeto completo
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <MapPin width={25} height={25} color="black" style={styles.icon} />

        {/* Picker Municipio */}
        <View style={styles.containerPiker}>
          <Text style={styles.pickerText}>Municipio</Text>
          <Picker
            selectedValue={city}
            onValueChange={(itemValue) => setCity(itemValue)}
            style={styles.pickerCity}
            itemStyle={{ fontSize: 10 }}
          >
            <Picker.Item label="Municipio" value="" />
          </Picker>
        </View>

        {/* Picker Domicilio */}
        <View style={styles.containerPiker}>
          <Text style={styles.pickerText}>Domicilio</Text>
          <Picker
            selectedValue={city}
            onValueChange={(itemValue) => setCity(itemValue)}
            style={styles.pickerCity}
            itemStyle={{ fontSize: 10 }}
          >
            <Picker.Item label="Municipio" value="" />
          </Picker>
        </View>

        <Pressable>
          <BellNotification
            width={30}
            height={30}
            color="black"
            style={styles.icon}
          />
        </Pressable>

        <Pressable>
          <CartAlt width={30} height={30} color="black" style={styles.icon} />
        </Pressable>
      </View>

      {/* Subheader */}
      <View style={styles.subHeader}>
        <View style={styles.search}>
          <Search width={28} height={28} color="gray" style={styles.icon} />
          <TextInput placeholder={string.client.search} />
        </View>
      </View>

      {/* Store Section */}
      <View style={styles.store}>
        <StyledText title bold>
          {string.client.near}
        </StyledText>
        <FastArrowRight
          width={28}
          height={28}
          color="black"
          style={styles.icon}
        />
      </View>

      {/* Horizontal Scroll */}
      <View style={styles.scrollHorizontal}>
        <FlatList
          data={allStore}
          renderItem={renderItem}
          keyExtractor={(item) => item.id_seller.toString()}
          numColumns={1}
          columnWrapperStyle={styles.columnWrapper}
          horizontal
        />
      </View>

      {/* Location Section */}
      <View style={styles.titleLocation}>
        <Text style={styles.subTitle}>{string.client.select}</Text>
        <View style={styles.containerPiker}>
          <Text style={styles.pickerTextLocation}>
            Busca tu vereda favorita
          </Text>
          <Picker
            selectedValue={city}
            onValueChange={(itemValue) => setCity(itemValue)}
            style={styles.pickerCity}
            itemStyle={{ fontSize: 10 }}
          >
            <Picker.Item label="Municipio" value="" />
          </Picker>
        </View>
      </View>

      {/* Vertical Scroll */}
      <View style={styles.scroll}>
        <FlatList
          data={locationStore}
          renderItem={renderItemLocation}
          keyExtractor={(item) => item.id_seller.toString()}
          columnWrapperStyle={styles.columnWrapper}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  containerPiker: {
    backgroundColor: theme.colors.primary,
    flexDirection: "row",
    height: 30,
    marginEnd: 10,
    width: "30%",
  },
  containerPikerDomicilio: {
    backgroundColor: theme.colors.yellow,
    borderRadius: 8,
    flexDirection: "row",
    height: 30,
    width: "30%",
  },
  containerPikerLocation: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.black,
    borderRadius: 10,
    borderWidth: 2,
    flexDirection: "row",
    height: 60,
    marginEnd: 10,
    width: "45%",
  },
  containerScroll: {
    alignItems: "center",
    height: "40%",
  },
  containerScrollVertical: {
    alignItems: "center",
    height: "40%",
  },
  header: {
    alignItems: "center",
    backgroundColor: theme.colors.greenOpacity,
    flexDirection: "row",
    paddingBottom: 20,
    paddingTop: 5,
  },
  icon: {
    marginStart: 10,
  },
  pickerCity: {
    borderRadius: 5,
    height: "100%",
    width: 45,
  },
  pickerText: {
    fontSize: 16,
    margin: 2,
    marginStart: 5,
  },
  pickerTextLocation: {
    color: theme.colors.green,
    fontSize: 16,
    fontWeight: "bold",
    margin: 2,
    marginStart: 5,
  },
  scroll: {
    backgroundColor: theme.colors.black,
    height: "40%",
    marginBottom: 10, // Unificación de estilo
  },
  scrollHorizontal: {
    marginTop: 20,
    padding: "auto",
    width: 300,
  },
  search: {
    alignItems: "center",
    backgroundColor: theme.colors.grey,
    borderRadius: 15,
    flexDirection: "row",
    marginBottom: 10,
    marginStart: 10,
    width: 200,
  },
  store: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
    paddingTop: 5,
    width: 1,
  },
  subHeader: {
    backgroundColor: theme.colors.greenOpacity,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    flexDirection: "row",
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    marginRight: 10,
    width: "40%",
  },
  titleLocation: {
    backgroundColor: theme.colors.greenOpacity,
    flexDirection: "row",
    paddingBottom: 10,
    paddingTop: 10,
    width: "100%",
  },
});

export default HomeClient;
