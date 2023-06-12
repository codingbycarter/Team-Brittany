import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport, gridClasses } from '@mui/x-data-grid';
import Link  from '@mui/material/Link';
import { SERVER_URL } from '../../constants.js'
import { userContext, useUserContext, UserContextProvider } from '../../context/userContext.js';
import AddComment from './AddComment.js';
import EditComment from './EditComment.js';

function UserCommentList() {
    const [comments, setComments] = useState([]);
    const [open, setOpen] = useState(false);

    const {user} = useUserContext();

    useEffect(() => {
        fetchComments();
    }, []);

    const columns = [
        { field: 'trail', headerName: 'Trail', width: 200,  valueFormatter: ({ value }) => value.title},
        { field: 'message', headerName: 'Message', width: 200},
        {
            field: 'edit',
            headerName: '',
            sortable: false,
            filterable: false,
            renderCell: row =>
                <EditComment data={row} updateComment={updateComment} />
        },
        {
            field: '_links.self.href',
            headerName: '',
            sortable: false,
            filterable: false,
            renderCell: row =>
                <button
                    onClick={() => onDelClick(row.id)}>Delete
                </button>
        },  
    ];


    const fetchComments = () => {
        fetch(SERVER_URL + 'api/mycomments?uid=' + user.id)
            .then(response => response.json())
            .then(data => setComments(data))
            .catch(err => console.error(err));
    }

    const onDelClick = (url) => {
        if (window.confirm("Please confirm you want to delete the comment.")) {
            fetch(url, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        fetchComments();
                        setOpen(true);
                    }
                    else {
                        alert('There is an error processing the delete request.');
                    }
                })
                .catch(err => console.error(err))
        }
    }

    const addComment = (comment) => {
        fetch(SERVER_URL + 'api/comments',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(comment)
            })
            .then(response => {
                if (response.ok) {
                    fetchComments();
                }
                else {
                    alert('There is an error processing the create request.');
                }
            })
            .catch(err => console.error(err))
    }

    const updateComment = (comment, link) => {
        fetch(link,
            { 
              method: 'PUT', 
              headers: {
              'Content-Type':  'application/json',
            },
            body: JSON.stringify(comment)
          })
            .then(response => {
                if (response.ok) {
                    fetchComments();
                }
                else {
                    alert('There is an error processing the update request.');
                }
            })
            .catch(err => console.error(err))
    }

    return (
        <React.Fragment>
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={comments}
                    columns={columns}
                    getRowId={row => SERVER_URL + 'api/comment?cid=' + row.id} />
            </div>
        </React.Fragment>
    );
}
export default UserCommentList;