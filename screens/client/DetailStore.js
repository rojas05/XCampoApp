import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Constants from "expo-constants";
// import { YellowBox } from "react-native-web";
import { useNavigation, useRoute } from "@react-navigation/native";
import { InfoCircle, StarSolid, Xmark } from "iconoir-react-native";

import theme from "../../src/theme/theme";
import StyledText from "../../src/styles/StyledText";
import StyledItemProductStore from "../../src/styles/StyledItemProductStore";
import { fetchWithToken } from "../../tokenStorage";
// import { getCoordinates } from "../../funcions/getCoordinates";

const DetailStore = () => {
  const route = useRoute();

  const { idStore } = route.params;
  const [store, setStore] = useState({});

  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    getStore();
  }, [getStore]);

  const items = Array.from({ length: 11 }, (_, index) => `Item ${index + 1}`);

  let response;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getStore() {
    try {
      response = await fetchWithToken(
        "http://192.168.0.121:8080/XCampo/api/v1/seller/" + idStore,
        {
          method: "GET",
        },
      );

      if (response.ok) {
        const data = await response.json();
        setStore(data);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const renderItem = ({ item }) => (
    <StyledItemProductStore item={item}></StyledItemProductStore>
  );

  return (
    <View style={styles.container}>
      {store.img ? (
        <Image source={{ uri: store.img }} style={styles.imageStore} />
      ) : (
        <Image
          source={require("../../assets/store.png")}
          style={styles.imageStore}
        />
      )}

      <View style={styles.containerInfo}>
        {loading ? (
          <ActivityIndicator></ActivityIndicator>
        ) : (
          <View>
            <StyledText title bold>
              {store.name_store}
            </StyledText>
            <View style={styles.containerStar}>
              <StyledText>4.0</StyledText>
              <StarSolid width={20} height={20} color={"black"} />
            </View>
          </View>
        )}

        <TouchableOpacity
          style={styles.send}
          onPress={() => {
            navigation.replace("InfoStore", {
              idStore: store.id_seller,
            });
          }}
        >
          <InfoCircle width={20} height={20} color={"black"} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2} // Especifica el número de columnas
        columnWrapperStyle={styles.columnWrapper} // Espaciado entre columnas
        width="95%"
      />

      <TouchableOpacity style={styles.fab}>
        <StyledText whiteButton bold>
          Ver carrito ()
        </StyledText>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.exit}
        onPress={() => {
          navigation.navigate("IndexClient");
        }}
      >
        <Xmark width={20} height={20} color={"black"} />
      </TouchableOpacity>

      <View style={styles.containerInfo}>
        <View>
          <StyledText title bold>
            Name finca
          </StyledText>
          <View style={styles.containerStar}>
            <StyledText>star</StyledText>
            <StarSolid width={20} height={20} color={"black"} />
          </View>
        </View>
        <Pressable style={styles.send}>
          <InfoCircle width={20} height={20} color={"black"} />
        </Pressable>
      </View>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2} // Especifica el número de columnas
        columnWrapperStyle={styles.columnWrapper} // Espaciado entre columnas
        width="95%"
      />

      <TouchableOpacity style={styles.fab}>
        <StyledText whiteButton bold>
          Ver carrito ()
        </StyledText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.exit}>
        <Xmark width={20} height={20} color={"black"} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.greenOpacity,
    position: "relative",
    flex: 1,
    marginTop: Constants.statusBarHeight,
    alignItems: "center",
  },
  imageStore: {
    resizeMode: "cover",
    width: "100%",
    height: "30%",
    backgroundColor: theme.colors.yellow,
  },
  containerInfo: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  scroll: {},
  fab: {
    position: "absolute",
    bottom: 20,
    right: "30%",
    backgroundColor: theme.colors.green,
    width: "40%",
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  exit: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: theme.colors.opacity,
    width: 30,
    height: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  send: {
    backgroundColor: theme.colors.greenLiht,
    borderRadius: 10,
    width: 50,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  containerStar: {
    width: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  gridItem: {
    margin: 5,
    backgroundColor: theme.colors.primary,
    width: 150,
    height: 200,
    borderRadius: 10,
  },
  imageItem: {
    resizeMode: "cover",
    width: "100%",
    height: "50%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  containerItemInfo: {
    flexDirection: "row",
    width: "100%",
  },
  columnWrapper: {
    justifyContent: "space-between", // Espaciado uniforme entre columnas
    marginBottom: 10, // Espaciado vertical entre filas
  },
});

export default DetailStore;
