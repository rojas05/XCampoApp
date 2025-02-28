import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

import theme from "../../src/theme/theme.js";
import { HOME_STYLES, MARGINS } from "../../src/utils/constants.js";
/* Componentes */
import {
  ProfileTemplate,
  BtnEdit,
  BtnCloseSeson,
} from "../../src/components/ProfileTemplate.jsx";
import StoreMapPin from "../../src/components/Map/StoreMapPin.jsx";
/* Funtions */
import { getSellerById, getSellerID } from "../../services/SellerService.js";
import { getOtherURLsFromString } from "../../fetch/UseFetch.js";
import { getCoordinates } from "../../funcions/getCoordinates.js";

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

const SellerProfile = ({ route }) => {
  const { idUser } = route.params || {};
  const [photos, setPhotos] = useState([]);
  const [initialRegion, setInitialRegion] = useState(null);
  const [sellerData, setSellerData] = useState({
    name_store: "",
    location: "Pitalito - Calle Ficticia 123",
    profileImage:
      "https://thumbs.dreamstime.com/b/simple-tienda-online-logo-concepto-vector-210636270.jpg",
    bannerImage:
      "https://i0.wp.com/acimedellin.org/wp-content/uploads/2018/11/banner-mercados.jpg?fit=1200%2C620&ssl=1g",
    role: "Vendedor",
    description:
      "Bienvenidos a Tienda Ejemplo, donde podrás encontrar una variedad de productos de alta calidad a precios accesibles.",
    rating: 4,
    salesTotal: 2500,
  });
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchSellerData = async () => {
      setLoading(true);
      const sellerID = await getSellerID(idUser);
      const data = await getSellerById(sellerID);
      setSellerData((prevData) => ({
        ...prevData,
        name_store: data.name_store,
        location: data.location || prevData.location,
        description: data.location_description,
      }));
      setPhotos(getOtherURLsFromString(data.img));
      setInitialRegion(await getCoordinates(data.coordinates));
      setLoading(false);
    };
    fetchSellerData();
  }, [idUser]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Cargando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={HOME_STYLES.container}>
      <ProfileTemplate
        userName={sellerData.name_store}
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

      <Text style={styles.userName}>Como llegar:</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.sellerInfo}>
          <ImageSelector images={photos} />
          <Text style={styles.storeName}>{sellerData.description}</Text>
          <Text style={styles.salesTotal}>
            Ventas Totales: ${sellerData.salesTotal}
          </Text>
          <StoreMapPin store={sellerData} initialRegion={initialRegion} />
        </View>

        <BtnEdit
          onEditProfile={() => alert("Editar perfil")}
          onChangeRole={() => alert("Cambiar rol")}
        />
        <BtnCloseSeson onLogout={() => alert("Cerrar sesión")} />
      </ScrollView>
    </View>
  );
};

const ImageSelector = ({ images }) => {
  const [loadingStates, setLoadingStates] = useState(images.map(() => true));
  const [errorStates, setErrorStates] = useState(images.map(() => false));

  const handleImageLoad = (index) => {
    setLoadingStates((prev) => {
      const newStates = [...prev];
      newStates[index] = false;
      return newStates;
    });
  };

  const handleImageError = (index) => {
    setErrorStates((prev) => {
      const newStates = [...prev];
      newStates[index] = true;
      return newStates;
    });
  };

  const renderContent = () => {
    if (!images || images.length === 0) {
      return (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>No hay imágenes disponibles</Text>
        </View>
      );
    }

    return (
      <View style={styles.imageRow}>
        {images.map((uri, index) => (
          <TouchableOpacity
            key={index}
            delayLongPress={10}
            onLongPress={() => console.log("Presionado")}
          >
            <View style={styles.imageWrapper}>
              {loadingStates[index] && (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator
                    style={styles.loader}
                    size="small"
                    color={theme.colors.primary}
                  />
                  <Text style={styles.loadingText}>Cargando imagen...</Text>
                </View>
              )}
              <Image
                source={{ uri }}
                style={[styles.image, errorStates[index] && styles.imageError]}
                onLoad={() => handleImageLoad(index)}
                onError={() => handleImageError(index)}
                loading="lazy"
                resizeMode="cover"
              />
              {errorStates[index] && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>
                    Error al cargar la imagen
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return <View style={styles.imageContainer}>{renderContent()}</View>;
};

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  errorContainer: {
    alignItems: "center",
    backgroundColor: "rgba(255, 0, 0, 0.1)",
    borderRadius: 10,
    bottom: 0,
    justifyContent: "center",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  errorText: {
    color: theme.colors.red,
    fontSize: 12,
    padding: 5,
    textAlign: "center",
  },
  image: {
    borderRadius: 10,
    height: 100,
    marginHorizontal: 10,
    width: 150,
  },
  imageContainer: {
    marginBottom: 20,
  },
  imageError: {
    opacity: 0.3,
  },
  imageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageWrapper: {
    height: 100,
    marginHorizontal: 10,
    position: "relative",
    width: 150,
  },
  loader: {
    left: "50%",
    position: "absolute",
    top: "50%",
    transform: [{ translateX: -12 }, { translateY: -12 }],
    zIndex: 1,
  },
  loadingContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    zIndex: 10,
  },
  loadingText: {
    color: theme.colors.primary,
    fontSize: 16,
    marginTop: 10,
  },
  // eslint-disable-next-line react-native/no-color-literals
  messageContainer: {
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    justifyContent: "center",
    marginHorizontal: 10,
    padding: 20,
  },
  messageText: {
    color: theme.colors.gray,
    fontSize: 16,
    textAlign: "center",
  },
  ratingContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  ratingText: {
    fontSize: 16,
    marginRight: 10,
  },
  salesTotal: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    paddingStart: 30,
  },
  scrollContainer: {
    paddingBottom: MARGINS.basic + 130,
    paddingHorizontal: 10,
  },
  sellerInfo: {
    alignItems: "center",
    padding: 10,
    width: "100%",
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginRight: 10,
  },
  storeName: {
    fontSize: 15,
    marginVertical: 8,
    paddingEnd: 30,
    paddingStart: 30,
    textAlign: "justify",
  },
  userName: {
    color: theme.colors.black,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
});

export default SellerProfile;
