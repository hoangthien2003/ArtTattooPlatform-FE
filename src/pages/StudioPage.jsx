import React, { useEffect, useState } from 'react'
import CardStudioV2 from '../components/Card/CardStudioV2';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea, CardActions } from "@mui/material";


export default function StudioPage() {
    const [studio, setStudio] = useState([]);

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
        console.log(studio)

    };
    return (
        <Container className='mt-5 mb-5'>
            <div className='row'>
                {studio.map((studio) => (
                    <div className='col-md-3'>
                        <Card sx={{ maxWidth: 200 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={studio.logo}
                                    alt="Studio"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {studio.studioName}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    View more
                                </Button>
                            </CardActions>
                        </Card>
                    </div>

                ))}
            </div>

        </Container>

    )
}
