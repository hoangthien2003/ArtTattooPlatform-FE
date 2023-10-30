import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, DateTimePicker, TimePicker } from "@mui/x-date-pickers";
import React, { useState } from "react";
import SliderSlotTime from "../Slider/SliderSlotTime";

const FormBooking = ({ nameRef, phoneRef, dateRef, timeRef, studioId }) => {
  return (
    <Container maxWidth="sm">
      <Stack spacing={2} paddingTop={3} textAlign={"center"}>
        <Typography variant="h5">Contact Info</Typography>
        <Box>
          <Stack spacing={4}>
            <TextField
              id="user"
              label="Username"
              variant="outlined"
              inputRef={nameRef}
              required
            />
            <TextField
              id="phone"
              label="PhoneNumber"
              variant="outlined"
              inputRef={phoneRef}
              type="tel"
              pattern="[0-9]{10}"
              required
            />
            <DatePicker inputRef={dateRef} required />
            {/* <TimePicker inputRef={timeRef} required /> */}
            <SliderSlotTime studioId={studioId} timeRef={timeRef} />
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default FormBooking;
