import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Rating, Typography } from "@mui/material";
import jwtDecode from "jwt-decode";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

export default function FeedbackForm({ serviceId }) {
  const [title, setTitle] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const isFeedBackEnabled = () => {
    if (title.length === 0 || rating === 0) {
      return false;
    }
    return true;
  };

  const onClickSubmit = async () => {
    const token = localStorage.getItem("token");

    // Lấy giá trị đầu vào của người dùng
    const titleValue = title;
    const ratingValue = rating;
    const date = new Date(Date.now());
    const DateFormat = date.toLocaleString();

    if (token != null) {
      const email = jwtDecode(token).email;
      const feedbackRequest = {
        FeedbackDetail: titleValue,
        Rating: ratingValue,
        ServiceID: serviceId,
        FeedbackDate: DateFormat,
      };

      await axios
        .post(
          `${
            import.meta.env.VITE_REACT_APP_API_URL
          }/Feedback/AddFeedback${email}`,
          feedbackRequest,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          toast.success("Feedback saved successfully");
          console.log(res);
        })
        .catch((err) => {
          toast.error("Feedback saved failed");
          console.log(err);
        });
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Give us your feedback
      </Button>
      <Dialog open={open} onClose={handleClickClose}>
        <DialogContent>
          <Typography component="legend" className="mt-3">
            Feedback service
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="feedback"
            type="feedback"
            fullWidth
            variant="standard"
            onChange={(event) => setTitle(event.target.value)}
          />
          <Typography component="legend" className="mt-3">
            Rating service
          </Typography>
          <Rating
            onChange={(event) => setRating(event.target.value)}
            name="simple-controlled size-small"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickSubmit} disabled={!isFeedBackEnabled()}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
