import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import theme from "../../src/theme/theme";

const PaymentSwitch = ({ isPaid, setIsPaid }) => (
  <View style={styles.checkboxContainer}>
    <Text style={styles.checkboxLabel}>¿El pedido ya está pagado?</Text>
    <Switch
      value={isPaid}
      onValueChange={setIsPaid}
      trackColor={{
        false: theme.colors.greyMedium,
        true: theme.colors.greenLiht,
      }}
      thumbColor={isPaid ? theme.colors.green : "#f4f3f4"}
    />
  </View>
);

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#555",
  },
});

export default PaymentSwitch;
