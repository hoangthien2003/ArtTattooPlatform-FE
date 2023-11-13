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
	Input,
	Stack,
	TextField,
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
import { useUserInfo } from "../stores/useUserInfo";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";



export default function ServiceManagement() {
	const user = useUserInfo((state) => state.user);
	const navigate = useNavigate();

	useEffect(() => {
		if (user.role != "MN" && user.role != "AD") navigate("/access-denied");
		return;
	}, []);


	//Api
	const [studio, setStudio] = useState(null);
	const [studioService, setServiceData] = useState([]);

	useEffect(() => {
		getStudio();
		getServiceByStudioId();
	}, []);

	const getStudio = async () => {
		try {
			const response = await axios.get(
				import.meta.env.VITE_REACT_APP_API_URL + `/Studio/GetStudioByManager/${user.userID}`
			);
			const studioData = response.data.studio;

			if (studioData) {
				setStudio(studioData);
				getServiceByStudioId(studioData.studioId);
			}
		} catch (error) {
			console.error("Error getting studio:", error);
		}
	};



	const getServiceByStudioId = async (studioId) => {
		try {
			const response = await axios.get(
				import.meta.env.VITE_REACT_APP_API_URL +
				`/Service/GetServiceByStudio/${studioId}`
			);
			setServiceData(response.data.$values);
			console.log(response)
		} catch (error) {
			console.log(error);
		}
	};
	//Add dialog
	const [openDialog, setOpenDialog] = useState(false);
	const [newServiceName, setNewServiceName] = useState('');
	const [newImageService, setNewImageService] = useState('');
	const [newDescription, setNewDescription] = useState('');
	const [newStudioId, setNewStudioId] = useState('');
	const [newPrice, setNewPrice] = useState('');
	const handleOpenDialog = () => {
		setOpenDialog(true);
	};
	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

	const addService = async () => {
		try {
			// Validate that all necessary fields are filled
			if (!newServiceName || !newImageService || !newDescription || !studio || !newPrice) {
				// Handle validation error, show a message, or prevent the addition
				console.error("All fields are required.");
				return;
			}

			// Extract studioId and ensure it is a number
			const studioId = typeof studio.studioId === "object" ? studio.studioId.studioId : studio.studioId;

			// Validate data types
			if (
				typeof newServiceName !== "string" ||
				typeof newImageService !== "string" ||
				typeof newDescription !== "string" ||
				typeof studioId !== "number" ||
				typeof newPrice !== "number"
			) {
				console.error("Invalid data types. Check the data types for each field.");
				return;
			}

			const token = localStorage.getItem("token");

			// Make an API call to add the new service
			const response = await axios.post(
				`${import.meta.env.VITE_REACT_APP_API_URL}/Service/Add`,
				{
					ServiceName: newServiceName,
					Description: newDescription,
					StudioID: studioId, // Ensure it's an integer
					Price: parseFloat(newPrice),
					Image: newImageService,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);

			const addedService = response.data;
			setServiceData((prevData) => [...prevData, addedService]);

			// Reset the input fields and close the dialog
			setNewServiceName('');
			setNewImageService('');
			setNewDescription('');
			setNewPrice('');
			handleCloseDialog();
		} catch (error) {
			// Handle errors as before
			console.error("Error adding service:", error);
		}
	};



	//Edit service
	const [openAddDialog, setOpenAddDialog] = useState(false);
	const [openEditDialog, setOpenEditDialog] = useState(false);
	const [editServiceId, setEditServiceId] = useState('');
	const [editServiceName, setEditServiceName] = useState('');
	const [editImageService, setEditImageService] = useState('');
	const [editDescription, setEditDescription] = useState('');
	const [editPrice, setEditPrice] = useState('');

	const handleEditClick = (service) => {
		setEditServiceId(service.serviceId);
		setEditServiceName(service.serviceName);
		setEditImageService(service.imageService);
		setEditDescription(service.description);
		setEditPrice(service.price);
		setOpenEditDialog(true);
	};


	const handleEditDialogClose = () => {
		setOpenEditDialog(false);
	};

	const updateService = async () => {
		try {

			// Make an API call to update the service
			const response = await axios.put(
				import.meta.env.VITE_REACT_APP_API_URL + `/Service/UpdateService/${editServiceId}`,
				{
					serviceName: editServiceName,
					imageService: editImageService,
					description: editDescription,
					price: parseFloat(editPrice),
				}
			);

			// Update the service data in the state
			const updatedService = response.data;
			setServiceData((prevData) =>
				prevData.map((service) =>
					service.serviceId === editServiceId ? updatedService : service
				)
			);

			// Reset the input fields and close the dialog
			setEditServiceId('');
			setEditServiceName('');
			setEditImageService('');
			setEditDescription('');
			setEditPrice('');
			handleEditDialogClose();
		} catch (error) {
			console.error("Error updating service:", error);
		}
	};
	//Delete service
	const deleteService = async (serviceId) => {
		try {
			const token = localStorage.getItem("token");

			// Make an API call to delete the service
			await axios.delete(
				`${import.meta.env.VITE_REACT_APP_API_URL}/Service/Delete/${serviceId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			// Remove the deleted service from the state
			setServiceData((prevData) => prevData.filter((service) => service.serviceId !== serviceId));

			// Close the edit/delete dialog
			handleEditDialogClose();
		} catch (error) {
			console.error("Error deleting service:", error);
		}
	};
	const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
	const [deleteSuccessDialog, setDeleteSuccessDialog] = useState(false);

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
							<TableCell>
								<Button variant="contained" sx={{ border: 2 }} onClick={handleOpenDialog}>
									Add
								</Button>
							</TableCell>
							<TableCell>serviceId</TableCell>
							<TableCell>serviceName</TableCell>
							<TableCell align="left">price</TableCell>
							<TableCell align="left">description</TableCell>
							<TableCell align="left">imageService</TableCell>
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
									<Button onClick={() => handleEditClick(service)}>
										Edit
									</Button>
								</TableCell>
								<TableCell component="th" scope="row">
									{service.serviceId}
								</TableCell>
								<TableCell component="th" scope="row">
									{service.serviceName}
								</TableCell>
								<TableCell align="left">{service.price}</TableCell>
								<TableCell align="left" className="ellipsis" sx={{ maxWidth: '200px' }}>{service.description}</TableCell>
								<TableCell align="left" className="ellipsis" sx={{ maxWidth: '200px' }}>
									<img src={service.imageService} style={{ width: "100px", height: "60px" }}>
									</img>

								</TableCell>
							</TableRow>
						))}

					</TableBody>
				</Table>
			</TableContainer>
			{/* add */}
			<Dialog open={openDialog} onClose={handleCloseDialog}>
				<DialogTitle>Add a New Service</DialogTitle>
				<DialogContent>
					<FormControl fullWidth>
						<TextField
							sx={{ minWidth: '300px' }}
							fullWidth
							label="Service Name"
							value={newServiceName}
							onChange={(e) => setNewServiceName(e.target.value)}
							margin="normal"
							variant="outlined"
						/>
						<TextField
							sx={{ minWidth: '300px' }}
							fullWidth
							label="Image"
							value={newImageService}
							onChange={(e) => setNewImageService(e.target.value)}
							margin="normal"
							variant="outlined"
						/>
						<TextField
							sx={{ minWidth: '300px' }}
							fullWidth
							label="Description"
							value={newDescription}
							onChange={(e) => setNewDescription(e.target.value)}
							margin="normal"
							variant="outlined"
						/>

						<TextField
							sx={{ minWidth: '300px' }}
							fullWidth
							label="Price"
							value={newPrice}
							onChange={(e) => setNewPrice(e.target.value)}
							margin="normal"
							variant="outlined"
						/>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog}>Cancel</Button>
					<Button onClick={addService} variant="contained">
						Add
					</Button>
				</DialogActions>
			</Dialog>
			{/* edit */}
			<Dialog open={openEditDialog} onClose={handleEditDialogClose}>
				<DialogTitle>Edit Service</DialogTitle>
				<DialogContent>
					<FormControl fullWidth>
						<TextField
							fullWidth
							label="Service Name"
							value={editServiceName}
							onChange={(e) => setEditServiceName(e.target.value)}
							margin="normal"
							variant="outlined"
							sx={{ minWidth: '300px' }}

						/>
						<TextField
							fullWidth
							label="Image"
							value={editImageService}
							onChange={(e) => setEditImageService(e.target.value)}
							margin="normal"
							variant="outlined"
							sx={{ minWidth: '300px' }}

						/>
						<TextField
							fullWidth
							label="Description"
							value={editDescription}
							onChange={(e) => setEditDescription(e.target.value)}
							margin="normal"
							variant="outlined"
							sx={{ minWidth: '300px' }}

						/>
						<TextField
							fullWidth
							label="Price"
							value={editPrice}
							onChange={(e) => setEditPrice(e.target.value)}
							margin="normal"
							variant="outlined"
							sx={{ minWidth: '300px' }}

						/>
						{/* ... other input fields ... */}
					</FormControl>
				</DialogContent>
				<DialogActions sx={{ justifyContent: 'center' }}>
					<Button onClick={handleEditDialogClose}>Cancel</Button>
					<Button onClick={updateService} variant="contained">
						Update
					</Button>
					<Button
						variant="contained"
						color="error"
						onClick={() => setConfirmDeleteDialog(true)}
					>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog open={confirmDeleteDialog} onClose={() => setConfirmDeleteDialog(false)}>
				<DialogTitle>Confirm Delete</DialogTitle>
				<DialogContent>
					Are you sure you want to delete this service?
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setConfirmDeleteDialog(false)}>No</Button>
					<Button
						onClick={() => {
							setConfirmDeleteDialog(false);
							deleteService(editServiceId);
							setDeleteSuccessDialog(true);
						}}
						variant="contained"
						color="error"
					>
						Yes, Delete
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog open={deleteSuccessDialog} onClose={() => setDeleteSuccessDialog(false)}>
				<DialogTitle>Delete Success</DialogTitle>
				<DialogContent>
					The service has been deleted successfully.
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDeleteSuccessDialog(false)}>OK</Button>
				</DialogActions>
			</Dialog>

		</Container>
	);
}
