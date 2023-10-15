import { Box, Grid, Pagination, Stack } from "@mui/material";
import React, { useState } from "react";
import CardService from "../Card/CardService";

const PaginationCard = ({ serviceList }) => {
  const itemsPerPage = 9;
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedServices = serviceList.slice(startIndex, endIndex);

  return (
    <Box>
      <Stack spacing={4}>
        <Grid
          container
          spacing={{ xs: 2, md: 1 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {displayedServices.map((service, index) => {
            return (
              <Grid item xs={4} sm={4} md={4} key={index}>
                <CardService
                  serviceId={service.serviceId}
                  serviceName={service.serviceName}
                  studioId={service.studioId}
                  description={service.description}
                  imageService={service.imageService}
                  price={service.price}
                />
              </Grid>
            );
          })}
        </Grid>
        <Pagination
          sx={{ placeSelf: "center" }}
          count={Math.ceil(serviceList.length / itemsPerPage)}
          page={page}
          onChange={handleChange}
        />
      </Stack>
    </Box>
  );
};

export default PaginationCard;
