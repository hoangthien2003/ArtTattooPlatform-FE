import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
	Breadcrumbs,
	Button,
	Container,
	Stack,
	Typography,
} from "@mui/material";
import { Home } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

export default function BookingHistory(props) {
	const { role } = props;
	const navigate = useNavigate();
	React.useEffect(() => {
		if (role != "MB" && role != "AD") navigate("/access-denied");
	}, []);
	return (
		<Container className="mt-5 mb-5">
			<Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 5 }}>
				<Stack
					spacing={1}
					direction={"row"}
					justifyContent={"center"}
					alignItems={"center"}
				>
					<Home fontSize="inherit" />
					<Typography
						variant="body1"
						component={Link}
						to="/"
						sx={{
							textDecoration: "none",
							"&:hover": {
								color: "#FF7F22",
							},
						}}
					>
						Home
					</Typography>
				</Stack>
				<Typography variant="body1" sx={{ textDecoration: "none" }}>
					Booking History
				</Typography>
			</Breadcrumbs>
			<Typography variant="h5" className="mb-3">
				Booking History
			</Typography>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Service</TableCell>
							<TableCell align="left">Price</TableCell>
							<TableCell align="left">Studio</TableCell>
							<TableCell align="left">Time</TableCell>
							<TableCell align="left">Status</TableCell>
							<TableCell align="left"></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow
							sx={{
								"&:last-child td, &:last-child th": {
									border: 0,
								},
							}}
						>
							<TableCell component="th" scope="row">
								Tattoo
							</TableCell>
							<TableCell align="left">TAINK</TableCell>
							<TableCell align="left">100.000</TableCell>
							<TableCell align="left">12:11:11</TableCell>
							<TableCell align="left">pending</TableCell>
							<TableCell align="left">
								<Link sx={{ textDecoration: "none" }}>
									Cancel Booking
								</Link>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
}
