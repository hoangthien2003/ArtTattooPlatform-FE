import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Breadcrumbs,
  Button,
  Container,
  Icon,
  Stack,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  Home,
  ProductionQuantityLimitsRounded,
  ProductionQuantityLimitsSharp,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useUserInfo } from "../stores/useUserInfo";
import axios from "axios";
import { toast } from "react-toastify";

export default function BookingManagement(props) {
  const [artist, setArtist] = React.useState("");
  const user = useUserInfo((state) => state.user);
  const navigate = useNavigate();
  const [bookings, setBookings] = React.useState([]);

  React.useEffect(() => {
    if (user.role != "MN" && user.role != "AD") {
      navigate("/access-denied");
      return;
    }
    fetchBooking();
  }, []);

  const fetchBooking = async () => {
    const token = localStorage.getItem("token");
    if (token != null) {
      await axios
        .get(
          `${
            import.meta.env.VITE_REACT_APP_API_URL
          }/Booking/GetBookingByManager/${user.userID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          setBookings(res.data.$values);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err);
        });
    } else {
      toast.error("Cannot get booking because token is empty!");
    }
  };

  const fetchConfirmBooking = async (bookingId, status) => {
    const token = localStorage.getItem("token");
    await axios
      .put(
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/Booking/UpdateStatus/${bookingId}`,
        status,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success("Update status booking successfully!");
        console.log(res);
        fetchBooking();
      })
      .catch((err) => {
        toast.error("Update status booking failed!");
        console.log(err);
      });
  };

  return (
    <Container className="mt-5 mb-5" sx={{ height: "25rem" }}>
      {/* <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 5 }}>
        <Stack
          spacing={1}
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Home fontSize="inherit" />
          <Typography
            variant="body1"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              "&:hover": {
                color: "#FF7F22",
              },
            }}
          >
            Home
          </Typography>
        </Stack>
        <Typography variant="body1" sx={{ textDecoration: "none" }}>
          Booking Management
        </Typography>
      </Breadcrumbs> */}
      {bookings.length != 0 ? (
        <Box>
          <Typography variant="h5" className="mb-3">
            Booking Management
          </Typography>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650, height: "auto", maxHeight: 600 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Service Name</TableCell>
                  <TableCell align="center">Username</TableCell>
                  <TableCell align="center">Phone</TableCell>
                  <TableCell align="center">Time</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((booking, index) => {
                  return (
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                      key={index}
                    >
                      <TableCell component="th" scope="row">
                        {booking.serviceName}
                      </TableCell>
                      <TableCell align="center">{booking.userName}</TableCell>
                      <TableCell align="center">
                        {booking.phoneNumber}
                      </TableCell>
                      <TableCell align="center">
                        {booking.bookingDate}
                      </TableCell>
                      <TableCell align="center">{booking.quantity}</TableCell>
                      <TableCell align="center">{booking.total}$</TableCell>
                      <TableCell align="center">{booking.status}</TableCell>
                      <TableCell align="center">
                        {booking.status !== "Canceled" &&
                        booking.status !== "Completed" ? (
                          <Button
                            variant="contained"
                            onClick={() => {
                              if (booking.status === "Pending")
                                fetchConfirmBooking(
                                  booking.bookingId,
                                  "Confirmed"
                                );
                              else if (booking.status === "Confirmed")
                                fetchConfirmBooking(
                                  booking.bookingId,
                                  "Completed"
                                );
                            }}
                          >
                            {booking.status === "Pending"
                              ? "Confirm"
                              : booking.status === "Confirmed" && "Complete"}
                          </Button>
                        ) : null}
                      </TableCell>
                      <TableCell align="center">
                        {booking.status !== "Canceled" &&
                        booking.status !== "Completed" ? (
                          <Button
                            variant="outlined"
                            onClick={() => {
                              fetchConfirmBooking(
                                booking.bookingId,
                                "Canceled"
                              );
                            }}
                          >
                            Cancel
                          </Button>
                        ) : null}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <ProductionQuantityLimitsRounded
            sx={{
              fontSize: 150,
            }}
          />
          <Typography variant="h4" sx={{ marginTop: 3 }}>
            You don't have any request booking!
          </Typography>
        </Box>
      )}
    </Container>
  );
}
