import { Container, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SliderCard from "../components/Slider/SliderCard";
import axios from "axios";
import PaginationCard from "../components/Pagination/PaginationCard";
import TopRateStudio from "../components/TopRate/TopRateStudio";
const Home = () => {
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
    <Container maxWidth="xl">
      <Stack spacing={3} direction={"column"} paddingTop={5} paddingBottom={5}>
        <Typography variant="h5">TOP RATE SERVICE</Typography>
        <SliderCard serviceList={serviceList} />
        <Typography variant="h5">NEW SERVICE</Typography>
      </Stack>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={8}>
          <PaginationCard serviceList={serviceList} />
        </Grid>
        <Grid item xs={4}>
          <TopRateStudio />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
