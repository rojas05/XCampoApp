import React from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from "../../src/theme/theme";

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
    borderRadius: 15,
    marginBottom: 10,
    maxWidth: "75%",
    padding: 10,
  },
  messageText: {
    color: theme.colors.black,
    fontSize: 16,
  },
  receiverBubble: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.whiteMedium,
    borderStartEndRadius: 0,
    borderWidth: 1,
  },
  senderBubble: {
    alignSelf: "flex-end",
    backgroundColor: theme.colors.greenLiht,
    borderEndEndRadius: 0,
  },
  timestamp: {
    alignSelf: "flex-end",
    color: theme.colors.grey,
    fontSize: 12,
    marginTop: 5,
  },
});

export default MessageBubble;
