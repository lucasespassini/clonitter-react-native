import React from "react";
import { Text, View } from "react-native";

export const ExplorerScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, textAlign: "center", color: "#fff" }}>
        Welcome to the Playground
      </Text>
    </View>
  );
};
