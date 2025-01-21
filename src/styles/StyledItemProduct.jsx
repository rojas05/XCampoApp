<<<<<<< HEAD
import React from 'react';
import {Text, TextInput, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import theme from '../theme/theme';
import StyledText from './StyledText';
import { Heart, HeartSolid } from 'iconoir-react-native';
import {useNavigation,} from '@react-navigation/native';


const StyledItemProduct = ({store, item}) => {
    const navigation = useNavigation()
    const imageStyles = [
        styles.image,
        store && styles.imageStore
    ]
    const containerStyles = [
        styles.container,
        store && styles.containerStore
    ]

  return (
    <TouchableOpacity onPress={()=>{navigation.navigate("DetailStore",
                  {
                    idStore: item.id_seller,
                  })}}>
        <View style={containerStyles}>
            {item.img ? (
                <Image source={{ uri: item.img }} style={imageStyles} />
            ) : (
                <Image source={require('../../assets/store.png')} style={imageStyles} />
            )}

            <View style={styles.containerText}> 
                <StyledText bold>{item.name_store}</StyledText>
                <Heart width={20} height={20} color={"black"} style={styles.icon}/>
            </View>

            <StyledText>{item.location}</StyledText>

        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create(
    {
        container:{
            width:150,
            height:160,
            backgroundColor:theme.colors.greenOpacity,
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
            borderBottomEndRadius: 10,
            borderBottomStartRadius: 10,
            margin: 5,
            paddingBottom: 5
        },
        containerStore:{
            width:"96%",
            height:240,
            backgroundColor:theme.colors.greenOpacity,
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
            borderBottomEndRadius: 10,
            borderBottomStartRadius: 10,
            margin: 5,
            paddingBottom: 5
        },
        image:{
            width:"100%", 
            height:100, 
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            backgroundColor: theme.colors.yellow
        },
        imageStore:{
            width:"100%",
            height:180,
            borderTopLeftRadius: 20,
            borderBottomRightRadius: 20
        },
        containerText:{
            width:"100%",
            flexDirection:"row", 
            justifyContent:"space-between", 
        },
        icon:{
            marginEnd: 5
        }
    }
)
=======
import React from "react";
import { View, StyleSheet, Image } from "react-native";
import theme from "../theme/theme";
import StyledText from "./StyledText";
import { Heart } from "iconoir-react-native";

const StyledItemProduct = (props) => {
  const { store } = props;
  const imageStyles = [styles.image, store && styles.imageStore];
  const containerStyles = [styles.container, store && styles.containerStore];
  return (
    <View style={containerStyles}>
      <Image
        source={require("../../assets/XCampo.png")}
        style={imageStyles}
      ></Image>

      <View style={styles.containerText}>
        <StyledText bold>name finca</StyledText>
        <Heart width={20} height={20} color={"black"} style={styles.icon} />
      </View>

      <StyledText>location</StyledText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 160,
    backgroundColor: theme.colors.greenOpacity,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    margin: 5,
    paddingBottom: 5,
  },
  containerStore: {
    width: "96%",
    height: 240,
    backgroundColor: theme.colors.greenOpacity,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    margin: 5,
    paddingBottom: 5,
  },
  image: {
    width: "100%",
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  imageStore: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  containerText: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    marginEnd: 5,
  },
});
>>>>>>> eb56ae6fa782673cb05f5b18082abb982f32ae4f

export default StyledItemProduct;
