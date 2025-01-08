import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  FlatList,
} from "react-native";
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
import StyledText from "../../src/styles/StyledText";
import StyledItemProduct from "../../src/styles/StyledItemProduct";
import { Picker } from "@react-native-picker/picker";

const HomeClient = () => {
  const [city, setCity] = useState("");

  const items = Array.from({ length: 11 }, (_, index) => `Item ${index + 1}`);

  const renderItemP = ({ item }) => <StyledItemProduct></StyledItemProduct>;

  const renderItemS = ({ item }) => (
    <StyledItemProduct store></StyledItemProduct>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MapPin width={25} height={25} color={"black"} style={styles.icon} />

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

        <View style={styles.containerPikerDomicilio}>
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
            color={"black"}
            style={styles.icon}
          />
        </Pressable>

        <Pressable>
          <CartAlt width={30} height={30} color={"black"} style={styles.icon} />
        </Pressable>
      </View>

      <View style={styles.subHeader}>
        <View style={styles.search}>
          <Search width={28} height={28} color={"gray"} style={styles.icon} />
          <TextInput placeholder={string.client.search}></TextInput>
        </View>
      </View>

      <View style={styles.store}>
        <StyledText title bold>
          {string.client.near}
        </StyledText>
        <FastArrowRight
          width={28}
          height={28}
          color={"black"}
          style={styles.icon}
        />
      </View>

      <View style={styles.containerScrollHorizontal}>
        <FlatList
          data={items}
          renderItem={renderItemP}
          keyExtractor={(item, index) => index.toString()}
          numColumns={1} // Especifica el número de columnas
          columnWrapperStyle={styles.columnWrapper} // Espaciado entre columnas
          width="95%"
          horizontal
        />
      </View>

      <View style={styles.titleLocation}>
        <Text style={styles.subTitle}>{string.client.select}</Text>

        <View style={styles.containerPikerLocation}>
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

      <View>
        <FlatList
          data={items}
          renderItem={renderItemS}
          keyExtractor={(item, index) => index.toString()}
          // Especifica el número de columnas
          columnWrapperStyle={styles.columnWrapper} // Espaciado entre columnas
          width="100%"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
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
    backgroundColor: "black",
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
    with: 1,
    justifyContent: "space-between",
  },
  titleLocation: {
    flexDirection: "row",
    with: "100%",
    backgroundColor: theme.colors.greenOpacity,
    paddingTop: 10,
    paddingBottom: 10,
  },
  scrollHorizontal: {
    with: 300,
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
