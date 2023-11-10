import {
  Box,
  Button,
  Container,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import FormBooking from "./FormBooking";
import Invoice from "./Invoice";
import { Navigate, useNavigate } from "react-router-dom";
import { useUserInfo } from "../../stores/useUserInfo";

const steps = ["User choose", "Bill"];

const Booking = (props) => {
  const user = useUserInfo((state) => state.user);
  const [activeStep, setActiveStep] = useState(0);
  const phoneRef = useRef();
  const timeRef = useRef();
  const dateRef = useRef();
  const [booking, setBooking] = useState({
    name: "",
    phoneNumber: "",
    dateTime: "",
  });
  const { data } = props;
  const navigate = useNavigate();
  const userInfo = useUserInfo((state) => state.user);

  const formatTime = (time) => {
    const hours = time.split(":")[0];
    const minutes = time.split(":")[1];

    const timeOfDay = hours >= 12 ? "PM" : "AM";

    return `${hours}:${minutes} ${timeOfDay}`;
  };

  const handleNext = () => {
    const phoneValue = phoneRef.current.value;
    const dateValue = dateRef.current.value;
    const timeValue = timeRef.current.value;
    const dateTimeValue = dateValue.concat(" ", formatTime(timeValue));

    if (dateValue && timeValue) {
      // console.log(nameValue, phoneValue, dateValue, timeValue);
      // console.log(nameValue, phoneValue, dateTimeValue);
      setBooking({
        name: user.userName,
        phoneNumber: phoneValue,
        dateTime: dateTimeValue,
      });

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const bookingRequest = {
      fullName: user.userName,
      phoneNumber: booking.phoneNumber,
      bookingDate: booking.dateTime,
      serviceId: data.service.serviceId,
      studioId: data.studio.studioID,
      total: data.service.price,
    };
    await axios
      .post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/Booking/AddBooking/${
          userInfo.email
        }`,
        bookingRequest,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success("Booking saved successfully");
        // console.log(token);
        console.log(res);
        navigate(0);
      })
      .catch((err) => {
        toast.error("Error saving booking!!!!!");
        console.log(err);
      });
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4, backgroundColor: "#1F1E1E" }}>
      <Box sx={{ width: "100%", paddingTop: 5, paddingBottom: 5 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === 0 && (
          <FormBooking
            studioId={data.studio.studioID}
            phoneRef={phoneRef}
            dateRef={dateRef}
            timeRef={timeRef}
          />
        )}
        {activeStep === 1 && <Invoice booking={booking} data={data} />}

        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          {activeStep === 0 && <Button onClick={handleNext}>Next</Button>}
          {activeStep === 1 && <Button onClick={handleSubmit}>Submit</Button>}
        </Box>
      </Box>
    </Container>
  );
};

export default Booking;
