import React, { useState, useEffect } from 'react';
import axios from 'axios'
import TradeButton from './TradeButton'
import { API_KEY } from '../utilities/api'

export default function Dash() {



    function stockAPI(url) {
        axios({
            method: 'get',
            url: 'https://api.polygon.io/' + url,
        })
            .then(function (response) {
                console.log(response.data)
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

    const [stocks, setStocks] = useState({ 'AAPL': {}, 'MSFT': {}, 'TSLA': {}, 'GME': {}, 'YETI': {}, 'CVS': {}, });

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
        Object.keys(stocks).map(item => {
            stockAPI('v1/open-close/' + item + '/2020-10-14?unadjusted=true&apiKey=' + API_KEY)
        })
    }, [])

    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    return (
        <div className='row d-flex g-5 mx-5 mt-1 rounded'>
            <div className='col-8 justify-content-evenly'>
                <table className="table table-success table-striped table-hover table-bordered border rounded table-sm">
                    <thead>
                        <tr>
                            <th scope="col">Ticker Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Bid</th>
                            <th scope="col">Ask</th>
                            <th scope="col">Current Volume</th>
                            <th scope="col">Prev Close</th>
                            <th scope="col">Shares</th>
                            <th scope="col">Value</th>
                            <th scope="col">Gain/Loss</th>
                            <th scope="col">Trade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(stocks).sort().map((item, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row"><a href={`https://finance.yahoo.com/quote/${stocks[item].sym}`} target="_blank">
                                        {stocks[item].sym ? stocks[item].sym : <div className="spinner-border spinner-border-sm text-success" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>}
                                    </a>
                                    </th>
                                    <td className={stocks[item].p >= stocks[item].op ? 'text-danger' : 'text-success'} style={{ width: 5 + 'rem' }}>
                                        {stocks[item].p ? formatter.format(stocks[item].p) : <div className="spinner-border spinner-border-sm text-success" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>}
                                    </td>
                                    <td style={{ width: 5 + 'rem' }}>
                                        {stocks[item].bp ? formatter.format(stocks[item].bp) : <div className="spinner-border spinner-border-sm text-success" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>}
                                    </td>
                                    <td style={{ width: 5 + 'rem' }}>
                                        {stocks[item].ap ? formatter.format(stocks[item].ap) : <div className="spinner-border spinner-border-sm text-success" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>}
                                    </td>
                                    <td style={{ width: 5 + 'rem' }}>
                                        {stocks[item].v ? stocks[item].v : <div className="spinner-border spinner-border-sm text-success" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>}
                                    </td>
                                    <td style={{ width: 5 + 'rem' }}>
                                        {stocks[item].apiResult ? formatter.format(stocks[item].apiResult.close) : <div className="spinner-border spinner-border-sm text-success" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>}
                                    </td>
                                    <td>
                                        {/* {stocks[item].apiResult ? formatter.format(stocks[item].apiResult.close) : <div className="spinner-border spinner-border-sm text-success" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>} */}
                                    </td>
                                    <td>
                                        {/* {stocks[item].apiResult ? formatter.format(stocks[item].apiResult.close) : <div className="spinner-border spinner-border-sm text-success" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>} */}
                                    </td>
                                    <td>
                                        {/* {stocks[item].apiResult ? formatter.format(stocks[item].apiResult.close) : <div className="spinner-border spinner-border-sm text-success" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>} */}
                                    </td>

                                    <td>
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
    )
}
