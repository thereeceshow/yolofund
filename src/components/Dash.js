import React, { useState, useEffect } from 'react';
import axios from 'axios'
import TradeButton from './TradeButton'
import { API_KEY } from '../utilities/api'
import { useAuth } from '../utilities/AuthContext'
import { Redirect } from 'react-router-dom'

export default function Dash() {

    const {
        token,
        cash,
        gain,
        userStocks
    } = useAuth();


    function yesterday() {
        let date1 = new Date();
        let month = "" + (date1.getMonth() + 1);
        let day = "" + (date1.getDate() - 1);
        let year = date1.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        console.log([year, month, day].join('-'));
        return [year, month, day].join('-');
    }


    function stockAPI(url) {
        axios({
            method: 'get',
            url: 'https://api.polygon.io/' + url,
        })
            .then(function (response) {
                console.log(response.data)
                console.log('POLYGON API CONNECTED')
                setStocks(prevStocks => {
                    let stocksCopy = { ...prevStocks }
                    stocksCopy[response.data.symbol] = {
                        ...stocksCopy[response.data.symbol],
                        apiResult: response.data
                    }
                    return stocksCopy

                })
                // return response.data
            })
            .catch(console.log('error'))
    }

    const [stocks, setStocks] = useState({ 'AAPL': {}, 'MSFT': {}, 'TSLA': {}, 'GME': {}, 'YETI': {}, 'CVS': {}, 'BRK.A': {} });

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
        const stockWS = getStocksWebsocket(API_KEY)
        let date = yesterday();
        Object.keys(stocks).map(item => {
            stockAPI('v1/open-close/' + item + '/' + date + '?unadjusted=true&apiKey=' + API_KEY);
            // console.log(userStocks)
        })
    }, [])

    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    if (token) {
        return (
            <div className="container">
                <div className='row d-flex g-5 mx-5 mt-1 rounded'>
                    <h3>Welcome User</h3>
                    <h5>Available Funds {formatter.format(cash)}</h5>
                    <h5>Account Value - $500,000</h5>
                    <h5>Realized Gain/Loss <span className={gain < 0 && 'text-red'}>{formatter.format(gain)}</span></h5>
                    <h5>{ userStocks[0].shares }</h5>
                </div>
                <div className='row d-flex g-1 mx-1 mt-1 rounded'>
                    <div className='col-12 justify-content-evenly text-start table-responsive'>
                        <table className="table table-success table-striped table-hover table-bordered border table-sm">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-3">Ticker Name</th>
                                    <th scope="col" className="px-3">Price</th>
                                    <th scope="col" className="px-4 d-none d-lg-table-cell">Ask</th>
                                    <th scope="col" className="px-4 d-none d-lg-table-cell">Bid</th>
                                    <th scope="col" className="px-2 d-none d-lg-table-cell">Current Volume</th>
                                    <th scope="col" className="px-4 d-none d-lg-table-cell">Prev Close</th>
                                    <th scope="col" className="px-3 d-none d-lg-table-cell">Day Change</th>
                                    <th scope="col" className="px-2">Shares</th>
                                    <th scope="col" className="px-3">Value</th>
                                    <th scope="col" className="px-3 d-none d-lg-table-cell">Gain/Loss</th>
                                    <th scope="col" className="px-3">Trade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(stocks).sort().map((item, index) => {
                                    {if (stocks[item].apiResult) {
                                        var change = ((parseFloat(stocks[item].apiResult.close) - parseFloat(stocks[item].p)) * 100 / parseFloat(stocks[item].p)).toFixed(2)
                                    }}
                                    return (
                                        <tr key={index}>
                                            <th scope="row"><a href={`https://finance.yahoo.com/quote/${stocks[item].sym}`} target="_blank">
                                                {stocks[item].sym ? stocks[item].sym : <div className="spinner-border spinner-border-sm text-success" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>}
                                            </a>
                                            </th>
                                            <td className={stocks[item].apiResult && stocks[item].p >= stocks[item].apiResult.close ? 'text-danger' : 'text-success'} style={{ width: 12 + 'rem' }}>
                                                {stocks[item].p ? formatter.format(stocks[item].p) : <div className="spinner-border spinner-border-sm text-success" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>}
                                            </td>
                                            <td  className='d-none d-lg-table-cell' style={{ width: 12 + 'rem' }}>
                                                {stocks[item].bp ? formatter.format(stocks[item].bp) : <div className="spinner-border spinner-border-sm text-success" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>}
                                            </td>
                                            <td className='d-none d-lg-table-cell' style={{ width: 12 + 'rem' }}>
                                                {stocks[item].ap ? formatter.format(stocks[item].ap) : <div className="spinner-border spinner-border-sm text-success" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>}
                                            </td>
                                            <td className='d-none d-lg-table-cell' style={{ width: 12 + 'rem' }}>
                                                {stocks[item].v ? stocks[item].v : <div className="spinner-border spinner-border-sm text-success" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>}
                                            </td>
                                            <td  className='d-none d-lg-table-cell' style={{ width: 12 + 'rem' }}>
                                                {stocks[item].apiResult ? formatter.format(stocks[item].apiResult.close) : <div className="spinner-border spinner-border-sm text-success" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>}
                                            </td>
                                            <td className='d-none d-lg-table-cell'>
                                                {stocks[item].apiResult && <span className={ change < 0 ? 'text-danger' : 'text-success'}>{change}%</span>}
                                            </td>
                                            <td>
                                            Shares
                                            {/* {Object.values(userStocks).filter(el => { el == stocks[item].sym }).reduce((x, y) => x + y.shares, 0)}
                                            
                                            
                                            {userStocks.forEach(function matchShares(el) {
                                                let count = 0;
                                                if (el.ticker_sym === stocks[item].sym) {
                                                    console.log('true');
                                                    count += el.shares;
                                                }
                                            })} */}
                                            
                                                {/* {stocks[item].apiResult ? formatter.format(stocks[item].apiResult.close) : <div className="spinner-border spinner-border-sm text-success" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>} */}
                                            </td>
                                            <td className='d-none d-lg-table-cell'>
                                            
                                            </td>
                                            <td>
                                                Value
                                            </td>

                                            <td className="text-center">
                                                <TradeButton
                                                    id={index}
                                                    stock={stocks[item].sym}
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
