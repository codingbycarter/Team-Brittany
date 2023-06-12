import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function AddTrail(props) {
    const [open, setOpen] = useState(false);
    const [trail, setTrail] = useState({
        title: '',
        description: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setTrail({
            ...trail,
            [event.target.name]: event.target.value
        });
    }

    const handleSave = () => {
        props.addTrail(trail);
        handleClose();
    }

    return (
        <div>
            <button onClick={handleClickOpen}>New Trail</button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Trail</DialogTitle>
                <DialogContent>
                    <input placeholder="Title" name="title"
                        value={trail.title} onChange={handleChange}
                    /><br/>
                    <input placeholder="Description" name="description"
                        value={trail.description} onChange={handleChange}
                    /><br/>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddTrail;