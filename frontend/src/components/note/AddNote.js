import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useUserContext } from '../../context/userContext';

function Addnote(props) {
    const [open, setOpen] = useState(false);
    const { user } = useUserContext();
    const [noteDTO, setNoteDTO] = useState({
        uid: user.id,
        tid: props.tid,
        message: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setNoteDTO({
            ...noteDTO,
            [event.target.name]: event.target.value
        });
    }

    const handleSave = () => {
        props.addNote(noteDTO);
        handleClose();
    }

    return (
        <div>
            <button onClick={handleClickOpen}>New Note</button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Note</DialogTitle>
                <DialogContent>
                    <input placeholder="User" name="uid"
                        value={noteDTO.uid} onChange={handleChange} type="hidden"
                    /><br />
                    <input placeholder="Trail" name="tid"
                        value={noteDTO.tid} onChange={handleChange} type="hidden"
                    /><br />
                    <input placeholder="Message" name="message"
                        value={noteDTO.message} onChange={handleChange}
                    /><br />
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Addnote;