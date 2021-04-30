import React, { createContext, useState, useEffect, useContext } from 'react';
import { axiosHelper } from './axiosHelper'

const AuthContext = createContext({});

export const AuthHelper = () => {
    const [token, setToken ] = useState('')

    useEffect(() => {
        let localToken = window.localStorage.getItem('token');

        if (localToken) {
            // axiosHelper({
            //     url: '/api/auth/user',
            //     successMethod: saveUserData,
            //     failureMethod: destroyToken,
            //     token: localToken
            // }

            setToken(localToken)
        }
    }, [])

    function saveUserData(response) {
        console.log("success saving data", response.data)
    }

    function saveToken(response) {
        const APItoken = response.data.data.token || response.data.access_token;
        setToken(APItoken)
        window.localStorage.setItem('token', APItoken);
    }

    function destroyToken() {
        setToken('')
        window.localStorage.removeItem('token');
    }

    function register(regData) {
        axiosHelper({
            data: regData,
            method: 'post',
            url: '/api/register',
            successMethod: saveToken
        })
    }

    function login(loginData) {
        axiosHelper({
            data: loginData,
            method: 'post',
            url: '/oauth/token',
            successMethod: saveToken,
        })
    }

    function logout() {
        axiosHelper({
            url: '/api/logout',
            successMethod: destroyToken,
            token
        })
    }

    return { token, register, login, logout }
}

export const AuthProvider = (props) => {

    const initialContext = AuthHelper()

    return(
        <AuthContext.Provider value={initialContext}>
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

export default AuthContext;