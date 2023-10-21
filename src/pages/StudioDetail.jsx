import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "@mui/system";
import { Typography } from "@mui/material";

export default function StudioDetail() {
  const { studioId } = useParams();

  const [data, setData] = useState();

  useEffect(() => {
    getStudioID();
  }, []);

  const getStudioID = async () => {
    await axios
      .get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/Studio/GetStudioByID/${studioId}`
      )
      .then((res) => {
        // setData(res.data);
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Container>
        <Typography gutterBottom variant="h5" component="div">
          {data && data.address}
        </Typography>
      </Container>
    </div>
  );
}