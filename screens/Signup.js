import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import StyledButton from '../src/styles/StyledButton';
import string from '../src/string/string';
import StyledImput from '../src/styles/StyledImput';
import StyledText from '../src/styles/StyledText';
import { useNavigation } from '@react-navigation/native';
import postData from '../fetch/UseFetch';
import { saveToken } from '../tokenStorage';
import theme from '../src/theme/theme'

const Signup = () => {
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation()

  const [name, setName] = useState("")
  const [cell, setCell] = useState("")
  const [password, setPassword] = useState("")
  const [mail, setMail] = useState("")
  const [city, setCity] = useState("")

  const [errors, setErrors] = useState({});

  const validateForm = async () => {
    let errors = {};

    // Validaciones
    if (!name) errors.name = string.Signup.errors.name;
    if (!cell) errors.cell = string.Signup.errors.cell;
    if (!password) errors.password = string.Signup.errors.password;
    if (password.length < 8) errors.password = string.Signup.errors.password;
    if (!mail) errors.mail = string.Signup.errors.mail;
    if (!city) errors.city = string.Signup.errors.city;

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      const requestBody = {
        user_id: null,
        name: name,
        city: city,
        cell: cell,
        email: mail,
        password: password,
      };

      setLoading(true); // Activar el estado de carga

      const { data, error } = await postData(
        'http://192.168.0.121:8080/XCampo/api/v1/auth/register',
        requestBody
      );

      setLoading(false); // Desactivar el estado de carga

      if (data) {
        if(data.statusCode === "FORBIDDEN"){
          Alert.alert('Upss', "El correo ya existe");
          errors.mail = string.Signup.errors.mail;
        }
        if(data.statusCode == "OK"){
          try{
            await saveToken('id', data.body.id_user);
            await saveToken('accessToken', data.body.token);
            await saveToken('refreshToken', data.body.refreshToken);
          } catch (e){
            Alert.alert("No se logro iniciar")
            throw e
          }
          navigation.navigate("TypeUser",{
            idUser: data.body.id_user,
            roles: []
          })
        }
         
        
      }

      if (error) {
        Alert.alert('Error', error.message);
      }
    }
  };

  

    return (
      <View style={styles.container}>
        
        <Image source={require('../assets/XCampo.png')} style={styles.image}></Image>

        <StyledButton title={string.Signup.hello} style={styles.Button}></StyledButton>

        <StyledImput 
          onChangeText={newText=>setName(newText)}
          placeholder={string.Signup.name}
          textError={errors.name}
        ></StyledImput>

        <StyledImput 
          onChangeText={newText=>setCell(newText)}
          placeholder={string.Signup.cell}
          keyboardType="numeric"
          textError={errors.cell}
        ></StyledImput>
        
        <StyledImput 
          onChangeText={newText=>setCity(newText)}
          placeholder={string.Signup.city}
          textError={errors.city}
        ></StyledImput>

        <StyledImput 
          onChangeText={newText=>setMail(newText)}
          placeholder={string.Signup.mail}
          textError={errors.mail}
        ></StyledImput>

        <StyledImput 
          onChangeText={newText=>setPassword(newText)}
          placeholder={string.Signup.password}
          textError={errors.password}
        ></StyledImput>

        <StyledText style={styles.text}>{string.Signup.require}</StyledText>

        {loading ? (
        <ActivityIndicator size="large" color={theme.colors.yellow} />
      ) : (
        <StyledButton 
          title={string.Signup.registrate} 
          style={styles.btnRegister} 
          onPress={()=> {validateForm()}}>

          </StyledButton>
      )}
      </View>
    );
  }

  const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      },
      image: {
        width: 200,
        height: 100,
        borderRadius: 30,
      },
      Button:{
        marginTop: 30,
        marginBottom: 30,
        width: 250
      },
      text:{
        marginTop: 20,
        fontSize: 15,
        width: 250
      },
      btnRegister:{
        marginTop: 20
      }
  })

export default Signup