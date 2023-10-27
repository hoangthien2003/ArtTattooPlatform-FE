import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  Container,
  Divider,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CommentList = ({ serviceId }) => {
  const [comments, setComments] = useState();

  useEffect(() => {
    getCommentByServiceId();
  }, [serviceId]);

  const getCommentByServiceId = async () => {
    await axios
      .get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/Feedback/GetFeedbackByServiceID/${serviceId}`
      )
      .then((res) => {
        // console.log(res.data.$values);
        setComments(res.data.$values);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Stack
        divider={<Divider orientation="horizontal" flexItem />}
        direction={"column"}
        spacing={3}
        justifyContent={"center"}
        alignItems={"flex-start"}
      >
        {comments &&
          comments.map((comment, index) => (
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Avatar />
              </Grid>
              <Grid item xs={10}>
                <Stack spacing={2} direction="column">
                  <div>
                    <Typography variant="h6">Username</Typography>
                    <Rating
                      aria-label="20/10/2023"
                      value={comment.rating}
                      size="small"
                    />
                  </div>
                  <div>
                    <Typography>{comment.feedbackDetail}</Typography>
                    <Typography variant="subtitle2" color={"gray"}>
                      Date: 20/10/2023
                    </Typography>
                  </div>
                </Stack>
                <Stack direction={"row"} spacing={1}>
                  <Button>Reply</Button>
                  <Button>Edit</Button>
                  <Button>Delete</Button>
                </Stack>
              </Grid>
            </Grid>
          ))}
      </Stack>
    </Container>
  );
};

export default CommentList;
