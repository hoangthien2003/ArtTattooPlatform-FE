import React from "react";
import CardService from "../Card/CardService";
import Slider from "react-slick";

const SliderCard = ({ serviceList }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
  };

  return (
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
  );
};

export default SliderCard;
