import React, { createContext, useState, useEffect, useContext } from 'react';
import { axiosHelper } from './axiosHelper'
import history from './history';
import { CLIENT_SEC } from '../utilities/api'


const AuthContext = createContext({});

export const AuthHelper = () => {
    const [token, setToken ] = useState('')
    const [cash, setCash ] = useState('')
    const [ gain,  setGain ] = useState('')

    useEffect(() => {
        let localToken = window.localStorage.getItem('token');

        if (localToken) {
            setToken(localToken)
        }
    }, [])

    useEffect(() => {
        let localCash = window.localStorage.getItem('cash');

        if (localCash) {
            setCash(localCash)
        }
    }, [])

    useEffect(() => {
        let localGain = window.localStorage.getItem('gain');

        if (localGain) {
            setGain(localGain)
        }
    }, [])
    

    function saveUserData(response) {
        console.log("success saving data", response.data)
    }

    function saveToken(res) {
        let APItoken = res.data.data.token; // Initalize variable
        let APIcash = res.data.data.user_data.cash
        let APIgain = res.data.data.user_data.realized_gain
        setToken(APItoken)
        window.localStorage.setItem('token', APItoken);
        window.localStorage.setItem('cash', APIcash);
        window.localStorage.setItem('gain', APIgain);
        history.replace('/dashboard');
        
    }

    function destroyToken() {
        setToken('')
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('cash');
        window.localStorage.removeItem('gain');
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
        console.log('logging in');
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
            failureMethod: destroyToken,
            token
        })
    }

    return { token, cash, gain, register, login, logout }
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