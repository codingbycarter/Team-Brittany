import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function EditComment(props) {
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState({
        id: '',
        trail: '',
        message: ''
    });

    const handleClickOpen = () => {
        setComment({
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
        setComment({
            ...comment,
            [event.target.name]: event.target.value
        });
    }

    const handleSave = () => {
        props.updateComment(comment, "http://localhost:8080/api/comment?cid=" + comment.id);
        handleClose();
    }

    return (
        <div>
            <button onClick={handleClickOpen}>Edit</button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Comment</DialogTitle>
                <DialogContent>
                    <input placeholder="Message" name="message"
                        value={comment.message} onChange={handleChange}
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
export default EditComment;