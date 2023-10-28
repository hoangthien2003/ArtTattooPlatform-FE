import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Container, Link, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function BookingManagement() {
    const [artist, setArtist] = React.useState('');

    const handleChange = (event) => {
        setArtist(event.target.value);
    };
    return (

        <Container className='mt-5 mb-5'>
            <Typography variant="h5" className='mb-3'>Booking Dashboard</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Service</TableCell>
                            <TableCell align="left">Customer</TableCell>
                            <TableCell align="left">Phone</TableCell>
                            <TableCell align="left">Time</TableCell>
                            <TableCell align="left">Price</TableCell>
                            <TableCell align="left">Artist</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                aaa
                            </TableCell>
                            <TableCell align="left">aaa</TableCell>
                            <TableCell align="left">aaa</TableCell>
                            <TableCell align="left">aaa</TableCell>
                            <TableCell align="left">aaa</TableCell>
                            <TableCell align="left">
                                <Box sx={{ maxWidth: 50 }}>
                                    <FormControl >
                                        <InputLabel id="demo-simple-select-label"> Choose</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={1}
                                            label="Artist"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={1}>TheAnh</MenuItem>
                                            <MenuItem value={2}>TrungAnh</MenuItem>
                                            <MenuItem value={3}>TuanTr</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </TableCell>
                            <TableCell align="left">
                                <Link sx={{textDecoration:'none'}}>
                                Confirm
                                </Link>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}