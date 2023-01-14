import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SplashScreen = ({ navigation }: any) => {
  const [animating, setAnimating] = useState(true);
  const [isFocused, setIsFocused] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(async () => {
      setAnimating(false);
      AsyncStorage.getItem("@Clonitter:userdata").then((value) =>
        navigation.replace(!value ? "Auth" : "BottomTabRoutes")
      );
    }, 2000);
  }, []);

  function handleAnim() {
    Animated.timing(fadeAnim, {
      toValue: isFocused ? 1 : 0,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }

  useEffect(() => {
    navigation.addListener("focus", () => {
      setIsFocused(true);
      handleAnim();
    });
    navigation.addListener("blur", () => {
      setIsFocused(false);
      handleAnim();
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.Text
        style={{
          alignItems: "center",
          fontWeight: "900",
          color: "#0063D1",
          fontSize: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [20, 30],
          }),
        }}
      >
        Clonitter
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
});
