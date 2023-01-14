import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Navigation from "./src/navigation";
import { AuthProvider } from "./src/contexts/auth";

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <Navigation />
        <StatusBar />
      </SafeAreaProvider>
    </AuthProvider>
  );
}
