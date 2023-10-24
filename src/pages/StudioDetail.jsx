import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Stack } from "@mui/system";
import { Avatar, Card, Rating, Typography } from "@mui/material";

export default function StudioDetail() {
  const { studioId } = useParams();

  const [data, setData] = useState();

  useEffect(() => {
    getStudioID();
  }, []);

  const getStudioID = async () => {
    await axios
      .get(
        import.meta.env.VITE_REACT_APP_API_URL +
        `/Studio/GetStudioByID/${studioId}`
      )
      .then((res) => {
        // setData(res.data);
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <div className="row mt-5 mb-5">
        <div className="col-md-4">
          <Card >
            <Stack direction="column" justifyContent={'center'} alignItems={'center'} >
              <Avatar sx={{ width: 100, height: 100, borderColor:'white' }} className='mt-5 mb-4' src={data && data.logo} />
              <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'center' }}  className='mb-1'>
                {data && data.studioName}
              </Typography>
              <Typography gutterBottom variant="h6" component="div" sx={{ textAlign: 'center' }}  className='mb-1'>
                {data && data.description}
              </Typography>
              <Rating name="size-small" defaultValue={4} size="small" />
              <Typography gutterBottom variant="h7" component="div" sx={{ textAlign: 'center' }}  className='mb-1'>
              {data && data.studioEmail}
              </Typography>
              <Typography gutterBottom variant="h7" component="div" sx={{ textAlign: 'center' }}  className='mb-1'>
              {data && data.studioPhone}
              </Typography>
              <Typography gutterBottom variant="h7" component="div" sx={{ textAlign: 'center' }} className='mb-5'>
              {data && data.address}
              </Typography>
            </Stack>
          </Card>

        </div>
        <div className="col-md-8" style={{ backgroundColor: 'white' }}>
          aaaaaaaaaaaaaaaa
        </div>
      </div>
      {/* <Typography gutterBottom variant="h5" component="div">
          {data && data.address}
        </Typography> */}
    </Container>
  );
}

