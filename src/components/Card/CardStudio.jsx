import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const CardStudio = (props) => {
  const { studioId, studioName, logo } = props;

  const handleOnClickStudio = (e) => {};

  return (
    <Card
      key={studioId}
      sx={{ width: "80%", backgroundColor: "#322F2F", placeSelf: "center" }}
    >
      <CardActionArea onClick={handleOnClickStudio}>
        <CardContent>
          <Stack
            spacing={2}
            direction={"row"}
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <Avatar alt={studioName} src={logo} />
            <Stack
              spacing={1}
              justifyContent={"flex-start"}
              alignItems={"flex-start"}
            >
              <Typography>{studioName}</Typography>
              <Rating
                size="small"
                defaultValue={2.5}
                precision={0.5}
                readOnly
              />
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardStudio;
