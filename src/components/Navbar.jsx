import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, logout } from "./features/authSlice";
import './Navbar.css';
import navbarImage from './images/navbar.jpeg'

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();

  const myStyle = {
    backgroundImage: `url(${navbarImage})`,
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate('/')
  };

  return (
    <div style={myStyle}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid ">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/home" className="nav-link">
                  Home
                </Link>
              </li>
              <li>
                {(role === "organizer") &&
                  <Link to="/event/create" className="nav-link">Schedule Event</Link>
                }
              </li> <br />
              <li>
                {(role === "organizer") &&
                  <Link to="/users" className="nav-link">User List</Link>
                }
              </li> <br />
              <li>
                {(role === "attendees" || role === "organizer") &&
                  <Link to="/view" className="nav-link">View Events</Link>
                }
              </li>
              <li className="nav-item">
                {isLoggedIn ? (
                  <>
                    <button onClick={handleLogout}>Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                    <Link to="/register" className="nav-link">
                      Register
                    </Link>
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
