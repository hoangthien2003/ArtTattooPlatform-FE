import { Home } from "@mui/icons-material";
import {
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SliderPicture from "../components/Slider/SliderPicture";
import Feedback from "../components/Feedback/Feedback";

const ServiceDetail = () => {
  const { serviceId } = useParams();

  const [data, setData] = useState();

  useEffect(() => {
    getServiceByID();
  }, []);

  const getServiceByID = async () => {
    await axios
      .get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/Service/v2/GetServiceByID/${serviceId}`
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data); //data: {$id, service, studio}
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 5, paddingBottom: 5 }}>
      {/* Breadcrumb */}
      <Breadcrumbs aria-label="breadcrumb">
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
            sx={{ textDecoration: "none" }}
          >
            Home
          </Typography>
        </Stack>
        <Typography
          variant="body1"
          component={Link}
          to="/services"
          sx={{ textDecoration: "none" }}
        >
          Service
        </Typography>
        <Typography
          variant="body1"
          component={Link}
          to="/services"
          sx={{ textDecoration: "none" }}
        >
          {data && data.service && data.service.serviceName}
        </Typography>
      </Breadcrumbs>
      {/* Contain service card */}
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        marginTop={3}
        marginBottom={3}
      >
        <Grid item xs={6}>
          <SliderPicture />
        </Grid>
        <Grid item xs={6}>
          <Stack direction={"column"} spacing={1}>
            <Typography variant="h5" color="white">
              {data && data.service && data.service.serviceName}
            </Typography>
            <Stack direction={"row"} spacing={2} alignContent={"center"}>
              <Rating size="medium" defaultValue={4} precision={0.5} readOnly />
              <Typography variant="subtitle2">Số lần đánh giá</Typography>
            </Stack>
            <Typography variant="subtitle2">
              {data && data.service && data.service.price} VNĐ
            </Typography>
            <Typography variant="body2">
              {data && data.service && data.service.description}
            </Typography>
            <Button fullWidth variant="outlined">
              Booking
            </Button>
          </Stack>
        </Grid>
      </Grid>
      {/* Feedback from member */}
      <Feedback />
    </Container>
  );
};

export default ServiceDetail;
