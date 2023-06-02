import React from "react";
import AppLoading from 'expo-app-loading'
import { ThemeProvider } from "styled-components";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';


import  themes  from './src/global/styles/theme';

import { Dashboard } from "./src/pages/Dashboard";
import { Register } from "./src/pages/Register";
import { CategorySelect } from "./src/pages/CategorySelect";

export default function App() {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if(!fontsLoaded){
    return <AppLoading></AppLoading>
  }
  return (
    <ThemeProvider theme={themes}>
      <Register />
    </ThemeProvider>
  );
}
