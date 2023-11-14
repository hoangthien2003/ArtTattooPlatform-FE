import { Box } from "@mui/material";
import React, { useState, lazy } from "react";
import BookingChart from "../components/Dashboard/BookingChart";
import Drawer from "../components/Dashboard/Drawer";
import Navbar from "../components/Dashboard/Navbar";
import { Outlet, Route, Routes } from "react-router-dom";
import BookingManagement from "./BookingManagement";
import ServiceManagement from "./ServiceManagement";

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
        <Outlet />
      </Box>
    </Box>
  );
}

export default Dashboard;
