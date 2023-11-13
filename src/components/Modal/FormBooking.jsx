import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, DateTimePicker, TimePicker } from "@mui/x-date-pickers";
import React, { useState } from "react";
import SliderSlotTime from "../Slider/SliderSlotTime";

const currencies = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 6,
    label: "6",
  },
];

const FormBooking = ({ phoneRef, dateRef, timeRef, countRef, studioId }) => {
  const [error, setError] = useState("");
  const [label, setLabel] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const onChange = (e) => {
    setPhoneNumber(e.target.value);
    ValidatePhoneNumber();
  };

  const ValidatePhoneNumber = () => {
    const regex = /^0[0-9]{8}$/;

    if (phoneNumber.trim() === "" || phoneNumber.length < 10) {
      setError(true);
      setLabel("PhoneNumber is required");
    }
    if (!regex.test(phoneNumber)) {
      setError(true);
      setLabel("Please input correct format phoneNumber");
    } else {
      setError("");
      setLabel("");
    }
  };

  return (
    <Container maxWidth="sm">
      <Stack spacing={2} paddingTop={3} textAlign={"center"}>
        <Typography variant="h5">Contact Info</Typography>
        <Box>
          <Grid container spacing={4}>
            <Grid item xs={8}>
              <TextField
                sx={{ width: "100%" }}
                error={error}
                helperText={label}
                variant="outlined"
                inputRef={phoneRef}
                onChange={onChange}
                placeholder="PhoneNumber"
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                sx={{ width: "100%" }}
                select
                label={<Typography color="gray">Participants</Typography>}
                inputRef={countRef}
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <DatePicker sx={{ width: "100%" }} inputRef={dateRef} required />
            </Grid>
            <Grid item xs={12}>
              <SliderSlotTime studioId={studioId} timeRef={timeRef} />
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Container>
  );
};

export default FormBooking;
