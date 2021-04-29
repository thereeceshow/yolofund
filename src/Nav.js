import React from 'react'
import { Link, useHistory } from 'react-router-dom'

export default function Nav(props) {
    // let history = useHistory()

    // const logOut = () => {

    // }

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid mx-5">
                <a className="navbar-brand text-right">YOLO Funds</a>
                <span className="d-flex">
                    
                        <Link to="/register" className="mx-2 btn btn-outline-success">Sign Up</Link>
                        {/* <Link to="/login" className="mx-2 btn btn-outline-success">Login</Link>
                    
                        <button className="btn btn-outline-primary" onClick={logOut}>Log Out</button> */}
                </span>
            </div>
        </nav>
    )
}

