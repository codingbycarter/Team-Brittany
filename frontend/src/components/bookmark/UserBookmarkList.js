import React, { useEffect, useState, createContext, useContext } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport, gridClasses } from '@mui/x-data-grid';
import { SERVER_URL } from '../../constants.js'
import AddBookmark from './AddBookmark.js';

import { userContext, useUserContext, UserContextProvider } from '../../context/userContext.js';
import axios from "../../api/axios.js";
import { Cookies } from 'react-cookie';

function UserBookmarkList() {
    const [bookmarks, setBookmarks] = useState([]);
    const [open, setOpen] = useState(false);

    const {user} = useUserContext();

    useEffect(() => {
        fetchBookmarks();
    }, []);

    const columns = [
        { field: 'trail', headerName: 'Trail', width: 200,  valueFormatter: ({ value }) => value.title},
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

    const fetchBookmarks = () => {
        fetch(SERVER_URL + 'api/mybookmarks?uid=' + user.id) // only fetch bookmarks belong to the user associated with the current context
        .then(response => response.json())
            .then(data => setBookmarks(data))
            .catch(err => console.error(err));
    }

    const onDelClick = (url) => {
        if (window.confirm("Please confirm you want to delete the bookmark.")) {
            fetch(url, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        fetchBookmarks();
                        setOpen(true);
                    }
                    else {
                        alert('There is an error processing the delete request.');
                    }
                })
                .catch(err => console.error(err))
        }
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
                    fetchBookmarks();
                }
                else {
                    alert('There is an error processing the create request.');
                }
            })
            .catch(err => console.error(err))
    }

    const updateBookmark = (bookmark, link) => {
        fetch(link,
            { 
              method: 'PUT', 
              headers: {
              'Content-Type':  'application/json',
            },
            body: JSON.stringify(bookmark)
          })
            .then(response => {
                if (response.ok) {
                    fetchBookmarks();
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
                    rows={bookmarks}
                    columns={columns}
                    getRowId={row => SERVER_URL + 'api/bookmark?bid=' + row.id} />
            </div>
        </React.Fragment>
    );
}
export default UserBookmarkList;