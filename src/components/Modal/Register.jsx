import {
  Box,
  Button,
  FormControl,
  IconButton,
  OutlinedInput,
  TextField,
  Typography,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React from "react";

function Register(props) {
  const { setIsLogin } = props;
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.presentDefault();
  };

  const handleClickShowConfirm = () => setShowConfirm((show) => !show);

  const handleMouseDownConfirm = (event) => {
    event.presentDefault();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 530,
    bgcolor: "background.paper",
    boxShadow: 24,
    paddingTop: 6,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 6,
  };

  return (
    <Box sx={style}>
      <Typography variant="h4" textAlign="center">
        Register
      </Typography>
      <form
        style={{
          marginTop: "2.5rem",
        }}
      >
        <TextField id="outlined-email" label="Email" fullWidth required />
        <TextField
          id="outlined-username"
          label="Username"
          fullWidth
          required
          sx={{
            marginTop: 2,
          }}
        />
        <FormControl
          sx={{
            marginTop: 2,
          }}
          fullWidth
          variant="outlined"
          required
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <FormControl
          sx={{
            marginTop: 2,
          }}
          fullWidth
          variant="outlined"
          required
        >
          <InputLabel htmlFor="outlined-adornment-confirm">
            Confirm password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-confirm"
            type={showConfirm ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirm}
                  onMouseDown={handleMouseDownConfirm}
                  edge="end"
                >
                  {showConfirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm password"
          />
        </FormControl>
        <Button
          fullWidth
          variant="contained"
          sx={{
            marginTop: 2.5,
            paddingTop: 1.5,
            paddingBottom: 1.5,
          }}
          type="submit"
        >
          Register
        </Button>
      </form>
      <Box
        sx={{
          textAlign: "center",
          marginTop: 1.5,
          userSelect: "none",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="subtitle2">Already have an account?</Typography>
        <Typography
          variant="subtitle2"
          sx={{
            cursor: "pointer",
            ":hover": {
              textDecoration: "underline",
            },
            marginLeft: 1,
          }}
          onClick={() => {
            setIsLogin(true);
          }}
        >
          Log in now
        </Typography>
      </Box>
    </Box>
  );
}

export default Register;
