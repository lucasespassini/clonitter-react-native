import React, { useState, useRef } from "react";
import { TextInput, Animated } from "react-native";

export const FloatingLabelInput = (props: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const fadeAnim = useRef(new Animated.Value(props.value ? 0 : 1)).current;

  function handleAnim() {
    Animated.timing(fadeAnim, {
      toValue: isFocused && !props.value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }

  return (
    <>
      <Animated.Text
        style={{
          position: "absolute",
          left: 0,
          top: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [-20, 0],
          }),
          fontSize: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 19],
          }),
          color: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ["#E2E3E4", "#AAA"],
          }),
        }}
      >
        {props.label}
      </Animated.Text>
      <TextInput
        blurOnSubmit
        style={{
          padding: 2,
          borderColor: isFocused ? "#0063D1" : "#E2E3E4",
          borderBottomWidth: isFocused ? 2 : 1,
          fontSize: 18,
          color: "#E2E3E4",
        }}
        onBlur={() => {
          handleAnim();
          setIsFocused(false);
        }}
        onFocus={() => {
          handleAnim();
          setIsFocused(true);
        }}
        onChangeText={(text) => props.onChangeText(text)}
        {...props}
      />
    </>
  );
};
