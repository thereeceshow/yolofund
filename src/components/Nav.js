import React from 'react'
import { useAuth } from '../utilities/AuthContext'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import Trade from './Trade'


export default function Nav(props) {


    const {
        logout,
        userData,
        token
    } = useAuth();

    let history = useHistory();
    let location = useLocation();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid mx-5">
                <NavLink to='/' className="navbar-brand text-right">YOLO Funds</NavLink>
                <button className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink exact to="/" className='nav-link mx-2' activeClassName='active'>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/about" className='nav-link mx-2' activeClassName='active'>About</NavLink>
                        </li>
                        {token && <li className="nav-item">
                            <NavLink to="/dashboard" className='nav-link mx-2' activeClassName='active'>Dashboard</NavLink>
                        </li>}
                        {/* {!token && <li className="nav-item">
                            <NavLink to="/register" className='nav-link mx-2 btn btn-outline-success' activeClassName='active'>Sign Up</NavLink>
                        </li>} */}
                        {/* {!token && <li className="nav-item">
                            <NavLink to="/login" className='nav-link mx-2 btn btn-outline-success' activeClassName='active'>Login</NavLink>
                        </li>} */}
                    </ul>
                    <div>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {token && <li className="navbar-text">
                                Signed in as: <em>{userData.email}</em>
                            </li>}
                            {!token && <li className="nav-item">
                                <NavLink to="/register" className='nav-link mx-2 btn btn-outline-success' activeClassName='active'>Sign Up</NavLink>
                            </li>}
                            {!token &&<li className="nav-item">
                                <NavLink to="/login" className='nav-link mx-2 btn btn-outline-success' activeClassName='active'>Login</NavLink>
                            </li>}
                            {token && <button className="mx-2 btn btn-outline-primary" onClick={logout}>Log Out</button>}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

