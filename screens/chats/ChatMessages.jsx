import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MessageBubble = ({ message, timestamp, isSender }) => {
  return (
    <View
      style={[
        styles.bubble,
        isSender ? styles.senderBubble : styles.receiverBubble,
      ]}
    >
      <Text style={styles.messageText}>{message}</Text>
      <Text style={styles.timestamp}>{timestamp}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    maxWidth: "75%",
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
  },
  senderBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
    borderEndEndRadius: 0,
  },
  receiverBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderStartEndRadius: 0,
  },
  messageText: {
    fontSize: 16,
    color: "#000",
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
    alignSelf: "flex-end",
  },
});

export default MessageBubble;
