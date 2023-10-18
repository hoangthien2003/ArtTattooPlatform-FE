import React, { useEffect, useState } from 'react'
import { Avatar, Container, Link, Typography } from '@mui/material';
import axios from 'axios';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea, CardActions } from "@mui/material";
import "../index.css"
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function StudioPage() {

    const [studio, setStudio] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        getStudio();
    }, []);

    const getStudio = async () => {
        await axios
            .get(import.meta.env.VITE_REACT_APP_API_URL + "/Studio/GetAll")
            .then((res) => {
                setStudio(res.data.$values);
            })
            .catch((err) => {
                console.log(err);
            });


    };
    return (
        <Container className='mt-5 mb-5'>
            <Typography variant='h4'>
                Studio
            </Typography>

            <div className='row'>
                {studio.map((studio, index) => (
                    <div key={index} className='col-md-4 mt-5'>
                        <Card sx={{  Width: 345 }}>
                        <CardActionArea onClick={() => navigate(`/StudioDetail/${studio.studioId}`)}>

                            <Box className='row'>
                                <Box className='ps-4 col-md-4'>
                                    <Avatar
                                        alt="Remy Sharp"
                                        src={studio.logo}
                                        sx={{ width: 100, height: 'auto' }}
                                        className='mt-3 mb-3'
                                    />
                                </Box>
                                <CardContent className='col-md-8 ps-4 pe-4'>
                                    <Typography component="div" variant="h5">
                                        {studio.studioName}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div" className='ellipsis'>
                                        {studio.description}
                                    </Typography>
                                    <Rating name="size-small" readOnly defaultValue={4} size="small" className='mt-1' />
                                </CardContent>
                            </Box>
                            </CardActionArea>
                        </Card>
                        {/* <Card key={index} sx={{ maxWidth: 345, display:'flex'}}>
                            <CardActionArea onClick={() => navigate(`/StudioDetail/${studio.studioId}`)}>
                                <CardMedia className='ps-3'>
                                    <Avatar
                                        alt="Remy Sharp"
                                        src={studio.logo}
                                        sx={{ width: 100, height: 'auto' }}
                                        className='mt-3 mb-3'
                                    />
                                </CardMedia>

                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {studio.studioName}
                                    </Typography>
                                    <Typography className='ellipsis'>
                                        {studio.description}
                                    </Typography>
                                    <Rating name="size-small" readOnly defaultValue={4} size="small" className='mt-1' />

                                </CardContent>

                            </CardActionArea>
                        </Card> */}
                    </div>

                ))}
            </div>

        </Container>

    )
}
