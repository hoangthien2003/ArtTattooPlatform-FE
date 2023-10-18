import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/CardService.css";

const CardService = (props) => {
  const { serviceId, serviceName, rating, studioId, price, imageService } =
    props;
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
    event.stopPropagation();
    console.log(2);
  };

  return (
    <Card sx={{ width: "90%" }} key={serviceId}>
      <CardActionArea onClick={handleOnClickService}>
        <CardMedia
          component="img"
          alt={serviceName}
          image={imageService}
          sx={{
            minHeight: 200,
            maxHeight: 200,
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
              <Rating size="small" value={rating} readOnly />
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
            </CardActions>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardService;
