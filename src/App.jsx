import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./lib/Theme";
import Footer from "./components/Footer/Footer";
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const HomePage = lazy(() => import("./pages/Home"));
  const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
  return (
    <BrowserRouter basename="/">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Suspense fallback={<p>Loading...</p>}>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services:serviceId" element={<ServiceDetail />} />
          </Routes>
          <Footer />
        </Suspense>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
