import React, { useState } from 'react'
import Logo from './logo.png'
import axios from 'axios'

export default function Auth(props) {
    const [formData, setFormData] = useState({})
    
    const handleChange = (e) => {
        setFormData(previousState => (
            {
                ...previousState,
                [e.target.name] : e.target.value
            }
        ))

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password.length < 8) {
            console.log('not good enough pal')
        } else {
            const apiUrl = 'https://yolo-reece.codeanyapp.com/api/register'
            axios.post(apiUrl, formData)
            .then(response => {
                console.log(response)
                // save token
                // useHistory push to Dashboard
            })
            .catch(error => {
                console.log(error)
            })
        }

    }
    console.log(formData)
    // setup form validation
    // setup error handling from API

    return (
        <div className="LoginBox text-center" >

            <main className="form-signin">
                <div className="row d-flex justify-content-center">
                    <div className="col-3 mt-5">
                        <form
                            onSubmit={handleSubmit}>
                            <img className="mb-4 rounded" src={Logo} alt="" width="72" height="57" />
                            <h1 className="h3 mb-3 fw-normal">Sign Up for Free</h1>
                            <div className="form-floating">
                                <input
                                    name='name'
                                    type="text"
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder="Johnny"
                                    onChange={handleChange}
                                    value={formData.name || ''}

                                    />
                                <label htmlFor="floatingInput">Name</label>
                            </div>
                            <div className="form-floating">
                                <input
                                    name='email'
                                    type="email"
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder="name@example.com"
                                    onChange={handleChange}
                                    value={formData.email || ''}
                                    />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating">
                                <input
                                    name='password'
                                    type="password"
                                    className="form-control"
                                    id="floatingPassword"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    value={formData.password || ''}
                                    />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>

                            <button
                                className="w-100 btn btn-lg btn-primary"
                                type="submit">
                                Sign Up
                        </button>
                            <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
                        </form>
                    </div>
                </div>
            </main>



        </div>
    )
}
