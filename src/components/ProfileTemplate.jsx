import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";

import StyledButtonIcon from "../styles/StyledButtonIcon";
import theme from "../theme/theme";
import { MARGINS } from "../utils/constants";

const ProfileTemplate = ({
  userName,
  location,
  profileImage,
  bannerImage,
  role,
}) => {
  const getRoleBadge = (role) => {
    switch (role) {
      case "Administrador":
        return {
          color: "#81c784",
          icon: "shield-checkmark-outline",
          iconLibrary: Entypo,
        };
      case "Vendedor":
        return { color: "#fff176", icon: "shop", iconLibrary: Entypo };
      case "Cliente":
        return {
          color: "#64b5f6",
          icon: "person-outline",
          iconLibrary: Entypo,
        };
      case "Repartidor":
        return {
          color: "#ffb74d",
          icon: "truck-delivery",
          iconLibrary: MaterialCommunityIcons,
        };
      default:
        return {
          color: "#6c757d",
          icon: "help-circle-outline",
          iconLibrary: Entypo,
        };
    }
  };

  const { color, icon, iconLibrary } = getRoleBadge(role);

  return (
    <View style={styles.container}>
      {/* Banner Image */}
      <View style={styles.bannerContainer}>
        <Image source={{ uri: bannerImage }} style={styles.bannerImage} />
      </View>

      {/* Profile Icon */}
      <View style={styles.profileIconContainer}>
        <Image source={{ uri: profileImage }} style={styles.profileIcon} />
      </View>

      {/* User Info */}
      <Text style={styles.userName}>{userName}</Text>
      <View style={styles.locationContainer}>
        <Ionicons
          name="location-outline"
          size={15}
          color="#6c757d"
          style={styles.locationIcon}
        />
        <Text style={styles.location}>{location}</Text>
      </View>

      {/* Role Badge */}
      <View style={[styles.roleBadge, { backgroundColor: color }]}>
        {React.createElement(iconLibrary, {
          name: icon,
          size: 20,
          color: "#000",
          style: styles.roleIcon,
        })}
        <Text style={{ color: theme.colors.black, fontWeight: "bold" }}>
          {role}
        </Text>
      </View>
    </View>
  );
};

const BtnEdit = ({ onEditProfile, onChangeRole }) => {
  return (
    <View style={styles.horizontalButtonContainer}>
      <StyledButtonIcon
        title="Editar Perfil"
        nameIcon="create-outline"
        iconLibrary={Ionicons}
        onPress={onEditProfile}
      />
      <StyledButtonIcon
        title="Cambiar Rol"
        nameIcon="swap-horizontal-outline"
        iconLibrary={Ionicons}
        onPress={onChangeRole}
      />
    </View>
  );
};

const BtnCloseSeson = ({ onLogout }) => {
  return (
    <View style={styles.logoutButtonContainer}>
      <StyledButtonIcon
        logoutButton
        title="Cerrar Sesión"
        nameIcon="log-out-outline"
        iconLibrary={Ionicons}
        onPress={onLogout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    backgroundColor: theme.colors.grey,
    height: 180,
    marginBottom: -70,
    width: "100%",
  },
  bannerImage: {
    height: "100%",
    resizeMode: "cover",
    width: "100%",
  },
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  horizontalButtonContainer: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
  },
  location: {
    color: theme.colors.greyBlack,
    fontSize: 16,
    marginBottom: 10,
  },
  locationContainer: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  locationIcon: {
    marginRight: 3,
    marginTop: 1,
  },
  logoutButtonContainer: {
    alignSelf: "center",
    marginBottom: MARGINS.basic + 20,
    width: "90%",
  },
  profileIcon: {
    height: "100%",
    resizeMode: "cover",
    width: "100%",
  },
  profileIconContainer: {
    backgroundColor: theme.colors.greyBlack,
    borderColor: theme.colors.grey,
    borderRadius: 60,
    borderWidth: 4,
    height: 120,
    marginBottom: 10,
    overflow: "hidden",
    width: 120,
  },
  roleBadge: {
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  roleIcon: {
    marginRight: 10,
  },
  userName: {
    color: theme.colors.black,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export { ProfileTemplate, BtnEdit, BtnCloseSeson };
