import { CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import theme from "./lib/Theme";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";
import { CssBaseline } from "@mui/material";
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const HomePage = lazy(() => import("./pages/Home"));

  return (
    <BrowserRouter basename="/">
     <ThemeProvider theme={theme}>
       <CssBaseline />
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
