import {
  Backdrop,
  Box,
  Button,
  Fade,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef } from "react";
import { useShowAuthModal } from "../../stores/useShowAuthModal";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router";
import axios from "axios";

function Login(props) {
  const { setIsLogin } = props;
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.presentDefault();
  };

  const handleLoginGoogle = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      localStorage.setItem("token", credentialResponse.access_token);
      window.location.reload();
    },
    onError: () => {
      console.log("Login failed!");
    },
  });

  async function handleLogin(event) {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const loginRequest = {
      email: email,
      password: password,
    };
    await axios
      .post(`${import.meta.env.VITE_REACT_APP_API_URL}/login`, loginRequest)
      .then((res) => {
        localStorage.setItem("token", res.data);
        navigate(0);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Typography variant="h4" textAlign="center">
        Welcome back!
      </Typography>
      <form
        style={{
          marginTop: "2.5rem",
        }}
        onSubmit={handleLogin}
      >
        <TextField
          id="outlined-email"
          label="Email"
          fullWidth
          required
          inputRef={emailRef}
          type="email"
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
            inputRef={passwordRef}
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
          Login
        </Button>
      </form>
      <div
        style={{
          backgroundColor: "gray",
          width: "100%",
          height: 0.5,
          marginTop: "1.5rem",
          marginBottom: "1.5rem",
        }}
      ></div>
      <Button
        variant="outlined"
        fullWidth
        sx={{
          paddingTop: 1.2,
          paddingBottom: 1.2,
        }}
        onClick={handleLoginGoogle}
      >
        <GoogleIcon sx={{ marginRight: 1 }} />
        Continue with Google
      </Button>
      <Box
        sx={{
          textAlign: "center",
          marginTop: 1.5,
          userSelect: "none",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="subtitle2">Don't have an account?</Typography>
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
            setIsLogin(false);
          }}
        >
          Sign up
        </Typography>
      </Box>
    </>
  );
}

export default Login;
