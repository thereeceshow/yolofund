import React, { createContext, useState, useEffect, useContext } from 'react';
import { axiosHelper } from './axiosHelper'
import history from './history';
import { CLIENT_SEC } from '../utilities/api'


const AuthContext = createContext({});

export const AuthHelper = () => {
    const [token, setToken ] = useState('')
    const [ userData,  setUserData ] = useState({})

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

    // useEffect(() => {
    //     let localCash = window.localStorage.getItem('cash');

    //     if (localCash) {
    //         setCash(localCash)
    //     }
    // }, [])

    // useEffect(() => {
    //     let localGain = window.localStorage.getItem('gain');

    //     if (localGain) {
    //         setGain(localGain)
    //     }
    // }, [])

    // useEffect(() => {
    //     let localStocks = JSON.parse(window.localStorage.getItem( 'userStocks' ));

    //     if (localStocks) {
    //         setUserStocks(localStocks)
    //     }
    // }, [])
    

    function saveUserData(res) {
        setUserData(prevData => ({...res.data}))
        console.log("success saving userData", res.data)
    }

    function saveToken(res) {
        let APItoken = res.data.data.token; // Initalize variable
        let APIdata = res.data.data.user_data
        // let APIcash = res.data.data.user_data.cash
        // let APIgain = res.data.data.user_data.realized_gain
        // let APIstocks = res.data.data.user_data.stocks
        setToken(APItoken)
        setUserData(prevData => ({...APIdata}))
        window.localStorage.setItem('token', APItoken);
        // window.localStorage.setItem('userData', JSON.stringify(APIdata));
        // window.localStorage.setItem('cash', APIcash);
        // window.localStorage.setItem('gain', APIgain);
        // window.localStorage.setItem('userStocks', JSON.stringify(APIstocks));
        history.replace('/dashboard');
        
    }

    function destroyToken() {
        setToken('')
        setUserData(prevData => ({}));
        window.localStorage.removeItem('token');
        // window.localStorage.removeItem('userData');
        // window.localStorage.removeItem('cash');
        // window.localStorage.removeItem('gain');
        // window.localStorage.removeItem('userStocks');
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

    function getUser() {
        axiosHelper({
            url: '/api/auth/user',
            successMethod: saveUserData,
            token
        })
    }

    return { token, userData, register, login, logout }
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