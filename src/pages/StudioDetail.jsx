import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function StudioDetail() {
  const studioId = useParams();

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
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(data)

  return (
    <div>StudioDetail</div>
  )
}
