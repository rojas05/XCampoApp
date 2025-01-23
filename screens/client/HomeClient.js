import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    getAllStore();
    getLocationStore();
  }, [getAllStore, getLocationStore]);

  let response;
  async function getAllStore() {
    try {
      response = await fetchWithToken(
        "http://192.168.0.121:8080/XCampo/api/v1/seller/city/" + city,
        {
          method: "GET",
        },
      );

      if (response.ok) {
        const data = await response.json();
        setAllstore(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getLocationStore() {
    try {
      response = await fetchWithToken(
        "http://192.168.0.121:8080/XCampo/api/v1/seller/location/" + location,
        {
          method: "GET",
        },
      );

      if (response.ok) {
        const data = await response.json();
        setLocationStore(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

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
        <View style={styles.containerPicker}>
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
        <View style={styles.containerPicker}>
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
        <View style={styles.containerPicker}>
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
    marginTop: Constants.statusBarHeight,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    backgroundColor: theme.colors.greenOpacity,
    paddingTop: 5,
    paddingBottom: 20,
    alignItems: "center",
  },
  subHeader: {
    flexDirection: "row",
    backgroundColor: theme.colors.greenOpacity,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
  },
  scroll: {
    marginBottom: 10,
    height: "40%",
    backgroundColor: "black", // Unificación de estilo
  },
  icon: {
    marginStart: 10,
  },
  search: {
    flexDirection: "row",
    backgroundColor: theme.colors.grey,
    borderRadius: 15,
    marginStart: 10,
    width: 200,
    marginBottom: 10,
    alignItems: "center",
  },
  store: {
    flexDirection: "row",
    paddingTop: 5,
    paddingBottom: 20,
    width: 1,
    justifyContent: "space-between",
  },
  titleLocation: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: theme.colors.greenOpacity,
    paddingTop: 10,
    paddingBottom: 10,
  },
  scrollHorizontal: {
    width: 300,
    padding: "auto",
    marginTop: 20,
  },
  containerScrollVertical: {
    height: "40%",
    alignItems: "center",
  },
  containerScroll: {
    height: "40%",
    alignItems: "center",
  },
  pickerCity: {
    width: 45,
    height: "100%",
    borderRadius: 5,
  },
  containerPiker: {
    width: "30%",
    height: 30,
    flexDirection: "row",
    backgroundColor: theme.colors.primary,
    marginEnd: 10,
  },
  containerPikerDomicilio: {
    width: "30%",
    height: 30,
    flexDirection: "row",
    backgroundColor: theme.colors.yellow,
    borderRadius: 8,
  },
  containerPikerLocation: {
    width: "45%",
    height: 60,
    flexDirection: "row",
    backgroundColor: theme.colors.primary,
    marginEnd: 10,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
  },
  pickerText: {
    margin: 2,
    marginStart: 5,
    fontSize: 16,
  },
  pickerTextLocation: {
    margin: 2,
    marginStart: 5,
    fontSize: 16,
    color: theme.colors.green,
    fontWeight: "bold",
  },
  subTitle: {
    width: "40%",
    marginLeft: 10,
    marginRight: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default HomeClient;
