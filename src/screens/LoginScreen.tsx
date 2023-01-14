import React, { useState, useCallback } from "react";
import { Text, View, TouchableHighlight } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FloatingLabelInput } from "../components/FloatingLabelInput";
import { Login } from "../services/auth";
import { api } from "../provider/api";

export interface ILoginData {
  login: string;
  password: string;
}

export const LoginScreen = ({ navigation }: any) => {
  const [loginData, setLoginData] = useState({} as ILoginData);

  const submit = async () => {
    const data = await Login(loginData.login, loginData.password);
    if (data.errors) return;
    api.defaults.headers.Authorization = `Bearer ${data.token}`;
    const jsonData = JSON.stringify(data);
    await AsyncStorage.setItem("@Clonitter:userdata", jsonData);
    navigation.navigate("BottomTabRoutes");
  };

  return (
    <View
      style={{
        margin: 30,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1, marginTop: 70 }}>
        <Text style={{ fontSize: 40, fontWeight: "900", color: "#0063D1" }}>
          Clonitter
        </Text>
      </View>

      <View style={{ flex: 2, width: "100%" }}>
        <View style={{ marginBottom: 35 }}>
          <FloatingLabelInput
            label="Nome de usuário"
            value={loginData.login}
            onChangeText={(text: string) =>
              setLoginData({ ...loginData, login: text })
            }
          />
        </View>

        <View style={{ marginBottom: 35 }}>
          <FloatingLabelInput
            label="Senha"
            value={loginData.password}
            secureTextEntry={true}
            onChangeText={(text: string) =>
              setLoginData({ ...loginData, password: text })
            }
          />
        </View>

        <TouchableHighlight
          style={{ padding: 10, backgroundColor: "#0063D1" }}
          onPress={submit}
        >
          <Text
            style={{
              color: "#E2E3E4",
              fontSize: 19,
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Entrar
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};
