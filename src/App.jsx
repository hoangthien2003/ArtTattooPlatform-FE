import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./lib/Theme";
import Footer from "./components/Footer/Footer";
import React, { Suspense, lazy, useEffect, useState } from "react";
import {
	BrowserRouter,
	Outlet,
	Route,
	Routes,
	useNavigate,
} from "react-router-dom";
import { useGoogleOneTapLogin } from "@react-oauth/google";
// import HomePage from "./pages/Home";
// import Service from "./pages/Service";
// import StudioPage from "./pages/StudioPage";
import StudioDetail from "./pages/StudioDetail";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ProfilePage from "./pages/ProfilePage";
import jwtDecode from "jwt-decode";
import StudioPage from "./pages/StudioPage";
import NotAccess from "./pages/NotAccess";
import NotFound from "./pages/NotFound";

function App() {
	const HomePage = lazy(() => import("./pages/Home"));
	const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
	const Service = lazy(() => import("./pages/Service"));
	const Navbar = lazy(() => import("./components/Navbar/Navbar"));
	const BookingManagement = lazy(() => import("./pages/BookingManagement"));
	const BookingHistory = lazy(() => import("./pages/BookingHistory"));
	const ArtistSchedule = lazy(() => import("./pages/ArtistSchedule"));
	const ServiceManagement = lazy(() => import("./pages/ServiceManagement"));

	const [role, setRole] = useState();

	useEffect(() => {
		decodeToken();
	}, []);

	const decodeToken = () => {
		try {
			const token = localStorage.getItem("token");
			if (token != null) {
				const user = jwtDecode(token);
				setRole(user.role);
			}
		} catch (e) {
			console.log(e);
		}
	};

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
					<Navbar role={role} />
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
							path="/BookingHistory"
							element={<BookingHistory role={role} />}
						/>
						<Route
							path="/ArtistSchedule"
							element={<ArtistSchedule role={role} />}
						/>
						<Route
							path="/ServiceManagement"
							element={<ServiceManagement role={role} />}
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
