import React, { useState, useEffect } from 'react';
// import Websocket from 'react-websocket';
// import { w3cwebsocket as Websocket } from "websocket";
// const WebSocket = require('ws')
// import { websocketClient } from "@polygon.io/client-js";

// const client = new W3CWebSocket('wss://socket.polygon.io/stocks')




export default function Dash() {

    const [stocks, setStocks] = useState({'AAPL':{}, 'MSFT':{}, 'TSLA':{}});
    
    const getWsClient = (url, apiKey) => {
        if (!apiKey) {
            throw new Error("api key not provided.");
        }

        const ws = new WebSocket(url)

        ws.onopen = (props) => {
            ws.send(`{"action":"auth","params":"${apiKey}"}`)
            // ws.send(`{"action":"subscribe","params":"Q.${props}"}`)
            const stockParams = Object.keys(stocks).reduce((str, current) => {
                return str + `Q.${current},`
            }, '')
            // console.log(stockParams);
            ws.send(`{"action":"subscribe","params":"${stockParams.slice(0, -1)}"}`)
            // ws.send(`{"action":"subscribe","params":"Q.*"}`)
        }

        ws.onmessage = (data) => {
            data = JSON.parse(data.data);
            setStocks(prevStocks => {
            let stocksCopy = {...prevStocks}
            data.map((msg) => {
                if (msg.ev === 'status' ) {
                    return console.log('status update - ', msg.message)
                }
                if (msg && Object.keys(msg).length > 0) {
                    stocksCopy[msg.sym] = msg
                }
                // stocksCopy[msg.sym] = {...stocksCopy[msg.sym], ...msg}
                
            })
            return stocksCopy;

            });

        }

        // ws.onerror(console.log)

        return ws;
    }
    
    const getStocksWebsocket = (apiKey, apiBase = 'wss://socket.polygon.io') => {
        return getWsClient(`${apiBase}/stocks`, apiKey);
    }


    // const stocksWS = websocketClient("2KDpwD8dpm0Mv_Q7zdjh5FvLjjb0xObo").getStocksWebsocket();
    
    useEffect(() => {
        const stockWS = getStocksWebsocket('2KDpwD8dpm0Mv_Q7zdjh5FvLjjb0xObo')
    //     stocksWS.onmessage = raw => {
    //         const message = JSON.parse(raw);
    //         switch (message.ev) {
    //             case "T":
    //                 // {"action":"subscribe", "params":"Q.MSFT"}
    //                 console.log(message.ev)
    //                 break;
    //         }
    //     };
        // client.onopen = () => {
        //     console.log('websocket client connected')

        // }
        // client.onmessage = (message) => {
        //     console.log(message)
        //     let webSocketResult = message
        //     const dataFromServer = JSON.parse(message.data);
        //     setResult(prev => webSocketResult)
        //     console.log(dataFromServer);
        //     const authData = {"action":"auth","params":"2KDpwD8dpm0Mv_Q7zdjh5FvLjjb0xObo"}
        //     client.send(JSON.stringify(authData))
        //     const testQuote = [
        //         {"action":"subscribe", "params":"Q.MSFT"},
        //         {"action":"subscribe", "params":"Q.AAPL"},
        //         {"action":"subscribe", "params":"Q.GME"},
        //         {"action":"subscribe", "params":"Q.TSLA"},
        //         {"action":"subscribe", "params":"Q.VTI"},
        //     ]
        //     // client.send(JSON.stringify(testQuote))
        // }

    }, [])

    // stocksWS.send({ action: "subscribe", params: "T.MSFT" });
    console.log(stocks)



    return (
        <div>
            {/* AAPL ${result.sym === 'AAPL' && `${result.bp}`} */}
            {Object.keys(stocks).sort().map((item, index) => {
                return (
                    <div>
                    {stocks[item].sym} - ${stocks[item].bp}
                    </div>
                    

                )


            })}
            


            {/* {result.sym} &nbsp; ${result.bp} */}
            {/* <Websocket
                url='wss://socket.polygon.io/stocks'
                onMessage={handleData} /> */}
        </div>
    )
}
