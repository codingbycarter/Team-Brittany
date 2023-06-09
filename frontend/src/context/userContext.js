import React, { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import User from "./user";

export const userContext = createContext({
    user: null,
    loadUser: () => {},
    logIn: () => {},
    logOut: () => {} 
});
                  // id, displayName, email, isLoggedIn
const USER = new User(0, "Guest",      "",      false); 

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(USER); //Set's the default user as a guest and not logged in
    if (localStorage.getItem("User") === null) {
        localStorage.setItem("User", JSON.stringify(user)); //Stores the default user in local storage
    }

    //This hook gets the User item from local storage and sets it in the local memory. Without this the user information won't persist
    useEffect(() => {
        const data = localStorage.getItem("User");
        setUser(JSON.parse(data));
    }, [])

    //DIFFERENT from the authentication. This function sets the user information into memory and local storage after successful authentication
    function logIn(id, displayName, email) {
        const authedUser = new User(id, displayName, email, true);
        setUser(authedUser);
        localStorage.setItem("User", JSON.stringify(authedUser));
    }

    //Removes the loaded user from memory and local storage
    function logOut() {
        setUser(USER);
        localStorage.setItem("User", JSON.stringify(USER));
    }


    return (
        <userContext.Provider value={{ user, logIn, logOut }}>
            { children }
        </userContext.Provider>
    );
}

//Makes user, logIn and logOut availible to the rest of the applicaiton
export function useUserContext() {
    const {user, logIn, logOut} = useContext(userContext);

    return {user, logIn, logOut};
}