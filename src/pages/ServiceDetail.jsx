import React from "react";
import { useParams } from "react-router-dom";

const ServiceDetail = () => {
  const serviceID = useParams();

  return <div>{serviceID}</div>;
};

export default ServiceDetail;
