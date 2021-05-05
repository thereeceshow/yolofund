import React, { useState } from 'react'
import Logo from '../logo.png'
// import axios from 'axios'

// import { useAuth } from '../utilities/useAuth'
import useForm from '../utilities/useForm'
import { useAuth } from '../utilities/AuthContext'
import validate from '../utilities/FormValidationRules'

export default function Signup(props) {
    console.log(props)
    function signin() {
        console.log('success')
    }

    const {
        register,
        login,
        token
    } = useAuth();

    const APIpost = e => {
        // const data = { name: 'test', email: 'test@test.com', password: 'changme'};
        props.register && register(formData);
        props.login && login(formData)
    }

    const {
        formData,
        errors,
        handleChange,
        handleSubmit
    } = useForm(APIpost,
        (fData) => validate(fData, props));

    return (
        <div className="LoginBox text-center" >

            <main className="form-signin">
                <div className="row d-flex justify-content-center">
                    <div className="col-3 mt-5">
                        <form
                            onSubmit={handleSubmit} className="needs-validation" noValidate>
                            <img className="mb-4 rounded" src={Logo} alt="" width="72" height="57" />
                            <h1 className="h3 mb-3 fw-normal">
                                {props.register && "Sign Up for Free"}
                                {props.login && "Login"}
                            </h1>
                                {props.register && <div className="form-floating">
                                    <input className={`form-control ${formData.name && 'is-valid'} ${!!errors.name && 'is-invalid'}`}
                                        name='name'
                                        type="text"
                                        id="floatingInput"
                                        placeholder="Johnny"
                                        onChange={handleChange}
                                        value={formData.name || ''}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.name}
                                    </div>
                                    <label htmlFor="floatingInput">Name</label>
                                </div>}
                                <div className="form-floating">
                                    <input className={`form-control ${formData.email && 'is-valid'} ${!!errors.email && 'is-invalid'}`}
                                        name='email'
                                        type="email"
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        onChange={handleChange}
                                        value={formData.email || ''}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.email}
                                    </div>
                                    <label htmlFor="floatingInput">Email</label>
                                </div>
                                <div className="form-floating">
                                    <input className={`form-control ${formData.password && formData.password.length>7 && 'is-valid'} ${!!errors.password && 'is-invalid'}`}
                                        name='password'
                                        type="password"
                                        id="floatingPassword"
                                        placeholder="Password"
                                        onChange={handleChange}
                                        value={formData.password || ''}
                                    />
                                    <div className="invalid-feedback mb-2">
                                        {errors.password}
                                    </div>
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>

                                <button
                                    className="w-100 btn btn-lg btn-primary"
                                    type="submit">
                                    Sign Up
                        </button>
                                <p className="mt-2 mb-3 text-muted">&copy; 2021</p>
                        </form>
                    </div>
                    </div>
            </main>



        </div>
    )
}
