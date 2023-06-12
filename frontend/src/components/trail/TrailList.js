import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport, gridClasses } from '@mui/x-data-grid';
import Link  from '@mui/material/Link';
import { SERVER_URL } from '../../constants.js'
import AddTrail from './AddTrail.js';
import EditTrail from './EditTrail.js';
import Trail from './TrailDetails.js';

// for manually created trails; use an api to add trails if time allows
function TrailList() {
    const [trails, setTrails] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchTrails();
    }, []);

    const columns = [
        { field: 'title', headerName: 'Title', width: 200,
            renderCell: (params) =>
                {return <Link href={"traildetails/" + params.row.id} state={{tid: params.row.id, trail: params}}>{params.row.title}</Link>}
        },
        { field: 'description', headerName: 'Description', width: 400 },
        {
            field: 'edit',
            headerName: '',
            sortable: false,
            filterable: false,
            renderCell: row =>
                <EditTrail data={row} updateTrail={updateTrail} />
        },
        {
            field: 'delete',
            headerName: '',
            sortable: false,
            filterable: false,
            renderCell: row =>
                <button
                // for trail with id 1: api/trail?tid=1
                    onClick={() => onDelClick(row.id)}>Delete
                </button>
        },
        
    ];


    const fetchTrails = () => {
        fetch(SERVER_URL + 'api/trails')
            .then(response => response.json())
            .then(data => setTrails(data))
            .catch(err => console.error(err));
    }

    const onDelClick = (url) => {
        if (window.confirm("Please confirm you want to delete the trail.")) {
            fetch(url, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        fetchTrails();
                        setOpen(true);
                    }
                    else {
                        alert('There is an error processing the delete request.');
                    }
                })
                .catch(err => console.error(err))
        }
    }

    const addTrail = (trail) => {
        fetch(SERVER_URL + 'api/trails',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(trail)
            })
            .then(response => {
                if (response.ok) {
                    fetchTrails();
                }
                else {
                    alert('There is an error processing the create request.');
                }
            })
            .catch(err => console.error(err))
    }

    const updateTrail = (trail, link) => {
        fetch(link,
            { 
              method: 'PUT', 
              headers: {
              'Content-Type':  'application/json',
            },
            body: JSON.stringify(trail)
          })
            .then(response => {
                if (response.ok) {
                    fetchTrails();
                }
                else {
                    alert('There is an error processing the update request.');
                }
            })
            .catch(err => console.error(err))
    }

    return (
        <React.Fragment>
            <AddTrail addTrail={addTrail} />
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={trails}
                    columns={columns}
                    // generate a unique id for each row using each trail's detailed page
                    getRowId={row => SERVER_URL + 'api/trail?tid=' + row.id} />
            </div>
        </React.Fragment>
    );
}
export default TrailList;