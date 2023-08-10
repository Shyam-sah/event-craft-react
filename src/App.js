import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import UserList from "./components/UserList";

import About from "./components/About";
import updateEventForm from "./components/event/updateEvent";
import LoginForm from './components/Login';
import RegistrationForm from "./components/Register";
import CreateEvent from './components/event/createEvent';
import ViewEvents from './components/event/viewEvents';
import themeImage from './components/images/sponsors-bg.jpg'
import { useSelector } from "react-redux";
import Success from "./components/Success";
import Cancel from "./components/Cancel";




const App = () => {
  const myStyle = {
    backgroundImage: `url(${themeImage})`,
  };

  const role = useSelector((state) => state.auth.role);

  return (
    <>
      <div>
        <div className="App" >
          <BrowserRouter>
            <Navbar />
            <Routes>
              {(role === "organizer") && <Route path="/event/create" Component={CreateEvent} />}
              {(role === "organizer" || role === "attendees") && <Route path="/view" Component={ViewEvents} />}
              {(role === "organizer") && <Route path="/edit/:id?" Component={updateEventForm} />}
              {(role === "attendees" || role === "organizer" || role === "") && <Route path="/about" Component={About} />}
              {(role === "attendees" || role === "organizer" || role === "") && <Route path="/Home" Component={Home} />}
              {(role === "attendees" || role === "organizer" || role === "") && <Route path="/register" Component={RegistrationForm} />}
              {(role === "organizer") && <Route path="/users" Component={UserList} />}

              <Route exact path="/login" element={<LoginForm />} />
              <Route exact path="/success" element={<Success />} />
              <Route exact path="/cancel" element={<Cancel />} />

            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}

export default App;
