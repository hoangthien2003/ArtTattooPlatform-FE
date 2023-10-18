import {
  Avatar,
  Container,
  Divider,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const CommentList = () => {
  return (
    <Container>
      <Stack
        divider={<Divider orientation="horizontal" flexItem />}
        direction={"column"}
        spacing={3}
        justifyContent={"center"}
        alignItems={"flex-start"}
      >
        <div>
          <Stack direction={"row"} spacing={2}>
            <Avatar sizes="small" />
            <Stack>
              <Typography variant="h6">Username</Typography>
              <Typography variant="body2" color="gray">
                16/10/2023
              </Typography>
            </Stack>
          </Stack>
          <div>
            <Rating size="medium" defaultValue={2.5} precision={0.5} readOnly />
            <Typography>Nhân viên phục vụ tối, hình xăm đẹp</Typography>
          </div>
        </div>
        <div>
          <Stack direction={"row"} spacing={2}>
            <Avatar sizes="small" />
            <Stack>
              <Typography variant="h6">Username</Typography>
              <Typography variant="body2" color="gray">
                16/10/2023
              </Typography>
            </Stack>
          </Stack>
          <div>
            <Rating size="medium" defaultValue={2.5} precision={0.5} readOnly />
            <Typography>Nhân viên phục vụ tối, hình xăm đẹp</Typography>
          </div>
        </div>
        <div>
          <Stack direction={"row"} spacing={2}>
            <Avatar sizes="small" />
            <Stack>
              <Typography variant="h6">Username</Typography>
              <Typography variant="body2" color="gray">
                16/10/2023
              </Typography>
            </Stack>
          </Stack>
          <div>
            <Rating size="medium" defaultValue={2.5} precision={0.5} readOnly />
            <Typography>Nhân viên phục vụ tối, hình xăm đẹp</Typography>
          </div>
        </div>
      </Stack>
    </Container>
  );
};

export default CommentList;
