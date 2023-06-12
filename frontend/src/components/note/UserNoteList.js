import React, { useEffect, useState, createContext, useContext } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport, gridClasses } from '@mui/x-data-grid';
import { SERVER_URL } from '../../constants.js'
import AddNote from './AddNote.js';
import EditNote from './EditNote.js';

import { userContext, useUserContext, UserContextProvider } from '../../context/userContext.js';
import axios from "../../api/axios.js";
import { Cookies } from 'react-cookie';

function UserNoteList() {
    const [notes, setNotes] = useState([]);
    const [open, setOpen] = useState(false);

    const {user} = useUserContext();

    useEffect(() => {
        fetchnotes();
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
                <EditNote data={row} updateNote={updateNote} />
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

    const fetchnotes = () => {
        fetch(SERVER_URL + 'api/mynotes?uid=' + user.id)
        .then(response => response.json())
            .then(data => setNotes(data))
            .catch(err => console.error(err));
    }

    const onDelClick = (url) => {
        if (window.confirm("Please confirm you want to delete the note.")) {
            fetch(url, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        fetchnotes();
                        setOpen(true);
                    }
                    else {
                        alert('There is an error processing the delete request.');
                    }
                })
                .catch(err => console.error(err))
        }
    }

    const addNote = (note) => {
        fetch(SERVER_URL + 'api/notes',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(note)
            })
            .then(response => {
                if (response.ok) {
                    fetchnotes();
                }
                else {
                    alert('There is an error processing the create request.');
                }
            })
            .catch(err => console.error(err))
    }

    const updateNote = (note, link) => {
        fetch(link,
            { 
              method: 'PUT', 
              headers: {
              'Content-Type':  'application/json',
            },
            body: JSON.stringify(note)
          })
            .then(response => {
                if (response.ok) {
                    fetchnotes();
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
                    rows={notes}
                    columns={columns}
                    getRowId={row => SERVER_URL + 'api/note?nid=' + row.id} />
            </div>
        </React.Fragment>
    );
}
export default UserNoteList;