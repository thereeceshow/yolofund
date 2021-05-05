import React, { createContext, useState, useEffect, useContext } from 'react';
import { axiosHelper } from './axiosHelper'
import history from './history';
import { CLIENT_SEC } from '../utilities/api'


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

    function saveToken(res) {
        let APItoken; // Initalize variable
        if (res.config.url === "https://yolo-reece.codeanyapp.com/api/auth/register") {
            APItoken = res.data.data.token
        } else if (res.config.url === "https://yolo-reece.codeanyapp.com/api/auth/login") {
            APItoken = res.data.access_token
        }
        console.log(res.data);
        setToken(APItoken)
        window.localStorage.setItem('token', APItoken);
        history.replace('/dashboard');
        
    }

    function destroyToken() {
        setToken('')
        window.localStorage.removeItem('token');
        history.replace('/');
    }

    function register(regData) {
        axiosHelper({
            data: regData,
            method: 'post',
            url: '/api/auth/register',
            successMethod: saveToken
        })
    }

    function login(loginData) {
        console.log('logging in')
        loginData.client_id = '2';
        loginData.client_secret = CLIENT_SEC;
        loginData.scope = '';
        loginData.grant_type = 'password';
        loginData.username = loginData.email;
        axiosHelper({
            data: loginData,
            method: 'post',
            url: '/api/auth/login',
            successMethod: saveToken,
        })
    }

    function logout() {
        console.log('loggingout')
        axiosHelper({
            url: '/api/auth/logout',
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