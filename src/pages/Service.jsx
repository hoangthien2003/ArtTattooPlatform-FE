import { Home } from "@mui/icons-material";
import { Breadcrumbs, Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PaginationCard from "../components/Pagination/PaginationCard";
import axios from "axios";

const Service = () => {
  const [serviceList, setServiceList] = useState([]);

  useEffect(() => {
    getServiceList();
  }, []);

  const getServiceList = async () => {
    await axios
      .get(import.meta.env.VITE_REACT_APP_API_URL + "/Service/GetAll")
      .then((res) => {
        setServiceList(res.data.$values);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container maxWidth="lg" sx={{ paddingTop: 5, paddingBottom: 5 }}>
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
      </Breadcrumbs>
      <PaginationCard serviceList={serviceList} />
    </Container>
  );
};

export default Service;
