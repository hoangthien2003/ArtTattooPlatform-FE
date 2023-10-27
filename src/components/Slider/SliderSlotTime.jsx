import React from "react";
import { useState } from "react";
import {
  Button,
  Typography,
  TextField,
  Stack,
  Grid,
  Box,
  Container,
} from "@mui/material";
import { useEffect } from "react";
import Times from "../../datas/Times";

const SliderSlotTime = ({ timeRef }) => {
  const [times, setTimes] = useState(Times);
  const [studioStart, setStudioStart] = useState("");
  const [studioEnd, setStudioEnd] = useState("");
  const [active, setActive] = useState();
  const [timeChoose, setTimeChoose] = useState();

  useEffect(() => {
    // Set trạng thái active cho các button trong khoảng thời gian làm việc của studio
    for (let i = 0; i < times.length; i++) {
      if (times[i].time >= studioStart && times[i].time <= studioEnd) {
        times[i].status = true;
      }
    }
  }, [studioStart, studioEnd]);

  return (
    <Box>
      <Stack spacing={2} direction={"row"} justifyContent={"space-between"}>
        <TextField
          label="Studio Start Time"
          value={studioStart}
          onChange={(e) => {
            setStudioStart(e.target.value);
          }}
        />
        <TextField
          label="Studio End Time"
          value={studioEnd}
          onChange={(e) => {
            setStudioEnd(e.target.value);
          }}
        />
      </Stack>
      <Grid
        marginTop={2}
        container
        direction={"column"}
        spacing={2}
        sx={{ height: 250, overflow: "auto" }}
      >
        {times.map((time, index) => (
          <Grid item xs={2} key={index}>
            <Button
              sx={{
                width: 30,
                // backgroundColor: !time.status ? "blue" : "gray",
                backgroundColor:
                  active == index ? "blue" : time.status ? "#FF7F22" : "gray",
              }}
              variant="contained"
              // color={time.status ? "primary" : "secondary"}
              ref={timeRef}
              onClick={() => {
                // Thực hiện hành động khi click vào button
                setActive(index);
                console.log(timeRef.current.$text);
              }}
            >
              {time.time}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SliderSlotTime;
