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

const FormBooking = ({ phoneRef, dateRef, timeRef, studioId }) => {
  return (
    <Container maxWidth="sm">
      <Stack spacing={2} paddingTop={3} textAlign={"center"}>
        <Typography variant="h5">Contact Info</Typography>
        <Box>
          <Stack spacing={4}>
            <TextField
              variant="outlined"
              inputRef={phoneRef}
              placeholder="PhoneNumber"
              required
            />
            {/* <DateTimePicker inputRef={dateTimeRef} required /> */}
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
