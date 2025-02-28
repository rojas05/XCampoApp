import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MessageBubble from "./ChatMessages";
import theme from "../../src/theme/theme";

const ChatScreen = ({ userRole = "vendedor" }) => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      message: "¡Hola! ¿Cómo puedo ayudarte?",
      sender: "vendedor",
      timestamp: "10:15 AM",
    },
    {
      id: "2",
      message: "Quiero información sobre un producto.",
      sender: "cliente",
      timestamp: "10:16 AM",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    if (newMessage.trim() === "") return;
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: Date.now().toString(),
        message: newMessage,
        sender: userRole,
        timestamp: currentTime,
      },
    ]);
    setNewMessage("");
  };

  const renderMessage = ({ item }) => {
    const isSender = item.sender === userRole;
    return (
      <MessageBubble
        data={messages}
        message={item.message}
        timestamp={item.timestamp}
        isSender={isSender}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* Chat messages */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatContainer}
      />

      {/* Input area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Escribe un mensaje..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    padding: 10,
  },
  container: {
    backgroundColor: theme.colors.whiteMedium,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  inputContainer: {
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
  },
  sendButton: {
    alignItems: "center",
    backgroundColor: theme.colors.green,
    borderRadius: 20,
    justifyContent: "center",
    padding: 10,
  },
  textInput: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.whiteMedium,
    borderRadius: 20,
    borderWidth: 1,
    flex: 1,
    fontSize: 16,
    marginHorizontal: 10,
    padding: 15,
  },
});

export default ChatScreen;
