import React from "react";
import { ThemeProvider } from "styled-components";

import  themes  from './src/global/styles/theme';

import { Dashboard } from "./src/pages/Dashboard/index";

export default function App() {
  return (
    <ThemeProvider theme={themes}>
      <Dashboard />
    </ThemeProvider>
  );
}
