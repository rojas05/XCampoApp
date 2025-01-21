import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import StyledButton from '../src/styles/StyledButton';
import string from '../src/string/string';
import StyledImput from '../src/styles/StyledImput';
import StyledText from '../src/styles/StyledText';
import { Mail, PasswordCheck } from "iconoir-react-native";
import { saveToken } from '../tokenStorage';
import postData from '../fetch/UseFetch';
import theme from '../src/theme/theme';


const Login = () => {
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState("")
  const [mail, setMail] = useState("")

  const [errors, setErrors] = useState({});

  const validateForm  = async () =>{
    let errors = {}

    if(!password) errors.password = string.Signup.errors.password
    if(!mail) errors.mail = string.Signup.errors.mail


    setErrors(errors)

    if (Object.keys(errors).length === 0) {
      const requestBody = {
        mail: mail,
        password: password,
      };

      setLoading(true); // Activar el estado de carga

      const { data, error } = await postData(
        'http://192.168.0.121:8080/XCampo/api/v1/auth/login',
        requestBody
      );

      setLoading(false); // Desactivar el estado de carga

      if (data) {
        if(data.statusCode === "FORBIDDEN"){
          Alert.alert('Upss', "credenciales incorrectas");
          errors.mail = string.Signup.errors.mail;
        }
        if(data.statusCode == "OK"){
          try{
            console.log(data)
            await saveToken('id', data.body.id_user);
            await saveToken('accessToken', data.body.token);
            await saveToken('refreshToken', data.body.refreshToken);
          } catch (e){
            Alert.alert("No se logro iniciar")
            throw e
          }
          navigation.navigate("Splash")
        }
         
        
      }

      if (error) {
        Alert.alert('Error', error.message);
      }
    }
  }

    return (
      <View style={styles.container}>
        
        <Image source={require('../assets/XCampo.png')} style={styles.image}></Image>

        <StyledButton title={string.login.hello} style={styles.Button}></StyledButton>

              
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
        


        <StyledText style={styles.text}>{string.login.require}</StyledText>

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
      containerImput: {
        flexDirection: "row",
        alignItems: "center",
        height:60
      },
      containerIcon:{
        borderRadius:20,
        backgroundColor: "gray",
        height:35,
        width:30, 
        alignItems: "center", 
        justifyContent: "center", 
        marginBottom:12
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

export default Login