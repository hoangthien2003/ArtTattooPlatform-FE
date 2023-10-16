import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ServiceDetail = () => {
  const serviceId = useParams();

  const [data, setData] = useState();

  useEffect(() => {
    getServiceByID();
  }, []);

  const getServiceByID = async () => {
    await axios
      .get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/v2/GetServiceByID/${serviceId}`
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return <div>{data}</div>;
};

export default ServiceDetail;
