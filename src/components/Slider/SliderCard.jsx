import React from "react";
import CardService from "../Card/CardService";
import Slider from "react-slick";
import { Box } from "@mui/material";

const SliderCard = ({ serviceList }) => {
  const settings = {
    className: "center",
    dots: false,
    infinite: true,
    centerMode: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
  };

  return (
    <Box
      sx={{
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 5,
      }}
    >
      <Slider {...settings}>
        {serviceList.map((data, index) => {
          return (
            <CardService
              key={index}
              serviceId={data.serviceId}
              serviceName={data.serviceName}
              studioId={data.studioId}
              description={data.description}
              imageService={data.imageService}
              price={data.price}
            />
          );
        })}
      </Slider>
    </Box>
  );
};

export default SliderCard;
