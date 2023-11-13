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
  const [activeStep, setActiveStep] = useState(0);
  const phoneRef = useRef();
  const timeRef = useRef();
  const dateRef = useRef();
  const countRef = useRef();
  const [booking, setBooking] = useState({
    name: "",
    phoneNumber: "",
    dateTime: "",
    count: 0,
  });
  const { data } = props;
  console.log(data);
  const navigate = useNavigate();
  const userInfo = useUserInfo((state) => state.user);

  const formatTime = (time) => {
    const hours = time.split(":")[0];
    const minutes = time.split(":")[1];

    const timeOfDay = hours >= 12 ? "PM" : "AM";

    if (hours >= 12) {
      return `${hours - 12}:${minutes} ${timeOfDay}`;
    }
    return `${hours}:${minutes} ${timeOfDay}`;
  };

  const handleNext = () => {
    const phoneValue = phoneRef.current.value;
    const dateValue = dateRef.current.value;
    const timeValue = timeRef.current.value;
    const countValue = countRef.current.value;
    const dateTimeValue = dateValue.concat(", ", formatTime(timeValue));
    let today = new Date();
    let currentDay = today.toLocaleDateString();
    let currentTime = today.toLocaleString();
    // console.log("currentTime: " + currentTime);
    // console.log("dateTimeValue: " + dateTimeValue);

    console.log(countValue);

    if (!dateValue && !timeValue && !phoneValue && countValue === undefined) {
      toast.error("Please input form booking!");
    } else if (phoneValue.trim() === "") {
      toast.error("Must be input phoneNumber!");
    } else if (countValue === undefined) {
      toast.error("Must be selectable participants!");
    } else if (dateValue < currentDay) {
      toast.error("Please don't select a pass date!");
    } else if (dateTimeValue < currentTime) {
      toast.error("Please don't select a pass time!");
    } else {
      setBooking({
        name: userInfo.userName,
        phoneNumber: phoneValue,
        dateTime: dateTimeValue,
        count: countValue,
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
      fullName: userInfo.userName,
      phoneNumber: booking.phoneNumber,
      bookingDate: booking.dateTime,
      quantity: booking.count,
      serviceId: data.service.serviceId,
      studioId: data.studio.studioID,
      total: data.service.price * booking.count,
    };
    console.log(bookingRequest);
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
        navigate("/");
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
            countRef={countRef}
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
