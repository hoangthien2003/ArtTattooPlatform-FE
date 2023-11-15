import {
	AppBar,
	Avatar,
	Box,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useOpenDashboard } from "../../stores/useOpenDashboard";

function Navbar() {
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const navigate = useNavigate();
	const setOpenDashboard = useOpenDashboard((state) => state.setOpen);

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	const handleLogout = () => {
		localStorage.removeItem("token");
		handleCloseUserMenu();
		setOpenDashboard(false);
		navigate("/");
	};

	return (
		<AppBar
			position="static"
			sx={{
				backgroundColor: "transparent",
			}}
		>
			<Container maxWidth>
				<Toolbar disableGutters>
					<Box sx={{ flexGrow: 1 }}></Box>
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open menu">
							<IconButton
								onClick={handleOpenUserMenu}
								sx={{ p: 0 }}
							>
								<Avatar />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							<MenuItem
								onClick={() => {
									handleLogout();
								}}
							>
								<Typography>Sign out</Typography>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export default Navbar;
