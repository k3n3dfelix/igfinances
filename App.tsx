import React from "react";
import { StatusBar } from "react-native";

import AppLoading from "expo-app-loading";
import { ThemeProvider } from "styled-components";
import "intl";
import "intl/locale-data/jsonp/pt-BR";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import themes from "./src/global/styles/theme";

// import { Routes } from "./src/routes";
import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./src/routes/app.routes";

import { Dashboard } from "./src/pages/Dashboard";
import { Register } from "./src/pages/Register";
import { CategorySelect } from "./src/pages/CategorySelect";
import { SignIn } from "./src/pages/SignIn";

import { AuthProvider } from "./src/hooks/auth";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading></AppLoading>;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={themes}>
      <NavigationContainer>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          <AuthProvider>
            <SignIn />
          </AuthProvider>
          </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
