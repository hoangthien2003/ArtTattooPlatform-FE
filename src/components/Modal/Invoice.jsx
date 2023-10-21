import { Box, Container, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

const Invoice = (props) => {
  const { booking, data } = props;

  return (
    <Container sx={{ marginTop: 5, marginBottom: 5 }}>
      <Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Stack spacing={2}>
              <Typography variant="subtitle2">Name:</Typography>
              <Typography variant="subtitle2">PhoneNumber:</Typography>
              <Typography variant="subtitle2">Date & time:</Typography>
              <Typography variant="subtitle2">Service:</Typography>
              <Typography variant="subtitle2">Studio:</Typography>
              <Typography variant="subtitle2">Price:</Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="column" spacing={2}>
              <Typography variant="subtitle2">{booking.name}</Typography>
              <Typography variant="subtitle2">{booking.phone}</Typography>
              <Typography variant="subtitle2">{booking.dateTime}</Typography>
              <Typography variant="subtitle2">
                {data.service.serviceName}
              </Typography>
              <Typography variant="subtitle2">
                {data.studio.studioName}
              </Typography>
              <Typography variant="subtitle2">
                {data.service.price}.000 VND
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Invoice;
