import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Image, Pressable } from "react-native";

import LinkingConfiguration from "./LinkingConfiguration";
import { REACT_APP_PRF_URL } from "@env";
import { HomeScreen } from "../screens/HomeScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { SplashScreen } from "../screens/SplashScreen";
import { ExplorerScreen } from "../screens/ExplorerScreen";
import { IUser } from "../utils/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Navigation() {
  return <App />;
}

const Stack = createNativeStackNavigator<any>();

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: "Register", //Set Header Title
          headerStyle: {
            backgroundColor: "#307ecc", //Set Header color
          },
          headerTintColor: "#fff", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={DarkTheme}>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BottomTabRoutes"
          component={BottomTabNavigator}
          // Hiding header for Navigation Drawer
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<any>();

function BottomTabNavigator({ navigation }: any) {
  const [user, setUser] = useState({} as IUser);

  useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem("@Clonitter:userdata");
      if (!value) {
        navigation.navigate("Auth");
        return;
      }
      const jsonValue = JSON.parse(value);
      setUser(jsonValue.payload);
    })();
  }, []);

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        title: "Clonitter",
        // headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 25,
          fontWeight: "900",
          color: "#0063D1",
        },
        headerStyle: {
          backgroundColor: "#000",
          borderBottomWidth: 0.5,
          borderBottomColor: "#6A6F74",
        },
        tabBarActiveTintColor: "#0063D1",
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 50,
          backgroundColor: "#000",
          borderTopWidth: 0.5,
          borderTopColor: "#6A6F74",
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: any) => ({
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Image
              style={{
                marginRight: 15,
                width: 40,
                height: 40,
                borderRadius: 999,
              }}
              source={{
                uri:
                  user?.profile?.prf_image &&
                  `${REACT_APP_PRF_URL}/${user?.profile?.prf_image}`,
              }}
            />
          ),
        })}
      />
      <BottomTab.Screen
        name="Explorar"
        component={ExplorerScreen}
        options={{
          title: "Explorar",
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
