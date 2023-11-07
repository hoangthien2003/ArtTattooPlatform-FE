import {
	Avatar,
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Modal,
	Rating,
	Skeleton,
	Stack,
	Typography,
} from "@mui/material";
import axios from "axios";
import React, { forwardRef, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/CardService.css";
import Booking from "../Modal/Booking";
import { useUserInfo } from "../../stores/useUserInfo";
import { toast } from "react-toastify";

const CardService = (props) => {
	const { serviceId, serviceName, studioId, price, imageService, rate } =
		props;
	const [open, setOpen] = useState(false);
	const [studioName, setStudioName] = useState("");
	const [studioLogo, setStudioLogo] = useState("");
	// console.log("rate: ", rate);
	// console.log("props: ", props);
	const [data, setData] = useState();

	const navigate = useNavigate();

	useEffect(() => {
		getStudio();
		getServiceById();
	}, []);

	const getStudio = async () => {
		await axios
			.get(
				import.meta.env.VITE_REACT_APP_API_URL +
					`/Studio/GetStudioByID/${studioId}`
			)
			.then((res) => {
				// console.log(res.data);
				setStudioLogo(res.data.logo);
				setStudioName(res.data.studioName);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getServiceById = async () => {
		await axios
			.get(
				import.meta.env.VITE_REACT_APP_API_URL +
					`/Service/v2/GetServiceByID/${serviceId}`
			)
			.then((res) => {
				// console.log(res.data);
				setData(res.data); //data: {$id, service, studio}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleOnClickService = (event) => {
		navigate(`/services/${serviceId}`);
	};

	const handleOnClickBooking = (event) => {
		const token = localStorage.getItem("token");
		if (token == null) {
			toast.error("Please login to continue!!!");
			return;
		}
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Card sx={{ width: "90%" }} key={serviceId}>
			<CardMedia
				onClick={handleOnClickService}
				component="img"
				alt={serviceName}
				image={imageService}
				sx={{
					minHeight: 200,
					maxHeight: 200,
					cursor: "pointer",
				}}
			/>
			<CardContent>
				<Stack
					spacing={3}
					direction={"row"}
					justifyContent={"flex-start"}
					alignItems={"center"}
				>
					<Avatar alt={studioName} src={studioLogo} />
					<Typography sx={{fontSize:'13px'}}>{studioName}</Typography>
				</Stack>
			</CardContent>
			<CardContent>
				<Stack spacing={3} sx={{ position: "relative" }}>
					<Stack spacing={1}>
						<Typography
							className="ellipsis-serviceName"
							variant="body2"
							color="#7C7676"
						>
							{serviceName}
						</Typography>
						<Rating size="small" value={rate} readOnly />
						<Typography variant="subtitle2">
							Cost: {price} VNĐ
						</Typography>
					</Stack>
					<CardActions>
						<Button
							size="medium"
							variant="outlined"
							sx={{ position: "absolute", right: 0 }}
							onClick={handleOnClickBooking}
						>
							<Typography variant="body2" color="#FF7F22">
								Booking
							</Typography>
						</Button>
						<Modal
							open={open}
							onClose={handleClose}
							aria-labelledby="modal-modal-title"
							aria-describedby="modal-modal-description"
						>
							<Booking data={data} />
						</Modal>
					</CardActions>
				</Stack>
			</CardContent>
		</Card>
	);
};

export default CardService;
