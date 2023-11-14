import {
	Box,
	List,
	ListItem,
	Typography,
	ListSubheader,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import LogoIcon from "../../assets/images/Logo.png";
import {
	DesignServices,
	Home,
	Logout,
	Person,
	ShoppingCartCheckout,
	StackedBarChart,
	VerifiedUser,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

function Drawer() {
	const nav = [
		{
			icon: <StackedBarChart />,
			name: "Overview",
			path: "./",
		},
		{
			icon: <ShoppingCartCheckout />,
			name: "Booking Management",
			path: "./",
		},
		{
			icon: <DesignServices />,
			name: "Service Management",
			path: "./",
		},
		{
			icon: <Person />,
			name: "Account",
			path: "./",
		},
	];
	const [choosedBtn, setChoosedBtn] = useState(0);
	const navigate = useNavigate();

	return (
		<Box
			sx={{
				backgroundColor: "#2c2b2b",
				width: "23rem",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					marginTop: 2,
					marginBottom: 2,
				}}
			>
				<img src={LogoIcon} width={78} height={78} />
				<Typography variant="h6">
					VNINK
					<br />
					DASHBOARD
				</Typography>
			</Box>
			<div
				style={{
					width: "100%",
					backgroundColor: "#686666",
					height: 1,
				}}
			></div>
			<List
				component="nav"
				sx={{
					marginTop: 3,
				}}
			>
				{nav.map((navItem, index) => {
					return (
						<ListItemButton
							LinkComponent={Link}
							key={index}
							to={navItem.path}
							sx={{
								backgroundColor:
									index === choosedBtn ? "#FF7F22" : "",
								marginBottom: 2,
								borderRadius: 1,
							}}
							onClick={() => {
								setChoosedBtn(index);
							}}
						>
							<ListItemIcon>{navItem.icon}</ListItemIcon>
							<ListItemText>{navItem.name}</ListItemText>
						</ListItemButton>
					);
				})}
			</List>
			<Box
				sx={{
					flexGrow: 15,
				}}
			></Box>
			<div
				style={{
					width: "100%",
					backgroundColor: "#686666",
					height: 1,
				}}
			></div>
			<ListItemButton
				sx={{
					marginBottom: 2,
					borderRadius: 1,
				}}
				onClick={() => {
					localStorage.removeItem("token");
					navigate(0);
				}}
			>
				<ListItemIcon>
					<Logout />
				</ListItemIcon>
				<ListItemText>Sign out</ListItemText>
			</ListItemButton>
		</Box>
	);
}

export default Drawer;
