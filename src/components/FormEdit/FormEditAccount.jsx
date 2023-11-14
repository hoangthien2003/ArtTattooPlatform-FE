import React, { useState } from "react";
import {
  Button,
  Container,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";

const FormEditAccount = (props) => {
  const { userId, password } = props.data;

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const putNewPassword = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const newPass = "your_new_password_here";
      await axios.put(
        `${import.meta.env.VITE_REACT_APP_API_URL}/User/UpdateProfileUser/${userId}`,
        { newPassword: newPass },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Password updated successfully!");
    } catch (error) {
      setErrors(["Error updating password. Please try again."]);
      console.error("Error updating password:", error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Container
      maxWidth="sm"
      sx={{
        border: "2px solid #322F2F",
        borderRadius: 5,
        textAlign: "center",
        paddingTop: 5,
        paddingBottom: 5,
      }}
    >
      <Stack spacing={3}>
        <Typography variant="h4">Account Setting</Typography>
        <Stack spacing={2}>
          {password && (
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                sx={{ width: "60%" }}
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
              />
            </Stack>
          )}

          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <InputLabel htmlFor="outlined-adornment-newPassword">
              New Password
            </InputLabel>
            <OutlinedInput
              sx={{ width: "60%" }}
              id="outlined-adornment-newPassword"
              type={showNewPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle new password visibility"
                    onClick={handleClickShowNewPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Stack>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <InputLabel htmlFor="outlined-adornment-confirmNewPassword">
              Confirm New Password
            </InputLabel>
            <OutlinedInput
              sx={{ width: "60%" }}
              id="outlined-adornment-confirmNewPassword"
              type={showConfirmNewPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm new password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirmNewPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Stack>

          {errors.map((error, index) => (
            <Typography key={index} color="error">
              {error}
            </Typography>
          ))}

          <Button
            type="button"
            variant="outlined"
            sx={{ width: "20%", placeSelf: "end" }}
            onClick={putNewPassword}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default FormEditAccount;
