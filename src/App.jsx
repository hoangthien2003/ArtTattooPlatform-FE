import { CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import theme from "./lib/Theme";
import Home from "./pages/Home";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Home />
    </ThemeProvider>
  );
}

export default App;
