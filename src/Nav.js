import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

export default function Nav(props) {
    let history = useHistory()

    let test = 0

    const logOut = () => {

        axios({
            method: 'get',
            url: 'http://awesomeincbootcampapi-ianrios529550.codeanyapp.com/api/auth/logout',
            headers: {
                Authorization: `Bearer ${props.token}`
            }
        })
            .then(function(response) {
                props.deleteToken();
                history.push('/')
            })
            .catch(function(error) {
                console.log(error);
            });
}

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid mx-5">
                <a className="navbar-brand text-right">YOLO Funds</a>
                <span className="d-flex">
                { test == 0 ? <>
                        <Link to="/login" className="mx-2 btn btn-outline-success">Sign Up</Link>
                        <Link to="/login" className="mx-2 btn btn-outline-success">Login</Link>
                    </> :
                        <button className="btn btn-outline-primary" onClick={logOut}>Log Out</button>}
                </span>
            </div>
        </nav>
    )
}

