import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";

import StyledButtonIcon from "../styles/StyledButtonIcon";

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
        <Text style={{ color: "#000", fontWeight: "bold" }}>{role}</Text>
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
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  bannerContainer: {
    width: "100%",
    height: 180,
    backgroundColor: "#e9ecef",
    marginBottom: -70,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  profileIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    borderWidth: 4,
    borderColor: "#f4f5ed",
    marginBottom: 10,
    backgroundColor: "#e9ecef",
  },
  profileIcon: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#343a40",
  },
  roleBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  roleIcon: {
    marginRight: 10,
  },
  horizontalButtonContainer: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
  },
  logoutButtonContainer: {
    alignSelf: "center",
    bottom: 20,
    position: "absolute",
    width: "90%",
  },
  location: {
    fontSize: 16,
    color: "#6c757d",
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  locationIcon: {
    marginRight: 3,
    marginTop: 1,
  },
});

export { ProfileTemplate, BtnEdit, BtnCloseSeson };
