import React from "react";
import { useUserContext } from "../context/userContext";
import Login from "../components/auth/auth";
import { Cookies } from "react-cookie";


const Protected = ({ children }) => {
    const {user} = useUserContext();
    const authenticated = checkAuth();
    
    function checkAuth() {
        const cookies = new Cookies();
        if (cookies.get('Authorization') !== undefined) {
            return true;
        }
        return false;
    };


    return <>{user.isLoggedIn && authenticated ? children : <Login />}</>;
    
}
export default Protected;