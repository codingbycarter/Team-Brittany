import React, { useEffect, useState } from 'react';
import axios from "../../api/axios";
import { Cookies } from 'react-cookie';
import { useUserContext } from '../../context/userContext';

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

        </>
    );
}

export default SecurePage;