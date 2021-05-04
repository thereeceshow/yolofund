import React from 'react'
import { useAuth } from '../utilities/AuthContext'
import { Link } from 'react-router-dom'

export default function Nav(props) {


    const {
        logout,
        token
    } = useAuth();
    // let history = useHistory()

    // const logOut = () => {

    // }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid mx-5">
                <a className="navbar-brand text-right">YOLO Funds</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/about" className="nav-link mx-2">About</Link>
                        </li>
                        {token && <li className="nav-item">
                            <Link to="/dashboard" className="nav-link mx-2">Dashboard</Link>
                        </li>}
                        {!token && <li className="nav-item">
                            <Link to="/register" className="mx-2 btn btn-outline-success">Sign Up</Link>
                        </li>}
                        {!token && <li className="nav-item">
                            <Link to="/login" className="mx-2 btn btn-outline-success">Login</Link>
                        </li>}
                        {token && <button className="btn btn-outline-primary" onClick={logout}>Log Out</button>}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

