import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import ChatFCM from "../../services/FCM";
import { getIdClientByOrderID } from "../../services/OrdersService";
import MessageBubble from "./ChatMessages";
import theme from "../../src/theme/theme";
import ChatHeader from "./ChatHeader";
import { getNameClient } from "../../services/ClientService";

const ChatScreen = ({ route }) => {
  const navigation = useNavigation();
  const { idOrder, senderId } = route.params || {};
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [receiverId, setReceiverId] = useState(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const flatListRef = useRef(null);

  const orderPath = `ORD-${idOrder}`;

  const generateChatId = useCallback(() => {
    return `MSG-${Date.now()}-${Math.floor(Math.random() * 999999)}`;
  }, []);

  const handleNewMessage = useCallback(
    (message) => {
      if (!message?.messageText) return;

      setMessages((prevMessages) => {
        const exists = prevMessages.some(
          (m) => m.messageText === message.messageText,
        );
        if (exists) return prevMessages; // Evita agregar duplicados

        return [
          ...prevMessages,
          {
            ...message,
            idChat: message.idChat || generateChatId(),
          },
        ];
      });
    },
    [generateChatId],
  );

  useEffect(() => {
    if (!idOrder || !senderId) {
      console.error("🚨 Falta información clave para iniciar el chat.");
      return;
    }

    const initializeChat = async () => {
      const idClient = await getIdClientByOrderID(idOrder);
      const clientName = await getNameClient(idClient);

      navigation.setOptions({
        header: () => (
          <ChatHeader navigation={navigation} clientName={clientName} />
        ),
      });

      if (idClient) {
        setReceiverId(idClient);
        console.log("✅ Escuchando mensajes en Firebase...");
        ChatFCM.listenToMessages(orderPath, handleNewMessage);
      }
    };

    initializeChat();

    return () => {
      ChatFCM.stopListening(orderPath);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idOrder, senderId]);

  useEffect(() => {
    if (isAtBottom && flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [isAtBottom, messages]);

  const filteredMessages = useMemo(() => {
    return [...messages]
      .filter(
        (msg) =>
          msg.senderId === `SELLER_${senderId}` ||
          msg.receiverId === `SELLER_${senderId}`,
      )
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }, [messages, senderId]);

  const handleSendMessage = useCallback(async () => {
    if (!receiverId || newMessage.trim() === "") return;

    const message = {
      idChat: generateChatId(),
      idOrder: `ORD-${idOrder}`,
      senderId: `SELLER_${senderId}`,
      receiverId: `CLIENT_${receiverId}`,
      messageText: newMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    try {
      await ChatFCM.sendMessage(message);
      setMessages((prev) => [...prev, message]);
      setNewMessage("");
    } catch (error) {
      console.error("❌ Error al enviar mensaje:", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiverId, newMessage, idOrder, senderId]);

  const handleScroll = (event) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const isBottom =
      contentOffset.y + layoutMeasurement.height >= contentSize.height - 20;
    setIsAtBottom(isBottom);
  };

  const renderMessage = useCallback(
    ({ item }) => {
      const timestamp = item.timestamp?.time
        ? new Date(item.timestamp.time)
        : new Date();

      return (
        <MessageBubble
          message={item.messageText}
          timestamp={timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
          isSender={item.senderId === `SELLER_${senderId}`}
        />
      );
    },
    [senderId],
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={filteredMessages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.idChat}
        extraData={filteredMessages}
        contentContainerStyle={styles.chatContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />

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
