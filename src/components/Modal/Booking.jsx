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

const steps = ["User choose", "Bill"];

const Booking = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const nameRef = useRef();
  const phoneRef = useRef();
  // const dateTimeRef = useRef();
  const timeRef = useRef();
  const dateRef = useRef();
  const [booking, setBooking] = useState({
    name: "",
    phone: "",
    dateTime: "",
  });
  const { data } = props;

  const phoneRegExp = /^\d{10,12}$/;
  const nameRegExp = /^[a-zA-Z]+$/;

  const formatTime = (time) => {
    const hours = time.split(":")[0];
    const minutes = time.split(":")[1];

    const timeOfDay = hours >= 12 ? "PM" : "AM";

    return `${hours}:${minutes} ${timeOfDay}`;
  };

  const handleNext = () => {
    const nameValue = nameRef.current.value;
    const phoneValue = phoneRef.current.value;
    const dateValue = dateRef.current.value;
    const timeValue = timeRef.current.value;
    const dateTimeValue = dateValue.concat(" ", formatTime(timeValue));
    // const dateTimeValue = dateTimeRef.current.value;
    if (!phoneRegExp.test(phoneValue)) {
      // Phone number must only contain numbers
      return;
    }

    if (!nameRegExp.test(nameValue)) {
      // Name must only contain letters
      return;
    }

    if (nameValue && phoneValue && dateValue && timeValue) {
      // console.log(nameValue, phoneValue, dateValue, timeValue);
      // console.log(nameValue, phoneValue, dateTimeValue);
      setBooking({
        name: nameValue,
        phone: phoneValue,
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
    if (token != null) {
      const email = jwtDecode(token).email;
      const bookingRequest = {
        PhoneNumber: booking.phone,
        BookingDate: booking.dateTime,
        ServiceId: data.service.serviceId,
        StudioId: data.studio.studioID,
        Total: data.service.price,
      };
      console.log("bookingRequest: " + bookingRequest);
      await axios
        .post(
          `${
            import.meta.env.VITE_REACT_APP_API_URL
          }/Booking/AddBooking/${email}`,
          bookingRequest,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          toast.success("Booking saved successfully");
          // console.log(token);
          console.log(res);
        })
        .catch((err) => {
          toast.error("Error saving booking!!!!!");
          console.log(err);
        });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 10, backgroundColor: "#1F1E1E" }}>
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
            nameRef={nameRef}
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
