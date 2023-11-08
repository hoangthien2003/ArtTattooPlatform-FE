import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import { Avatar, Box, Card, Container, Rating, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../stores/useUserInfo';


export default function StudioManagement() {
	const user = useUserInfo((state) => state.user);

    // api call
    const [studio, setStudio] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        getStudio();
    }, []);

    const getStudio = async () => {
        await axios
            .get(import.meta.env.VITE_REACT_APP_API_URL + `/Studio/GetStudioByManager/${user.userID}`)
            .then((res) => {
                setStudio(res.data.studio);
                console.log(res)
            })
            .catch((err) => {
                console.log(err);
            });
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
                            src={studio.logo}
                            />
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                                sx={{ textAlign: "center" }}
                                className="mb-1"
                            >
                                {studio.studioName} 
                            </Typography>
                            <Typography
                                gutterBottom
                                variant="h6"
                                sx={{ textAlign: "center" }}
                                className="mb-1"
                            >
                                {studio.description}
                            </Typography>
                            <Rating
                                name="size-small"
                                value={studio.RatingStb}
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
                                {studio.studioEmail}
                            </Typography>
                            <Typography
                                gutterBottom
                                variant="h7"
                                component="div"
                                sx={{ textAlign: "center" }}
                                className="mb-1"
                            >
                                {studio.studioPhone}
                            </Typography>
                            <Typography
                                gutterBottom
                                variant="h7"
                                component="div"
                                sx={{ textAlign: "center" }}
                                className="mb-5"
                            >
                                {studio.address}
                            </Typography>
                        </Stack>
                    </Card>
                </div>
            </div>
        </Container>

    )
}