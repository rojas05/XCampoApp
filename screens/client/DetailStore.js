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

import API_URL from "../../fetch/ApiConfig";
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
      response = await fetchWithToken(`${API_URL}seller/${idStore}`, {
        method: "GET",
      });

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
  columnWrapper: {
    justifyContent: "space-between", // Espaciado uniforme entre columnas
    marginBottom: 10, // Espaciado vertical entre filas
  },
  container: {
    alignItems: "center",
    backgroundColor: theme.colors.greenOpacity,
    flex: 1,
    marginTop: Constants.statusBarHeight,
    position: "relative",
  },
  containerInfo: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    width: "100%",
  },
  // eslint-disable-next-line react-native/no-unused-styles
  containerItemInfo: {
    flexDirection: "row",
    width: "100%",
  },
  containerStar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    width: 60,
  },
  exit: {
    alignItems: "center",
    backgroundColor: theme.colors.opacity,
    borderRadius: 10,
    height: 30,
    justifyContent: "center",
    left: 10,
    position: "absolute",
    top: 10,
    width: 30,
  },
  fab: {
    alignItems: "center",
    backgroundColor: theme.colors.green,
    borderRadius: 10,
    bottom: 20,
    height: 40,
    justifyContent: "center",
    position: "absolute",
    right: "30%",
    width: "40%",
  },
  // eslint-disable-next-line react-native/no-unused-styles
  gridItem: {
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    height: 200,
    margin: 5,
    width: 150,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  imageItem: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: "50%",
    resizeMode: "cover",
    width: "100%",
  },
  imageStore: {
    backgroundColor: theme.colors.yellow,
    height: "30%",
    resizeMode: "cover",
    width: "100%",
  },
  send: {
    alignItems: "center",
    backgroundColor: theme.colors.greenLiht,
    borderRadius: 10,
    height: 30,
    justifyContent: "center",
    width: 50,
  },
});

export default DetailStore;
