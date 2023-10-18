import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./lib/Theme";
import Footer from "./components/Footer/Footer";
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useGoogleOneTapLogin } from "@react-oauth/google";
// import HomePage from "./pages/Home";
// import Service from "./pages/Service";
import StudioPage from "./pages/StudioPage";
import StudioDetail from "./pages/StudioDetail";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const HomePage = lazy(() => import("./pages/Home"));
  const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
  const Service = lazy(() => import("./pages/Service"));
  const Navbar = lazy(() => import("./components/Navbar/Navbar"));
  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      console.log(credentialResponse);
    },
    onError: () => {
      console.log("Login failed!");
    },
  });

  return (
    <BrowserRouter basename="/">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer />
        <Suspense fallback={<p>Loading...</p>}>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<Service />} />
            <Route path="/services/:serviceId" element={<ServiceDetail />} />
            <Route path="/StudioPage" element={<StudioPage />} />
            <Route path="/ProfilePage" element={<ProfilePage />} />
            <Route
              path="/StudioDetail/:studioId"
              element={<StudioDetail />}
            ></Route>
          </Routes>
          <Footer />
        </Suspense>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
