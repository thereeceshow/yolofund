import React, { useState } from 'react'
import Logo from '../logo.png'
// import axios from 'axios'

// import { useAuth } from '../utilities/useAuth'
import { useForm } from '../utilities/useForm'
import { useAuth } from '../utilities/useAuth'
import validate from '../utilities/FormValidationRules'

export default function Signup() {
    const {
        formData,
        errors,
        handleChange,
        handleSubmit,
    } = useForm(login, validate);

    function login() {
        console.log('success')
    }

    
    const {
        register,
        token
    } = useAuth();

    const APIpost = e => {
        e.preventDefault()
        const data = { name: 'test', email: 'test@test.com', password: 'changme'};
        register(data)
    }

    return (
        <div className="LoginBox text-center" >

            <main className="form-signin">
                <div className="row d-flex justify-content-center">
                    <div className="col-3 mt-5">
                        <form
                            onSubmit={handleSubmit } noValidate>
                            <img className="mb-4 rounded" src={Logo} alt="" width="72" height="57" />
                            <h1 className="h3 mb-3 fw-normal">Sign Up for Free</h1>
                            <div className="form-floating">
                                <input className={errors.name && 'border border-danger'}
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
                                <input className={errors.email && 'border border-danger'}
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
                                <input className={errors.password && 'border border-danger'}
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
