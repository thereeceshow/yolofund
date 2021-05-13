import React, { useState, useEffect } from 'react';
// import axios from 'axios'
// import TradeButton from './TradeButton'
// import { API_KEY } from '../utilities/api'

export default function Stock() {



//     function stockAPI(url) {
//         axios({
//             method: 'get',
//             url: 'https://api.polygon.io/' + url,
//         })
//             .then(function (response) {
//                 console.log(response.data)
//                 setStocks(prevStocks => {
//                     let stocksCopy = { ...prevStocks }
//                     stocksCopy[response.data.symbol] = {
//                         ...stocksCopy[response.data.symbol],
//                         apiResult: response.data
//                     }
//                     return stocksCopy

//                 })
//                 // return response.data
//             })
//             .catch(console.log('error'))
//     }

//     const [stocks, setStocks] = useState({ 'AAPL': {}, 'MSFT': {}, 'TSLA': {}, 'GME': {}, 'YETI': {}, 'CVS': {},});

//     const getWsClient = (url, apiKey) => {
//         if (!apiKey) {
//             throw new Error("api key not provided.");
//         }

//         const ws = new WebSocket(url)

//         ws.onopen = (props) => {
//             ws.send(`{"action":"auth","params":"${apiKey}"}`)
//             // ws.send(`{"action":"subscribe","params":"Q.${props}"}`)
//             const stockParams = Object.keys(stocks).reduce((str, current) => {
//                 return str + `T.${current},Q.${current},A.${current},`
//             }, '')
//             // console.log(stockParams);
//             ws.send(`{"action":"subscribe","params":"${stockParams.slice(0, -1)}"}`)
//             // ws.send(`{"action":"subscribe","params":"Q.*"}`)
//         }

//         ws.onmessage = (data) => {
//             data = JSON.parse(data.data);
//             setStocks(prevStocks => {
//                 let stocksCopy = { ...prevStocks }
//                 data.map((msg) => {
//                     if (msg.ev === 'status') {
//                         return console.log('status update - ', msg.message)
//                     }
//                     if (msg && Object.keys(msg).length > 0) {
//                         stocksCopy[msg.sym] = { ...stocksCopy[msg.sym],  ...msg }
//                     }
//                     // stocksCopy[msg.sym] = {...stocksCopy[msg.sym], ...msg}

//                 })
//                 return stocksCopy;

//             });

//         }

//         return ws;
//     }

//     const getStocksWebsocket = (apiKey, apiBase = 'wss://socket.polygon.io') => {
//         return getWsClient(`${apiBase}/stocks`, apiKey);
//     }

//     useEffect(() => {
//         const stockWS = getStocksWebsocket(API_KEY)
//         Object.keys(stocks).map(item => {
//             stockAPI('v1/open-close/' + item + '/2020-10-14?unadjusted=true&apiKey=' + API_KEY)
//         })
//     }, [])

//     var formatter = new Intl.NumberFormat('en-US', {
//         style: 'currency',
//         currency: 'USD',
      
//         // These options are needed to round to whole numbers if that's what you want.
//         //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
//         //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
//       });

    return (
        
        <div className='row d-flex g-5 mx-5 mt-1 rounded'>
        Stock.js
        </div>
    )
}
