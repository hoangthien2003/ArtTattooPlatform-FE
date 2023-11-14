import { Box } from "@mui/material";
import React, { useState } from "react";
import BookingChart from "../components/Dashboard/BookingChart";
import Drawer from "../components/Dashboard/Drawer";
import Navbar from "../components/Dashboard/Navbar";
import { Route, Routes } from "react-router-dom";
import Overview from "../components/Dashboard/Overview";

function Dashboard() {
	return (
		<Box
			className="app"
			sx={{
				display: "flex",
				height: "100vh",
			}}
		>
			<Drawer />
			<Box
				sx={{
					width: "100vw",
				}}
			>
				<Navbar />
				<Routes>
					<Route index element={<Overview />} />
				</Routes>
			</Box>
		</Box>
	);
}

export default Dashboard;
