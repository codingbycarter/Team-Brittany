import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function EditTrail(props) {
    const [open, setOpen] = useState(false);
    const [trail, setTrail] = useState({
        id: '',
        title: '',
        description: ''
    });

    const handleClickOpen = () => {
        setTrail({
            id: props.data.row.id,
            title: props.data.row.title,
            description: props.data.row.description
        })
        setOpen(true);

    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = (event) => {
        setTrail({
            ...trail,
            [event.target.name]: event.target.value
        });
    }

    const handleSave = () => {
        props.updateTrail(trail, "http://localhost:8080/api/trail?tid=" + trail.id);
        handleClose();
    }

    return (
        <div>
            <button onClick={handleClickOpen}>Edit</button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Trail</DialogTitle>
                <DialogContent>
                    <input placeholder="Title" name="title"
                        value={trail.title} onChange={handleChange}
                    /><br />
                    <input placeholder="Description" name="description"
                        value={trail.description} onChange={handleChange}
                    /><br />
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default EditTrail;