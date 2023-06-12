import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'

import Home from './components/home/home.jsx';
import Login from './components/auth/auth';
import Register from './components/register/register';
import Header from './components/header/header.jsx'
import SecurePage from './components/securePage/securePage.jsx';
import Logout from './components/logout/logout';
import Protected from './utils/protected';

import TrailList from "./components/trail/TrailList.js";
import Trail from "./components/trail/TrailDetails.js";
import UserBookmarkList from "./components/bookmark/UserBookmarkList"
import UserNoteList from "./components/note/UserNoteList.js";
import UserCommentList from './components/comment/UserCommentList';

import { UserContextProvider } from './context/userContext';


/* TODO: Set authentication context for secured APIs that calls Login function if no token is accessable 
   TODO: Set check for Auth token */


function App() {


  return (

    <UserContextProvider>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Register />} />
            <Route
              path="/secure" element={
                <Protected>
                  <SecurePage />
                </Protected>
              }
            />
            <Route path="/logout" exact element={<Logout />} />

            <Route path="/trails" exact element={<TrailList />} />
            <Route path="/traildetails/:tid" exact element={<Trail />} />
            
            <Route path="/mybookmarks" exact element={<UserBookmarkList />} />
            <Route path="/mynotes" exact element={<UserNoteList />} />
            <Route path="/mycomments" exact element={<UserCommentList />} />
          </Routes>
        </div>
      </Router>
    </UserContextProvider>
  );

}

export default App;