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
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Home } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function ServiceManagement(props) {
	const { role } = props;
	const navigate = useNavigate();

	React.useEffect(() => {
		if (role != "MN" && role != "AD") navigate("/access-denied");
		return;
	}, []);

	const handleChange = (event) => {
		setArtist(event.target.value);
	};
	//Api
	const [studioService, setStudioService] = useState([]);
	useEffect(() => {
		getStudioService();
	}, []);

	const getStudioService = async () => {
		await axios
			.get(import.meta.env.VITE_REACT_APP_API_URL + "/Service/GetAll")
			.then((res) => {
				setStudioService(res.data.$values);
			})
			.catch((err) => {
				console.log(err);
			});
		console.log(studioService)
	};
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
					Service Management
				</Typography>
			</Breadcrumbs>
			<Typography variant="h5" className="mb-3">
				Service Dashboard
			</Typography>
			<TableContainer component={Paper} style={{ maxHeight: '300px', overflowY: 'auto' }}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>serviceName</TableCell>
							<TableCell align="left">price</TableCell>
							<TableCell align="left">description</TableCell>
							<TableCell align="left">imageService</TableCell>
							<TableCell align="left">imageService</TableCell>
							<TableCell align="left">imageService</TableCell>
							<TableCell align="left">imageService</TableCell>

							<TableCell align="left"></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{studioService.map((service) => (
							<TableRow
								sx={{
									"&:last-child td, &:last-child th": {
										border: 0,
									},
								}}
							>
								<TableCell component="th" scope="row">
									{service.serviceName}
								</TableCell>
								<TableCell align="left">{service.price}</TableCell>
								<TableCell align="left" className="ellipsis" sx={{ maxWidth: '200px' }}>{service.description}</TableCell>
								<TableCell align="left" className="ellipsis" sx={{ maxWidth: '200px' }}>{service.imageService}</TableCell>
								<TableCell align="left" className="ellipsis" sx={{ maxWidth: '200px' }}>{service.imageService}</TableCell>
								<TableCell align="left" className="ellipsis" sx={{ maxWidth: '200px' }}>{service.imageService}</TableCell>
								<TableCell align="left" className="ellipsis" sx={{ maxWidth: '200px' }}>{service.imageService}</TableCell>
								<TableCell align="left">edit</TableCell>
							</TableRow>
						))}

					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
}
