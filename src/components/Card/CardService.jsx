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
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/CardService.css";
import Booking from "../Modal/Booking";

const CardService = (props) => {
  const { serviceId, serviceName, studioId, price, imageService, rate } = props;
  const [open, setOpen] = useState(false);
  const [studioName, setStudioName] = useState("");
  const [studioLogo, setStudioLogo] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getStudio();
  }, []);

  const getStudio = async () => {
    await axios
      .get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/Studio/GetStudioByID/${studioId}`
      )
      .then((res) => {
        setStudioLogo(res.data.logo);
        setStudioName(res.data.studioName);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOnClickService = (event) => {
    console.log(1);
    navigate(`/services/${serviceId}`);
  };

  const handleOnClickBooking = (event) => {
    setOpen(true);
    console.log(2);
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
          <Typography>{studioName}</Typography>
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
            <Rating
              size="small"
              value={rate}
              defaultValue={0}
              precision={1}
              readOnly
            />
            <Typography variant="subtitle2">Cost: {price} VNĐ</Typography>
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
              <Booking props={props} />
            </Modal>
          </CardActions>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CardService;
