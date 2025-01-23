import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { HOME_STYLES } from "../../src/utils/constants.js";
import StyledButtonIcon from "../../src/styles/StyledButtonIcon.jsx";
import StyledButton from "../../src/styles/StyledButton.jsx";
import TEXTS from "../../src/string/string.js";
import theme from "../../src/theme/theme.js";
import SearchBar from "../../src/components/SearchBar.jsx";

const products = [
  {
    id: "1",
    image: "https://via.placeholder.com/150",
    name: "Manzanas",
    price: "2.50",
    unit: "Kg",
    stock: "25",
    description: "Manzanas frescas y jugosas.",
  },
  {
    id: "2",
    image: "https://via.placeholder.com/150",
    name: "Leche",
    price: "1.20",
    unit: "Litro",
    stock: "40",
    description: "Leche fresca y pasteurizada.",
  },
  {
    id: "3",
    image: "https://via.placeholder.com/150",
    name: "Pan",
    price: "0.80",
    unit: "Pieza",
    stock: "100",
    description: "Pan recién horneado.",
  },
];

const ProductCard = ({ product, onEdit, onSales }) => (
  <View style={styles.card}>
    <Image source={{ uri: product.image }} style={styles.productImage} />
    <View style={styles.cardContent}>
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <Text style={styles.productData}>
        Unidad: <Text style={styles.productValue}>{product.unit}</Text>
      </Text>
      <Text style={styles.productData}>
        Precio: <Text style={styles.productValue}>${product.price}</Text>
      </Text>
      <Text style={styles.productData}>
        Inventario disponible:{" "}
        <Text style={styles.productValue}>{product.stock} Und</Text>
      </Text>

      <View style={styles.cardButtons}>
        <StyledButton green title="Ventas" onPress={onSales} />
        <StyledButtonIcon
          nameIcon="edit"
          iconLibrary={MaterialIcons}
          onPress={() => onEdit(product.name)}
        />
      </View>
    </View>
  </View>
);

const ProductsScreen = ({ navigation }) => {
  const handleEdit = (name) => {
    navigation.navigate("RegisterProducts", {
      title: `Editar Producto ${name}`,
    });
  };

  const handleSales = () => {
    alert("Ver ventas del producto");
  };

  return (
    <View style={HOME_STYLES.container}>
      <Text style={styles.title}>Productos</Text>
      <SearchBar />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 85 }}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onEdit={handleEdit}
            onSales={handleSales}
          />
        )}
      />
      <StyledButtonIcon
        fab
        btnFab
        title="Agregar Producto"
        size={25}
        nameIcon="add-circle-outline"
        iconLibrary={MaterialIcons}
        onPress={() =>
          navigation.navigate("RegisterProducts", {
            title: TEXTS.homeSeller.ADD_PRODUCT,
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
  },
  card: {
    flexDirection: "row",
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 16,
    padding: 16,
  },
  productImage: {
    width: 120,
    height: 120,
    alignSelf: "center",
    borderRadius: 8,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productDescription: {
    fontSize: 14,
    color: theme.colors.greyBlack,
    marginVertical: 8,
  },
  productData: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productValue: {
    color: theme.colors.red,
  },
  cardButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
});

export default ProductsScreen;
