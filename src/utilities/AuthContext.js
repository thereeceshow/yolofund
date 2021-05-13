import React, { createContext, useState, useEffect, useContext } from 'react';
import { axiosHelper } from './axiosHelper'
import history from './history';
import { CLIENT_SEC } from '../utilities/api'


const AuthContext = createContext({});

export const AuthHelper = () => {
    const [token, setToken] = useState('')
    const [userData, setUserData] = useState({})

    useEffect(() => {
        let localToken = window.localStorage.getItem('token');

        if (localToken) {
            setToken(localToken)
        }
    }, [])

    useEffect(() => {

        if (token.length > 0) {
            getUser()
        }
    }, [token])

    function saveUserData(res) {
        setUserData(prevData => ({ ...res.data }))
        console.log("success saving userData", res.data)
        // history.go(0)
    }

    function returnError(errorReason) {
        return errorReason
    }

    function saveToken(res) {
        let APItoken = res.data.data.token;
        let APIdata = res.data.data.user_data

        setToken(APItoken)
        setUserData(prevData => ({ ...APIdata }))
        window.localStorage.setItem('token', APItoken);

        history.replace('/dashboard');

    }

    function destroyToken() {
        setToken('')
        setUserData(prevData => ({}));
        window.localStorage.removeItem('token');

        history.replace('/');
    }

    function register(regData) {
        axiosHelper({
            data: regData,
            method: 'post',
            url: '/api/auth/register',
            successMethod: saveToken,
            failureMethod: returnError
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
            failureMethod: returnError
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

    function getUser() {
        console.log('getting User')
        axiosHelper({
            url: '/api/auth/user',
            successMethod: saveUserData,
            token
        })
    }

    // function trade(tradeData) {
    //     console.log('in the trade')
    //     axiosHelper({
    //         url: '/api/auth/trade',
    //         method: 'post',
    //         data: {
    //             shares: tradeData.shares,
    //             price: props.price,
    //             ticker_sym: props.stock,
    //             buy: tradeData.buy
    //         },
    //         successMethod: getUser(),
    //         // failureMethod: 'test',
    //         token
    //     })
    // }

    return { token, userData, register, login, logout }
}

export const AuthProvider = (props) => {

    const initialContext = AuthHelper()

    return (
        <AuthContext.Provider value={initialContext}>
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

export default AuthContext;