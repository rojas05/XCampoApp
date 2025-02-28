import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import theme from "../theme/theme";
import { formatCurrency } from "../../funcions/formatPrice";
import { useNavigation } from "@react-navigation/native";
import StyledText from "../styles/StyledText";
import { Search } from "iconoir-react-native";

const ItemProductSearch = (props) => {
  const navigation = useNavigation();
  const { item } = props;

  function next(){
      navigation.navigate("DetailProduct", {
        idProduct: item.id_product,
      });
  }

  return (
    <TouchableOpacity onPress={()=>{next()}}>
        <View style={styles.containerItemInfo}>
                <Search color={"black"} width={25} height={25}/>
                <StyledText title lines={1} width="60%">
                {item.name}
                </StyledText>
                <StyledText title lines={1} width="35%">
                por {item.measurementUnit.toLowerCase()}
                </StyledText>
                <StyledText title lines={1} width="35%">
                a tan solo {formatCurrency(item.price)}
                </StyledText>
            </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerItemInfo: {
    flexDirection: "row",
    width: "90%",
    marginStart:"5%",
    marginTop:"2%",
    backgroundColor: theme.colors.white,
    padding:5,
    borderRadius:10
  }
});

export default ItemProductSearch;