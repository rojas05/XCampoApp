import React, { useState } from 'react';
import { Text, View, Image, StyleSheet} from 'react-native';
import StyledButton from '../src/styles/StyledButton';
import string from '../src/string/string';
import StyledImput from '../src/styles/StyledImput';
import StyledText from '../src/styles/StyledText';
import { Mail, PasswordCheck } from "iconoir-react-native";

const Login = () => {

  const [password, setPassword] = useState("")
  const [mail, setMail] = useState("")

  const [errors, setErrors] = useState({});

  const validateForm  = () =>{
    let errors = {}

    if(!password) errors.password = string.Signup.errors.password
    if(password.length < 8) errors.password = string.Signup.errors.password
    if(!mail) errors.mail = string.Signup.errors.mail


    setErrors(errors)

    return Object.keys(errors).length === 0
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

        <StyledButton 
          title={string.login.next} 
          style={styles.btnRegister} 
          onPress={()=> {validateForm()}}>

          </StyledButton>
  
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