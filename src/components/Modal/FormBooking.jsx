import { Box, Button, Container, Stack, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import React, { useState } from "react";

const FormBooking = ({ nameRef, phoneRef, datetimeRef }) => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ paddingTop: 10, paddingBottom: 10 }}>
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
          <DateTimePicker inputRef={datetimeRef} required />
        </Stack>
      </Box>
    </Container>
  );
};

export default FormBooking;
