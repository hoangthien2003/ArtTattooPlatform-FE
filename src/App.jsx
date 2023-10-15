import { CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import theme from "./lib/Theme";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Home />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
