import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

export const SpeedDial = () => {
  return (
    <>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: 60,
          height: 60,
          position: "absolute",
          right: 15,
          bottom: 20,
          borderRadius: 9999,
          backgroundColor: "#0063D1",
        }}
      >
        <Text style={{ color: "#E2E3E4" }}>
          <FontAwesome5 size={25} style={{ marginBottom: -3 }} name="feather" />
        </Text>
      </View>
    </>
  );
};
