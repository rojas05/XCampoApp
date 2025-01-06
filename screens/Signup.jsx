import { Alert, StyleSheet, View, Image, Text, ImageBackground } from 'react-native';
import  StyledText from '../src/styles/StyledText';
import StyledButton from '../src/styles/StyledButton.jsx';
import Constants from 'expo-constants'
import { HomeSimpleDoor, EmojiTalkingHappy, ChatBubble } from "iconoir-react-native";
import theme from '../src/theme/theme.js'
import string from '../src/string/string.js';
export default function SignupPage() {
  return (
    <View style={styles.container}>
      
    </View>
    
     
  );
}

function hello(){
  
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