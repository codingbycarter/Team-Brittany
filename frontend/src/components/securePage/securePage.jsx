import React, { useEffect, useState } from 'react';
import axios from "../../api/axios";
import { Cookies } from 'react-cookie';
import { useUserContext } from '../../context/userContext';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TrailList from "../../components/trail/TrailList.js";

function SecurePage() {
    const [data, setData] = useState(null);    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const cookies = new Cookies();
    const {user} = useUserContext();

    useEffect(() => async (e) => {
    const token = cookies.get('Authorization');
    const response = await ( 
        axios.get('/secure', {
        headers: { 
            "Content-Type": "application/json",
            "Authorization": token 
        },
        withCredentials: true,
        }
    ));
    // return setData(response.data);
    }, []);


    // if (!data) {
    //     return <p>Loading...</p>
    // }
    
    return (
        <>
        <div>
            <h3>You are now logged in:</h3>
            <p>{data}</p>
        </div>

            
        <div>
          <p>User ID: {user.id}</p>
          <p>Username: {user.displayName}</p>
          <p>User Email: {user.email}</p>
        </div>

        <div>
            <nav>
                <ul>
                    <li><Link to="/trails">Browse Trails</Link></li>
                    <li><Link to="/mynotes">My Notes</Link></li>
                    <li><Link to="/mycomments">My Comments</Link></li>
                    <li><Link to="/mybookmarks">My Bookmarks</Link></li>
                </ul>
            </nav>
            
        </div>
        </>
    );
}

export default SecurePage;