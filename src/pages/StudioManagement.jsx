import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import { Avatar, Box, Card, Container, Rating, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


export default function StudioManagement({ UserID }) {

    // api call
    const [studio, setStudio] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        getStudio();
    }, []);

    const getStudio = async () => {
        await axios
            .get(import.meta.env.VITE_REACT_APP_API_URL + `/Studio/GetStudioByManager/${UserID}`)
            .then((res) => {
                setStudio(res.data.$values);
            })
            .catch((err) => {
                console.log(err);
            });
        console.log(UserID)

    };
    // const [profile, setProfile] = useState([]);

    return (
        <Container>

            <div className=' row mt-5 mb-5'>

                <div className='col-md-4'>
                    <Card sx={{ border: "2px solid #322F2F", borderRadius: 1 }}>
                        <Stack
                            spacing={2}
                            direction="column"
                            justifyContent={"center"}
                            alignItems={"center"}
                        >
                            <Avatar
                                sx={{ width: 100, height: 100, borderColor: "white" }}
                                className="mt-5 mb-4"
                            // src={studioData && studioData.logo}
                            />
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                                sx={{ textAlign: "center" }}
                                className="mb-1"
                            >
                                {/* {studioData && studioData.studioName} */}
                            </Typography>
                            <Typography
                                gutterBottom
                                variant="h6"
                                sx={{ textAlign: "center" }}
                                className="mb-1"
                            >
                                {/* {studioData && studioData.description} */}
                            </Typography>
                            <Rating
                                name="size-small"
                                // value={studioData && studioData.RatingStb}
                                size="small"
                                readOnly
                            />
                            <Typography
                                gutterBottom
                                variant="h7"
                                component="div"
                                sx={{ textAlign: "center" }}
                                className="mb-1"
                            >
                                {/* {studioData && studioData.studioEmail} */}
                            </Typography>
                            <Typography
                                gutterBottom
                                variant="h7"
                                component="div"
                                sx={{ textAlign: "center" }}
                                className="mb-1"
                            >
                                {/* {studioData && studioData.studioPhone} */}
                            </Typography>
                            <Typography
                                gutterBottom
                                variant="h7"
                                component="div"
                                sx={{ textAlign: "center" }}
                                className="mb-5"
                            >
                                {/* {studioData && studioData.address} */}
                            </Typography>
                        </Stack>
                    </Card>
                    {/* give reviews and write review content */}
                </div>
            </div>
        </Container>

    )
}