import React, { useState, useEffect } from 'react';
import axios from 'axios'
import TradeButton from './TradeButton'
import { API_KEY } from '../utilities/api'
import { useAuth } from '../utilities/AuthContext'
import { Redirect } from 'react-router-dom'
import useDeepCompareEffect from 'use-deep-compare-effect'

export default function Dash() {

    function yesterday() {
        let date1 = new Date();
        let month = "" + (date1.getMonth() + 1);
        let day = "" + (date1.getDate() - 1);
        let year = date1.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    function marketStatusAPI(url) {
        axios({
            method: 'get',
            url: 'https://api.polygon.io/' + url,
        })
            .then(function (response) {
                console.log(response.data)
                console.log('GETTING MARKET STATUS...')
                setStatus(response.data.market)
                console.log(status)
            })
            // return response.data
            .catch(console.log('error'))
    }


    function stockAPI(url) {
        console.log(url)
        axios({
            method: 'get',
            url: 'https://api.polygon.io/' + url,
        })
            .then(function (response) {
                console.log(response.data)
                console.log('POLYGON API CONNECTED')
                setStocks(prevStocks => {
                    let stocksCopy = { ...prevStocks }
                    stocksCopy[response.data.ticker] = {
                        ...stocksCopy[response.data.ticker],
                        apiResult: response.data
                    }
                    console.log("in stockapi, like 61: ", stocksCopy[response.data.symbol])
                    return stocksCopy

                })
                // return response.data
            })
            .catch(console.log('error'))
    }

    const [stocks, setStocks] = useState({ 'AAPL': {}, 'MSFT': {}, 'TSLA': {}, 'GME': {}, 'YETI': {}, 'CVS': {}, 'MAR': {} });

    const [status, setStatus] = useState([])

    const getWsClient = (url, apiKey) => {
        if (!apiKey) {
            throw new Error("api key not provided.");
        }

        const ws = new WebSocket(url)

        ws.onopen = (props) => {
            ws.send(`{"action":"auth","params":"${apiKey}"}`)
            // ws.send(`{"action":"subscribe","params":"Q.${props}"}`)
            const stockParams = Object.keys(stocks).reduce((str, current) => {
                return str + `T.${current},Q.${current},A.${current},`
            }, '')
            // console.log(stockParams);
            ws.send(`{"action":"subscribe","params":"${stockParams.slice(0, -1)}"}`)
            // ws.send(`{"action":"subscribe","params":"Q.*"}`)
        }

        ws.onmessage = (data) => {
            data = JSON.parse(data.data);
            setStocks(prevStocks => {
                let stocksCopy = { ...prevStocks }
                data.map((msg) => {
                    if (msg.ev === 'status') {
                        return console.log('status update - ', msg.message)
                    }
                    if (msg && Object.keys(msg).length > 0) {
                        stocksCopy[msg.sym] = { ...stocksCopy[msg.sym], ...msg }
                    }
                    // stocksCopy[msg.sym] = {...stocksCopy[msg.sym], ...msg}

                })
                return stocksCopy;

            });

        }

        return ws;
    }

    const getStocksWebsocket = (apiKey, apiBase = 'wss://socket.polygon.io') => {
        return getWsClient(`${apiBase}/stocks`, apiKey);
    }

    useEffect(() => {
        if (Object.keys(stocks).length > 0) {
            const stockWS = getStocksWebsocket(API_KEY)
            let date = yesterday();
            Object.keys(stocks).map(item => {
                stockAPI('v2/aggs/ticker/' + item + '/prev?unadjusted=true&apiKey=' + API_KEY);
                // stockAPI('v1/open-close/' + item + '/' + date + '?unadjusted=true&apiKey=' + API_KEY);
                // console.log(userStocks)
            })

        }
    }, [Object.keys(stocks).length])


    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    const [currentTime, setCurrentTime] = useState('')

    useEffect(() => {
        marketStatusAPI("v1/marketstatus/now?&apiKey=" + API_KEY)
        setInterval(() => setCurrentTime(p => new Date().toLocaleTimeString()), 1000)
    }, [])

    useEffect(() => {
        const time = new Date();
        if (time.getMinutes() === 0 || time.getMinutes() === 30) {
            if (time.getSeconds() === 0) {
                marketStatusAPI("v1/marketstatus/now?&apiKey=" + API_KEY)
            }
        }
        // console.log(currentTime, stocks)
    }, [currentTime])


    function countShares(item) {
        let counter = 0
        for (let i = 0; i < userData.stocks.length; i++) {
            if (userData.stocks[i].ticker_sym == stocks[item].sym && userData.stocks[i].buy == 1) {
                counter += userData.stocks[i].shares
            }
            if (userData.stocks[i].ticker_sym == stocks[item].sym && userData.stocks[i].buy == 0) {
                counter -= userData.stocks[i].shares
            }
        }
        return counter
    }
    function countGain(item) {
        let shares = 0
        let counter = 0
        for (let i = 0; i < userData.stocks.length; i++) {
            if (userData.stocks[i].ticker_sym == stocks[item].sym && userData.stocks[i].buy == 1) {
                counter += (userData.stocks[i].transaction_price * userData.stocks[i].shares)
                shares += userData.stocks[i].shares
            }
            if (userData.stocks[i].ticker_sym == stocks[item].sym && userData.stocks[i].buy == 0) {
                {/* counter -= (userData.stocks[i].transaction_price * userData.stocks[i].shares) */ }
                counter -= (userData.stocks[i].transaction_price * userData.stocks[i].shares)
                shares -= userData.stocks[i].shares
            }
            if (shares === 0) {
                counter = 0
            }
        }
        return counter / shares
    }

    const {
        token,
        userData
    } = useAuth();

    const [accountValue, setAccountValue] = useState(0)

    useDeepCompareEffect(() => {
        if (Object.keys(userData).length > 0) {
            setAccountValue(userData.cash)
        }
    }, [userData])


    useDeepCompareEffect(() => {
        // only change when stock price or # of shares change
        if (Object.keys(userData).length > 0) {

            setAccountValue(prev => {
                let newAccountValue = 0;
                for (let sym of Object.keys(stocks)) {
                    let shareAmount = countShares(sym)
                    // let shareAmount = share.shares
                    let currentPrice = stocks[sym].p
                    newAccountValue += shareAmount * currentPrice
                }
                newAccountValue += userData.cash
                return newAccountValue
            })
        }
    }, [userData, stocks])



    if (token) {

        // let accountValue = userData.cash

        return (
            <div className="container full">
                <div className='row d-flex g-3 mx-1 mt-1 rounded text-start'>
                    <div className="col">
                        <div className="row">
                            <h3>Welcome <span className="text-end fw-bold">{userData.name}</span></h3>
                            <div className="col-6 col-md-3 col-lg-2">
                                <p>Available Funds:
                                <br />
                                Account Value:
                                <br />
                                Gain/Loss:
                                <br />
                                Market Status:
                                </p>
                            </div>
                            <div className="col-6 col-md-9 col-lg-10">
                                <p><span className="text-end fw-bold">{formatter.format(userData.cash)}</span>
                                    <br />
                                    <span className="text-end fw-bold">{!isNaN(accountValue) ? formatter.format(accountValue) : <div className="spinner-border spinner-border-sm" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>}</span>
                                    <br />
                                    <span className={(accountValue - 500000) < 0 ? 'text-danger text-end fw-bold' : ""}>{!isNaN(accountValue) ? ((accountValue - 500000) / 5000).toFixed(2) + '%' : <div className="spinner-border spinner-border-sm" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>}</span>
                                    <br />
                                    <span className="text-end fw-bold text-capitalize">{status}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`row d-flex g-1 mx-1 mt-1 rounded ${status === 'closed' && 'd-none'}`}>
                    <div className='col-12 justify-content-evenly text-start table-responsive'>
                        <table className="table table-success table-striped table-hover table-bordered border table-sm">
                            <thead>
                                <tr>
                                    <th scope="col" className="mx-1 px-1">Ticker</th>
                                    <th scope="col" className="mx-2 px-4">Price</th>
                                    <th scope="col" className="mx-2 px-5 d-none d-xl-table-cell">Bid</th>
                                    <th scope="col" className="mx-2 px-5 d-none d-xl-table-cell">Ask</th>
                                    <th scope="col" className="mx-1 px-3 d-none d-lg-table-cell">Volume</th>
                                    <th scope="col" className="mx-1 px-3 d-none d-lg-table-cell">Prev Close</th>
                                    <th scope="col" className="mx-2 px-3 d-none d-lg-table-cell">Day Change</th>
                                    <th scope="col" className="mx-1 px-3">Shares</th>
                                    <th scope="col" className="mx-1 px-4 d-none d-lg-table-cell">Value</th>
                                    <th scope="col" className="mx-1 px-3 d-none d-lg-table-cell">Gain/Loss</th>
                                    <th scope="col" className="mx-1 px-3">Trade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(stocks).sort().map((item, index) => {
                                    if (stocks[item].apiResult) {
                                        var change = ((parseFloat(stocks[item].p) - parseFloat(stocks[item].apiResult.results[0].c)) * 100 / parseFloat(stocks[item].p)).toFixed(2)
                                    }
                                    if (stocks[item].sym && userData.stocks) { // took off .length for error

                                        var shares = countShares(item) //
                                        var cost = countGain(item) // transaction_price
                                        var value = shares * stocks[item].p
                                        var gain =  (shares * stocks[item].p) - (cost * shares)
                                        {/* console.log(item, cost) */}
                                        {/* setAccountValue(  accountValue + value) */ }
                                        {/* accountValue += value */ }
                                        {/* console.log(accountValue) */ }

                                    }
                                    {/* console.log(stocks) */ }

                                    return (
                                        <tr key={index}>
                                            {/* ---------- TICKER NAME ------------ */}
                                            <th scope="row"><a href={`https://finance.yahoo.com/quote/${stocks[item].sym}`} target="_blank">
                                                {stocks[item].sym ? stocks[item].sym : <div className="spinner-border spinner-border-sm text-success" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>}
                                            </a>
                                            </th>
                                            {/* ---------- Price ------------ */}
                                            <td className={stocks[item].apiResult && stocks[item].p < stocks[item].apiResult.results[0].c ? 'text-danger' : 'text-success'} >
                                                {stocks[item].p ? formatter.format(stocks[item].p) : <div className="spinner-border spinner-border-sm text-success" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>}
                                            </td>
                                            {/* ----------Bid------------ */}
                                            <td className='d-none d-xl-table-cell' >
                                                {stocks[item].bp ? formatter.format(stocks[item].bp) : <div className="spinner-border spinner-border-sm text-success" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>}
                                            </td>
                                            {/* ----------Ask------------ */}
                                            <td className='d-none d-xl-table-cell' >
                                                {stocks[item].ap ? formatter.format(stocks[item].ap) : <div className="spinner-border spinner-border-sm text-success" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>}
                                            </td>
                                            {/* ----------Current Volume------------ */}
                                            <td className='d-none d-lg-table-cell' >
                                                {stocks[item].v ? stocks[item].v : <div className="spinner-border spinner-border-sm text-success" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>}
                                            </td>
                                            {/* ----------Prev Close------------ */}
                                            <td className='d-none d-lg-table-cell' >
                                                {stocks[item].apiResult ? formatter.format(stocks[item].apiResult.results[0].c) : <div className="spinner-border spinner-border-sm text-success" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>}
                                            </td>
                                            {/* ----------Day Change------------ */}
                                            <td className='d-none d-lg-table-cell'>
                                                {stocks[item].apiResult && <span className={change < 0 ? 'text-danger' : 'text-success'}>{!isNaN(change) && change + "%"}</span>}
                                            </td>
                                            {/* ----------Shares------------ */}
                                            <td>
                                                {shares > 0 ? shares : '-'}
                                            </td>
                                            {/* ----------Value------------ */}
                                            <td className='d-none d-lg-table-cell'>
                                                {shares > 0 ? formatter.format(value) : '-'}
                                            </td>
                                            {/* ----------Gain / Loss------------ */}
                                            <td className='d-none d-lg-table-cell'>
                                                {shares > 0 ? <span className={gain < 0 ? 'text-danger' : 'text-success'}>{formatter.format(gain)}</span> : '-'}
                                                {/* {formatter.format(gain)} */}
                                            </td>
                                            {/* ----------Trade Button------------ */}
                                            <td className="text-center">
                                                <TradeButton
                                                    id={index}
                                                    stock={stocks[item].sym}
                                                    price={stocks[item].p}
                                                    shares={shares}
                                                    cash={userData.cash}
                                                    trade
                                                />
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    } else {
        return <Redirect to='login' />
    }
}
