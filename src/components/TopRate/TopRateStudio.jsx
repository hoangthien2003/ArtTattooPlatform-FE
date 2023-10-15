import { Box, Divider, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CardStudio from "../Card/CardStudio";

const TopRateStudio = () => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    getStudio();
  }, []);

  const getStudio = async () => {
    await axios
      .get(import.meta.env.VITE_REACT_APP_API_URL + "/Studio/GetAll")
      .then((res) => {
        setdata(res.data.$values);
      })
      .catch((err) => setdata(err));
  };
  return (
    <Box
      sx={{
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: "#322F2F",
        textAlign: "center",
        borderRadius: 5,
      }}
    >
      <Stack
        spacing={2}
        divider={
          <Divider
            orientation="horizontal"
            flexItem
            sx={{
              width: "80%",
              placeSelf: "center",
            }}
          />
        }
      >
        <Typography variant="h5">Top Rate Studio</Typography>
        {data.map((studio, index) => {
          return (
            <CardStudio
              key={index}
              studioId={studio.studioId}
              studioName={studio.studioName}
              logo={studio.logo}
            />
          );
        })}
      </Stack>
    </Box>
  );
};

export default TopRateStudio;