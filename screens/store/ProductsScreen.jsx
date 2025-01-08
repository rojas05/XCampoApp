import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { STYLES_HOMESELLER } from "../../src/utils/constants.js";
import StyledButtonIcon from "../../src/styles/StyledButtonIcon.jsx";
import StyledButton from "../../src/styles/StyledButton.jsx";
import TEXTS from "../../src/string/string.js";
import theme from "../../src/theme/theme.js";

const ProductCard = ({
  image,
  name,
  price,
  unit,
  stock,
  description,
  onEdit,
  onSales,
}) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.productImage} />
      <View style={styles.cardContent}>
        <Text style={styles.productName}>{name}</Text>
        <Text style={styles.productDescription}>{description}</Text>
        <Text style={styles.productData}>
          Unidad: <Text style={styles.productValue}>{unit}</Text>
        </Text>
        <Text style={styles.productData}>
          Precio: <Text style={styles.productValue}>${price}</Text>
        </Text>
        <Text style={styles.productData}>
          Inventario disponible:{" "}
          <Text style={styles.productValue}>{stock} Und</Text>
        </Text>

        <View style={styles.cardButtons}>
          <StyledButton green title="Ventas" onPress={onSales} />

          <StyledButtonIcon
            nameIcon="edit"
            iconLibrary={MaterialIcons}
            onPress={() => onEdit(name)}
          />
        </View>
      </View>
    </View>
  );
};

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
    <View style={STYLES_HOMESELLER.container}>
      <Text style={styles.title}>Productos</Text>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 85 }}
      >
        <ProductCard
          image="https://via.placeholder.com/150"
          name="Manzanas"
          price="2.50"
          unit="Kg"
          stock="25"
          description="Manzanas frescas y jugosas."
          onEdit={handleEdit}
          onSales={handleSales}
        />
        <ProductCard
          image="https://via.placeholder.com/150"
          name="Leche"
          price="1.20"
          unit="Litro"
          stock="40"
          description="Leche fresca y pasteurizada."
          onEdit={handleEdit}
          onSales={handleSales}
        />
        <ProductCard
          image="https://via.placeholder.com/150"
          name="Pan"
          price="0.80"
          unit="Pieza"
          stock="100"
          description="Pan recién horneado."
          onEdit={handleEdit}
          onSales={handleSales}
        />
        <ProductCard
          image="https://via.placeholder.com/150"
          name="Pan"
          price="0.80"
          unit="Pieza"
          stock="100"
          description="Pan recién horneado."
          onEdit={handleEdit}
          onSales={handleSales}
        />
        <ProductCard
          image="https://via.placeholder.com/150"
          name="Pan"
          price="0.80"
          unit="Pieza"
          stock="100"
          description="Pan recién horneado."
          onEdit={handleEdit}
          onSales={handleSales}
        />
        <ProductCard
          image="https://via.placeholder.com/150"
          name="Pan"
          price="0.80"
          unit="Pieza"
          stock="100"
          description="Pan recién horneado."
          onEdit={handleEdit}
          onSales={handleSales}
        />
      </ScrollView>

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
    marginVertical: 10,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
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
    color: "#666",
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
