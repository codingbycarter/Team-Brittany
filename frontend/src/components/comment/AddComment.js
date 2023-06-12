import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useUserContext } from '../../context/userContext';

function AddComment(props) {
    const [open, setOpen] = useState(false);
    const { user } = useUserContext();
    const [commentDTO, setCommentDTO] = useState({
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
        setCommentDTO({
            ...commentDTO,
            [event.target.name]: event.target.value
        });
    }

    const handleSave = () => {
        props.addComment(commentDTO);
        handleClose();
    }

    return (
        <div>
            <button onClick={handleClickOpen}>New Comment</button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Comment</DialogTitle>
                <DialogContent>
                    <input placeholder="User" name="uid"
                        value={commentDTO.uid} onChange={handleChange} type="hidden"
                    /><br />
                    <input placeholder="Trail" name="tid"
                        value={commentDTO.tid} onChange={handleChange} type="hidden"
                    /><br />
                    <input placeholder="Message" name="message"
                        value={commentDTO.message} onChange={handleChange}
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

export default AddComment;