import React from "react";
import { useState } from "react";
import { Button, Typography, TextField, Stack, Box } from "@mui/material";
import { useEffect } from "react";
import Times from "../../datas/Times";

const SliderSlotTime = () => {
  const [times, setTimes] = useState(Times);
  const [studioStart, setStudioStart] = useState("");
  const [studioEnd, setStudioEnd] = useState("");

  useEffect(() => {
    // Set trạng thái active cho các button trong khoảng thời gian làm việc của studio
    for (let i = 0; i < times.length; i++) {
      if (times[i].time >= studioStart && times[i].time <= studioEnd) {
        times[i].status = true;
      }
    }
  }, [studioStart, studioEnd]);

  return (
    <Stack spacing={2}>
      <Stack spacing={2} direction={"row"} justifyContent={"space-between"}>
        {/* <TextField
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
        /> */}
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{ height: "auto", overflow: "scroll" }}
      >
        {times.map((time) => (
          <Button
            sx={{ width: 30 }}
            key={time.time}
            variant="contained"
            color={time.status ? "primary" : "secondary"}
            onClick={() => {
              // Thực hiện hành động khi click vào button
            }}
          >
            {time.time}
          </Button>
        ))}
      </Stack>
    </Stack>
  );
};

export default SliderSlotTime;
