import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import { Avatar, Box, Breadcrumbs, Card, Container, Rating, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import axios from 'axios';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUserInfo } from '../stores/useUserInfo';
import { Home } from '@mui/icons-material';


export default function StudioManagement() {
    const user = useUserInfo((state) => state.user);
    useEffect(() => {
        if (user.role != "MN" && user.role != "AD") navigate("/access-denied");
        return;
    }, []);

    // api call
    const [studio, setStudio] = useState([]);
    const [service, setServiceData] = useState([]);

    const navigate = useNavigate()
    useEffect(() => {
        getStudio();
        getServiceByStudioId();
    }, []);

    const getStudio = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_REACT_APP_API_URL + `/Studio/GetStudioByManager/${user.userID}`);
            const studioData = response.data.studio;
            console.log("Studio Data:", studioData);

            if (studioData) {
                const studioId = studioData.studioId;
                setStudio(studioData);
                getServiceByStudioId(studioId);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getServiceByStudioId = async (studioId) => {
        try {
            const response = await axios.get(
                import.meta.env.VITE_REACT_APP_API_URL +
                `/Service/GetServiceByStudio/${studioId}`
            );
            setServiceData(response.data.$values);
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    };
    
    return (
        <Container className='mt-5'>
        
            <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 5 }}>
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
                    Studio Management
                </Typography>
            </Breadcrumbs>
            <Typography variant="h5" className="mb-3">
                Studio Information
            </Typography>
            <div className='mb-5'>
                {/* <div className='col-md-4'> */}
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
                            {studio.studioId}
                        </Typography>
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
                            value={studio.ratingStb}
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
                {/* </div> */}

            </div>
        </Container>

    )
}