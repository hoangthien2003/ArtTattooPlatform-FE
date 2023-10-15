import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./lib/Theme";
import Footer from "./components/Footer/Footer";
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const HomePage = lazy(() => import("./pages/Home"));

  return (
    <BrowserRouter basename="/">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
          <Footer />
        </Suspense>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
