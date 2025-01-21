import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Image, ActivityIndicator, ImageBackground, Alert, Text, FlatList, Pressable, TouchableOpacity } from 'react-native';
import theme from '../src/theme/theme.js'
import {
  useNavigation,
} from '@react-navigation/native';
import { getToken, fetchWithToken } from '../tokenStorage.js';
import { List } from 'iconoir-react-native';
import StyledButton from '../src/styles/StyledButton.jsx';
import StyledText from '../src/styles/StyledText.jsx';


const Splash = () => {

    const [roles, setRoles] = useState([]);

    const navigation = useNavigation()

    const [idUser, setIdUser] = useState("")

    useEffect(() => {
      getTokenMain();
    }, []);
    
    async function getTokenMain() {
        try {
            const idStorage = await getToken("id"); // Espera a que se resuelva el token
            if (idStorage != null) {
              getUserData(idStorage)
            } else {
                navigation.navigate("WelcomePage")
            }
          } catch (error) {
            console.error('Error al obtener el token:', error);
            Alert.alert('Error', 'Hubo un problema al obtener el token');
          }
      }

      async function getUserData(id_user) {
        setIdUser(id_user)
        try {
           response = await fetchWithToken('http://192.168.0.121:8080/XCampo/api/v1/rol/'+id_user, {
            method: 'GET'
          });
      
          if (response.ok) {
            const data = await response.json();
            if(JSON.stringify(data)==="[]"){
                navigation.navigate("TypeUser",
                  {
                    idUser: idUser,
                    roles: roles
                  })
            }else{
                const jsonObject = JSON.parse(JSON.stringify(data))
                const valuesList = Object.values(jsonObject)
                console.log(valuesList)
                setRoles(valuesList)
            }
          } else {
            console.error('Failed to fetch user data:', response.status);
            response = await fetchWithToken('http://192.168.0.121:8080/XCampo/api/v1/rol/'+id_user, {
              method: 'GET'
            });
          }
        } catch (error) {
            navigation.navigate("Hello")
        }
      }

      function rolView(rol){
        if(rol=="DELIVERYMAN"){
          return "Repartidor"
        }
        if(rol=="SELLER"){
          return "Vendedor"
        }
        if(rol=="CLIENT"){
          return "Cliente"
        }
      }

      function rolNavigate(rol){
        if(rol=="DELIVERYMAN"){
          navigation.navigate("IndexClient")
        }
        if(rol=="SELLER"){
          Alert.alert(rol)
        }
        if(rol=="CLIENT"){
          navigation.navigate("IndexClient")
        }
      }

    return (
        <View style={styles.container}>
          <ImageBackground source={require('../assets/background.png')} style={styles.image}>
            <View style={styles.containerComponent}>
            <StyledText title bold>Bienvenido. Como vas a iniciar?</StyledText>
                <Image source={require('../assets/XCampo.png')} style={styles.imageIc}/>
                <View style={styles.List}>
                  
                  <FlatList
                    data={roles}
                    keyExtractor={(item, index) => index.toString()} // Usamos el índice como clave única
                    renderItem={({ item }) => (
                      <StyledButton title={rolView(item)} onPress={()=>{rolNavigate(item)}}></StyledButton> // Mostramos cada valor de la lista
                    )}
                  />
                </View>
                <TouchableOpacity onPress={()=>{navigation.navigate("TypeUser",{idUser: idUser, roles: roles})}}>
                    <StyledText bold blue>Registrar otro rol</StyledText>
                </TouchableOpacity>
            </View>
          </ImageBackground>
        </View> 
    );
}


const styles = StyleSheet.create({
  containerComponent: {
    flex: 1,
    backgroundColor: '#ffffffa0',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageIc:{
    width:250, 
    height:150, 
    borderRadius:20, 
    marginBottom: 20,
    marginTop: 20
  },
  List:{
    backgroundColor: theme.colors.opacity,
    width:250,
    borderRadius:20, 
    marginBottom: 20,
  },
  item:{
    marginTop: 10,
    fontSize: 18,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default Splash;