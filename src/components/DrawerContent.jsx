import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { STATUSBAR_HEIGHT } from "../../src/utils/constants.js";
import { orders } from "../../screens/delivery/js/GetOrderStoge.js";
import StyledButtonIcon from "../styles/StyledButtonIcon.jsx";
import theme from "../theme/theme.js";

const DrawerContent = ({ navigation, state }) => {
  const activeRouteName = state?.routeNames[state?.index];

  const menuItems = [
    { icon: "map-marked-alt", label: "Inicio", navigation: "MapScreen" },
    {
      icon: "box",
      label: "Pedidos disponibles",
      navigation: "OrderAvailableScreen",
      badge: orders.length,
    },
    {
      icon: "box-open",
      label: "Pedidos reservados",
      navigation: "ReservedOrdersScreen",
    },
    {
      icon: "star",
      label: "Puntaje de mis servicios",
      navigation: "DeliveyProfile",
    },
    {
      icon: "money-bill-wave",
      label: "Mis ganancias",
      navigation: "DeliveyProfile",
    },
    { icon: "exchange-alt", label: "Cambiar rol", navigation: "" },
  ];

  return (
    <View style={styles.drawerContent}>
      <UserProfile />
      <Divider />
      <MenuList
        menuItems={menuItems}
        activeRouteName={activeRouteName}
        navigation={navigation}
      />
      <Divider />
      <View style={styles.signOutSection}>
        <StyledButtonIcon
          logoutButton
          title="Cerrar sesión"
          iconLibrary={FontAwesome5}
          nameIcon="sign-out-alt"
          onPress={() => navigation.navigate("WelcomePage")}
        />
      </View>
    </View>
  );
};

const UserProfile = () => (
  <View style={styles.profileSection}>
    <Image
      style={styles.profileImage}
      source={{
        uri: "https://i.pinimg.com/736x/60/23/93/602393bf2e36653ca8f28a4fdd3a4852.jpg",
      }}
    />
    <View style={styles.profileTextContainer}>
      <Text style={styles.greeting}>Buen día, Usuario</Text>
      <Text style={styles.subText}>ID-Repartidor: #12345</Text>
    </View>
  </View>
);

const MenuList = ({ menuItems, activeRouteName, navigation }) => (
  <View style={styles.menuItems}>
    {menuItems.map((item, index) => (
      <MenuItem
        key={index}
        item={item}
        isActive={activeRouteName === item.navigation}
        onPress={() => navigation.navigate(item.navigation)}
      />
    ))}
  </View>
);

const MenuItem = ({ item, isActive, onPress }) => (
  <TouchableOpacity
    style={[styles.menuItem, isActive && styles.activeMenuItem]}
    onPress={onPress}
  >
    <View style={styles.iconContainer}>
      <FontAwesome5
        name={item.icon}
        size={20}
        color={isActive ? "white" : "grey"}
      />
      {item.badge && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.badge}</Text>
        </View>
      )}
    </View>
    <Text style={[styles.menuText, isActive && styles.activeMenuText]}>
      {item.label}
    </Text>
  </TouchableOpacity>
);

const Divider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingStart: 15,
    paddingEnd: 10,
    paddingTop: STATUSBAR_HEIGHT + 5,
    backgroundColor: theme.colors.white,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginBottom: 15,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: theme.colors.black,
    borderWidth: 0.5,
  },
  profileTextContainer: {
    marginLeft: 10,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.black,
  },
  subText: {
    fontSize: 14,
    paddingTop: 5,
    color: theme.colors.textPrimary,
  },
  divider: {
    height: 2,
    backgroundColor: theme.colors.blue,
    marginVertical: 10,
  },
  menuItems: {
    flex: 1,
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  activeMenuItem: {
    backgroundColor: theme.colors.blue,
  },
  menuText: {
    fontSize: 16,
    color: "grey",
    marginLeft: 15,
    fontWeight: "bold",
  },
  activeMenuText: {
    color: theme.colors.white,
  },
  iconContainer: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -10,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  signOutSection: {
    marginBottom: 20,
    height: 70,
  },
});

export default DrawerContent;
