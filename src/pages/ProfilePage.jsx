import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import { Avatar, Box, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';


export default function ProfilePage() {
    const [openProfile, setOpenProfile] = React.useState(false);
    const handleClickOpenProfile = () => {
        setOpenProfile(true);
    };
    const handleCloseProfile = () => {
        setOpenProfile(false);
    };
    const [openAccount, setOpenAccount] = React.useState(false);
    const handleClickOpenAccount = () => {
        setOpenAccount(true);
    };
    const handleCloseAccount = () => {
        setOpenAccount(false);
    };

    // api call
    // const [profile, setProfile] = useState([]);
    useEffect(() => {
        getData();
    }, [])
    const [memberId, setMemberId] = useState([""])
    const token = localStorage.getItem("token")
    async function getData() {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/Member/GetMemberByID/${memberId}`, {
            headers: {
                Authorization:"Bearer" + token,
            }
        })
        
            .then(function (response) {
                console.log(response.data.$values)
                setMemberId(response.data.$values)
            }).catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div className='mt-5'>
            <h1>
                {memberId.memberId}
            </h1>
                <Stack direction="column" justifyContent={'center'} alignItems={'center'} >
                    <Avatar sx={{ width: 100, height: 100, }} className='mt-5 mb-4' />
                    <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'center' }}>
                        Nguyen Tran B
                    </Typography>
                    <Typography gutterBottom variant="h7" component="div" sx={{ textAlign: 'center' }}>
                        member
                    </Typography>
                    <Typography gutterBottom variant="h7" component="div" sx={{ textAlign: 'center' }}>
                        nguyentranb@email.com
                    </Typography>
                    <Typography gutterBottom variant="h7" component="div" sx={{ textAlign: 'center' }} className='mb-5'>
                        0987654321
                    </Typography>
                </Stack>
            <div className='button-group mb-5' style={{ textAlign: 'center' }}>
                <div className='mb-3'>
                    <Button onClick={handleClickOpenProfile} variant="outlined" sx={{ backgroundColor: '#1E1E1E', color: 'white', border: "none", width: '200px' }}>Edit Profile</Button>
                </div>
                <div className='mb-3'>
                    <Button onClick={handleClickOpenAccount} variant="outlined" sx={{ backgroundColor: '#1E1E1E', color: 'white', border: "none", width: '200px' }}>Account Setting</Button>
                </div>
            </div>
            <div>
                <Dialog open={openProfile} onClose={handleCloseProfile}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="User Name"
                            type="userName"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="userEmail"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="phone"
                            label="Phone Number"
                            type="userPhone"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseProfile}>Save</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
                <Dialog open={openAccount} onClose={handleCloseAccount}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="currentPassword"
                            label=" Current Password"
                            type="password"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="newPassword"
                            label="New Password"
                            type="password"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseAccount}>Save</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}