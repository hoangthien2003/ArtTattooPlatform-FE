import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Rating, Typography } from '@mui/material';

export default function FeedbackForm() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Give us your feedback
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                <Typography component="legend" className='mt-3'>Feedback service</Typography>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="feedback"
                        type="feedback"
                        fullWidth
                        variant="standard"
                    />
                    <Typography component="legend" className='mt-3'>Rating service</Typography>
                    <Rating name="simple-controlled size-small"/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}