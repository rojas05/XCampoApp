import react from 'react';
import {StyleSheet, View, Image, Text, ImageBackground } from 'react-native';
import  StyledText from '../src/styles/StyledText.jsx';
import StyledButton from '../src/styles/StyledButton.jsx';
import { HomeSimpleDoor, EmojiTalkingHappy, ChatBubble } from "iconoir-react-native";
import theme from '../src/theme/theme.js'
import string from '../src/string/string.js';


export default function WelcomePage() {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/background.png')} style={styles.image}>
      <View style={styles.containerComponent}>
        <Image source={require('../assets/XCampo.png')} style={{width:200, height:100, borderRadius:20, marginTop: 10}}></Image>
        <View style={styles.textContainer}>

          <View style={styles.itemContainer}>
            <HomeSimpleDoor height={25} width={25} color={theme.colors.green}/>
            <StyledText bold>{string.welcome.hello}</StyledText>
          </View>

          <View style={styles.itemContainer}>
            <EmojiTalkingHappy height={25} width={25} color={theme.colors.green}/>
            <StyledText bold>{string.welcome.welcomeHappy}</StyledText>
          </View>

          <View style={styles.itemContainer}>
            <ChatBubble height={25} width={25} color={theme.colors.green}/>
            <StyledText bold>{string.welcome.chat}</StyledText>
        </View>

      </View>

        <StyledButton title={string.App.next} onPress={()=>{next()}}></StyledButton>

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
  textContainer:{
    flex: 0,
    backgroundColor: '#ffffffa0',
    padding:20,
    margin:40,
    borderRadius:20
  },
  itemContainer:{
    marginTop: 20,
    flexDirection: 'row',
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
