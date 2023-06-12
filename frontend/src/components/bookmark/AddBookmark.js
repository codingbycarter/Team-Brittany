import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useUserContext } from '../../context/userContext';

function Addbookmark(props) {
    const [open, setOpen] = useState(false);
    const { user } = useUserContext();
    const [bookmarkDTO, setBookmarkDTO] = useState({
        uid: user.id,
        tid: props.tid
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setBookmarkDTO({
            ...bookmarkDTO,
            [event.target.name]: event.target.value
        });
    }

    const handleSave = () => {
        props.addBookmark(bookmarkDTO);
        handleClose();
    }

    return (
        <div>
            <button onClick={handleClickOpen}>Add Bookmark</button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Bookmark</DialogTitle>
                <DialogContent>
                    <input placeholder="User" name="uid"
                        value={bookmarkDTO.uid} type="hidden" />
                    <input placeholder="Trail" name="tid"
                        value={bookmarkDTO.tid} type="hidden" /><br />
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Addbookmark;