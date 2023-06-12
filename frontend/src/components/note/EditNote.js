import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function EditNote(props) {
    const [open, setOpen] = useState(false);
    const [note, setNote] = useState({
        id: '',
        trail: '',
        message: ''
    });

    const handleClickOpen = () => {
        setNote({
            id: props.data.row.id,
            user: props.data.row.user,
            trail: props.data.row.trail,
            message: props.data.row.message
        })
        setOpen(true);

    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = (event) => {
        setNote({
            ...note,
            [event.target.name]: event.target.value
        });
    }

    const handleSave = () => {
        props.updateNote(note, "http://localhost:8080/api/note?nid=" + note.id);
        handleClose();
    }

    return (
        <div>
            <button onClick={handleClickOpen}>Edit</button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Note</DialogTitle>
                <DialogContent>
                    <input placeholder="Message" name="message"
                        value={note.message} onChange={handleChange}
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
export default EditNote;