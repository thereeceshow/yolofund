import React from 'react'
import Logo from './logo.png'

export default function Login(props) {
    return (
        <div className="LoginBox text-center" >

            <main className="form-signin">
                <div className="row d-flex justify-content-center">
                    <div className="col-3 mt-5">
                        <form
                            onSubmit="#">
                            <img className="mb-4 rounded" src={Logo} alt="" width="72" height="57" />
                            <h1 className="h3 mb-3 fw-normal">Sign Up for Free</h1>
                            <div className="form-floating">
                                <input
                                    name='email'
                                    type="email"
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder="name@example.com"/>
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating">
                                <input
                                    name='password'
                                    type="password"
                                    className="form-control"
                                    id="floatingPassword"
                                    placeholder="Password"/>
                                <label htmlFor="floatingPassword">Password</label>
                            </div>

                            <div className="checkbox mb-3">
                                <label>
                                    <input type="checkbox" value="remember-me" /> Remember me
                        </label>
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
