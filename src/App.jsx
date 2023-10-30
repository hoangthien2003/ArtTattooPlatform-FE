import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./lib/Theme";
import Footer from "./components/Footer/Footer";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { useGoogleOneTapLogin } from "@react-oauth/google";
// import HomePage from "./pages/Home";
// import Service from "./pages/Service";
import StudioPage from "./pages/StudioPage";
import StudioDetail from "./pages/StudioDetail";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ProfilePage from "./pages/ProfilePage";
import Service from "./pages/Service";
import DashboardManagerPage from "./pages/BookingManagement";
import { useUserInfo } from "./stores/useUserInfo";
import jwtDecode from "jwt-decode";

function App() {
	const HomePage = lazy(() => import("./pages/Home"));
	const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
	const Service = lazy(() => import("./pages/Service"));
	const Navbar = lazy(() => import("./components/Navbar/Navbar"));
	const NotAccess = lazy(() => import("./pages/NotAccess"));
	const BookingManagement = lazy(() => import("./pages/BookingManagement"));
	const NotFound = lazy(() => import("./pages/NotFound"));

	const [role, setRole] = useState();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token != null) {
			const user = jwtDecode(token);
			setRole(user.role);
		}
	}, []);

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
						<Route path="*" exact={true} element={<NotFound />} />
						<Route path="/" element={<HomePage />} />
						<Route path="/services" element={<Service />} />
						<Route
							path="/services/:serviceId"
							element={<ServiceDetail />}
						/>
						<Route path="/StudioPage" element={<StudioPage />} />
						<Route path="/profile" element={<ProfilePage />} />
						<Route
							path="/BookingManagement"
							element={<BookingManagement role={role} />}
						/>
						<Route
							path="/StudioDetail/:studioId"
							element={<StudioDetail />}
						></Route>
						<Route path="/access-denied" element={<NotAccess />} />
					</Routes>
					<Footer />
				</Suspense>
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
