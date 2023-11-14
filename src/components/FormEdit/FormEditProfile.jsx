import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const phoneRegExp = /^\d{10,12}$/;
const nameRegExp = /^[a-zA-Z]+$/;

const FormEditProfile = (props) => {
  const { userId } = props.data;
  const [data, setData] = useState({
    userName: props.data.userName,
    fullName: props.data.fullName,
    email: props.data.email,
    phoneNumber: props.data.phoneNumber,
    image: props.data.image,
  });

  const isVariableForm = () => {};

  const memoizedData = useMemo(() => data, [data]);

  useEffect(() => {
    if (memoizedData !== data) {
      handleSubmit();
    }
  }, [data]);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    await axios
      .put(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/User/UpdateProfileUser/${userId}`,
        data,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        toast.success("Updated profile successfully, please refresh page");
      })
      .catch((err) => toast.error(`Update Failed: ${err.message}`));
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
        <Typography variant="h4">Edit Profile</Typography>
        <Container>
          <Stack spacing={2}>
            {Object.keys(data).map((key) => (
              <Stack
                key={key}
                direction="row"
                spacing={2}
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>
                  {key.charAt(0).toUpperCase() + key.substring(1)}
                </Typography>
                <TextField
                  sx={{ width: "70%" }}
                  type="text"
                  name={key}
                  defaultValue={data[key]}
                  onChange={(e) => setData({ ...data, [key]: e.target.value })}
                />
              </Stack>
            ))}
          </Stack>
        </Container>
        <Button
          type="submit"
          variant="outlined"
          onClick={handleSubmit}
          sx={{ width: "20%", placeSelf: "end" }}
        >
          Submit
        </Button>
      </Stack>
    </Container>
  );
};

export default FormEditProfile;
