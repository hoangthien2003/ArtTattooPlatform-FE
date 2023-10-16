import { Modal, Typography } from "@mui/material";
import React from "react";

function Login(props) {
  const { open, setOpen } = props;

  const handleClose = () => setOpen(false);

  return (
    <Modal open={open} handleClose={handleClose}>
      <Typography variant="h2">Hello World</Typography>
    </Modal>
  );
}

export default Login;
