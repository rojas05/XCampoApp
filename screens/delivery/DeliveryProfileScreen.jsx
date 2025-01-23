import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

import {
  ProfileTemplate,
  BtnEdit,
  BtnCloseSeson,
} from "../../src/components/ProfileTemplate.jsx";
import { HOME_STYLES } from "../../src/utils/constants.js";

const renderStars = (rating) => {
  let stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <AntDesign
        key={i}
        name="star"
        size={20}
        color={i <= rating ? "#ffc107" : "gray"}
      />,
    );
  }
  return stars;
};

const DeliveyProfile = () => {
  // Datos específicos del vendedor
  const sellerData = {
    userName: "La Tienda de Juan",
    location: "Pitalito - Calle Ficticia 123",
    profileImage:
      "https://thumbs.dreamstime.com/b/simple-tienda-online-logo-concepto-vector-210636270.jpg",
    bannerImage:
      "https://i0.wp.com/acimedellin.org/wp-content/uploads/2018/11/banner-mercados.jpg?fit=1200%2C620&ssl=1g",
    role: "Repartidor",
    rating: 4,
    salesTotal: 2500,
    onLogout: () => alert("Cerrar sesión"),
    onEditProfile: () => alert("Editar perfil"),
    onChangeRole: () => alert("Cambiar rol"),
  };

  return (
    <View style={HOME_STYLES.container}>
      <ProfileTemplate
        userName={sellerData.userName}
        location={sellerData.location}
        profileImage={sellerData.profileImage}
        bannerImage={sellerData.bannerImage}
        role={sellerData.role}
      />
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>Calificación:</Text>
        <View style={styles.starsContainer}>
          {renderStars(sellerData.rating)}
        </View>
        <Text style={styles.ratingText}>{sellerData.rating} / 5</Text>
      </View>

      <View style={styles.sellerInfo}>
        <Text style={styles.salesTotal}>
          Ventas Totales: ${sellerData.salesTotal}
        </Text>
      </View>

      <BtnEdit
        onEditProfile={sellerData.onEditProfile}
        onChangeRole={sellerData.onChangeRole}
      />

      <BtnCloseSeson onLogout={sellerData.onLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  sellerInfo: {
    width: "100%",
    alignItems: "center",
    padding: 10,
  },
  storeName: {
    fontSize: 15,
    paddingStart: 30,
    paddingEnd: 30,
    textAlign: "justify",
    marginBottom: 5,
  },
  salesTotal: {
    fontSize: 20,
    paddingStart: 30,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  paymentMethod: {
    fontSize: 16,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  ratingText: {
    fontSize: 16,
    marginRight: 10,
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginRight: 10,
  },
});

export default DeliveyProfile;
