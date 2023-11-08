import React from "react";
import { Box, Button, Icon, Typography } from "@mui/material";
import { ProductionQuantityLimitsTwoTone } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function CartEmpty() {
	const navigate = useNavigate();
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				height: "35rem",
				alignItems: "center",
				flexDirection: "column",
			}}
		>
			<ProductionQuantityLimitsTwoTone
				sx={{
					fontSize: 110,
					marginBottom: 3,
				}}
			/>
			<Typography
				variant="h2"
				sx={{
					display: "flex",
					gap: 2,
				}}
			>
				Your Cart is{""}
				<Typography color="primary" variant="h2">
					Empty!
				</Typography>
			</Typography>
			<Typography
				sx={{
					marginTop: 5,
				}}
			>
				Must add services on the cart before you proceed to check out.
			</Typography>
			<Button
				variant="outlined"
				sx={{
					marginTop: 5,
					paddingLeft: 12,
					paddingRight: 12,
					paddingTop: 3,
					paddingBottom: 3,
					fontSize: 18,
					borderRadius: 10,
				}}
				onClick={() => navigate("/")}
			>
				Return to booking
			</Button>
		</Box>
	);
}

export default CartEmpty;
