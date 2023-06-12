import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport, gridClasses } from '@mui/x-data-grid';
import Link  from '@mui/material/Link';
import { SERVER_URL } from '../../constants.js'
import AddTrail from './AddTrail.js';
import AddComment from '../comment/AddComment.js';
import AddNote from '../note/AddNote.js';
import AddBookmark from '../bookmark/AddBookmark.js';
import { userContext, useUserContext, UserContextProvider } from '../../context/userContext.js';
import { useParams, useLocation } from 'react-router-dom';

// for manually created trails; use an api to add trails if time allows
function Trail(props) {
    const [trail, setTrail] = useState([]);
    const [comments, setComments] = useState([]);
    const [bookmark, setBookmark] = useState([]);
    const [note, setNote] = useState([]);
    const [open, setOpen] = useState(false);
    const {tid} = useParams();
    // const [currUser, setCurrUser] = useState([]);
    const {user} = useUserContext();

    useEffect(() => {
        console.log("line 24: " + user.id);
        fetchTrail(tid);
        fetchComments(tid);
        fetchBookmark(tid);
        fetchNote(tid);
    }, []);

    const columns = [
        { field: 'user', headerName: 'User', width: 200, valueFormatter: ({ value }) => value.displayName },
        { field: 'message', headerName: 'Message', width: 400,},
    ];

    const addComment = (comment) => { // passing a commentDTO object from this page
        fetch(SERVER_URL + 'api/comments',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(comment)
            })
            .then(response => {
                if (response.ok) {
                    fetchComments(tid);
                }
                else {
                    alert('There is an error processing the create request.');
                }
            })
            .catch(err => console.error(err))
    }

    const addBookmark = (bookmark) => {
        fetch(SERVER_URL + 'api/mybookmarks',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookmark)
            })
            .then(response => {
                if (response.ok) {
                    fetchBookmark();
                }
                else {
                    alert('There is an error processing the create request.');
                }
            })
            .catch(err => console.error(err))
    }

    const addNote = (note) => {
        fetch(SERVER_URL + 'api/mynotes',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(note)
            })
            .then(response => {
                if (response.ok) {
                    fetchNote();
                }
                else {
                    alert('There is an error processing the create request.');
                }
            })
            .catch(err => console.error(err))
    }

    const fetchTrail = (tid) => {
        fetch(SERVER_URL + "api/trail?tid=" + tid)
            .then(response => response.json())
            .then(data => setTrail(data))
            .catch(err => console.error(err));
    }

    const fetchComments = (tid) => {
        fetch(SERVER_URL + "api/comments?tid=" + tid) // fetch the comments associated with trail tid
            .then(response => response.json())
            .then(data => setComments(data))
            .catch(err => console.error(err));
    }

    const fetchBookmark = (tid) => {
        fetch(SERVER_URL + 'api/trailbookmark?uid=' + user.id + "&tid=" + tid) // only fetch bookmarks belong to the user associated with the current context
        .then(response => response.json())
            .then(data => setBookmark(data))
            .catch(err => console.error(err));
    }

    const fetchNote = (tid) => {
        fetch(SERVER_URL + 'api/trailnote?uid=' + user.id + "&tid=" + tid)
        .then(response => response.json())
            .then(data => setNote(data))
            .catch(err => console.error(err));
    }

    return (
        <React.Fragment>
            <AddComment trail={trail} tid={tid} uid={user.id} addComment={addComment} />
            <AddBookmark tid={tid} uid={user.id} addBookmark={addBookmark} />
            <AddNote  tid={tid} uid={user.id} addNote={addNote} />
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={comments}
                    columns={columns}
                    getRowId={row => SERVER_URL + 'api/trail?tid=' + row.id} />
            </div>
        </React.Fragment>
    );
}
export default Trail;