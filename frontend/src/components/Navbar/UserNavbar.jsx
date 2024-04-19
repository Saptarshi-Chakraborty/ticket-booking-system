import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getLoginDetails, isLoggedIn } from '../../utils/authentication.js'
import { removeAuthToken } from '../../utils/localstorage.js';

const UserNavbar = ({ isLoggedin, loginDetails, logoutUser }) => {

    return (
        <nav className="navbar navbar-expand-lg bg-body-white">
            <div className="container-fluid px-lg-5">
                <Link className="navbar-brand d-flex align-items-center gap-2 p-0 fs-4 " to="/">
                    <img src="/images/icon-192.png" alt="Logo" width="30" height="24" className="d-inline-block align-text-top img-fluid" />
                    <span >Ticket Booking System</span>
                </Link>

                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 invisible">

                    </ul>

                    <div className="d-flex" >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-2">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/my-tickets">My Tickets</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/unreserved-ticket">Unreserved Ticket</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/reserved-ticket">Reserved Ticket</Link>
                            </li>

                            {/* Accounts Section in Menu */}
                            {
                                (isLoggedin) ?
                                    <li className="nav-item">
                                        <button onClick={logoutUser} className=" btn btn-danger" to="/register">Log out</button>
                                    </li>
                                    :
                                    <li className="nav-item">
                                        <Link className=" btn btn-primary" to="/login">Login</Link>
                                    </li>
                            }

                        </ul>
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default UserNavbar