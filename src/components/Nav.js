import React from 'react'
import { Link, useHistory } from 'react-router-dom'

export default function Nav(props) {
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
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <Link to="/About" className="nav-link mx-2">About</Link>
                        </li>
                            <li class="nav-item">
                                <Link to="/register" className="mx-2 btn btn-outline-success">Sign Up</Link>
                            </li>

                            <Link to="/login" className="mx-2 btn btn-outline-success">Login</Link>
                    
                        {/* <button className="btn btn-outline-primary" onClick={logOut}>Log Out</button> */}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

