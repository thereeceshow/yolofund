// import React, { createContext, useState, useEffect, useContext } from 'react';
// import { axiosHelper } from './axiosHelper'
// import history from './history';
// import { CLIENT_SEC } from '../utilities/api'

// const TradeContext = createContext({});

// export const TradeHelper = (props) => {

//     function trade(tradeData) {
//         console.log('in the trade')
//         axiosHelper({
//             url: '/api/auth/trade',
//             method: 'post',
//             data: {
//                 shares: tradeData.shares,
//                 price: props.price,
//                 ticker_sym: props.stock,
//                 buy: tradeData.buy
//             },
//             successMethod: getUser(),
//             // failureMethod: 'test',
//             token
//         })
//     }

//     return { trade }
// }

// export const TradeProvider = (props) => {

//     const initialContext = TradeHelper(props)

//     return (
//         <TradeContext.Provider value={initialContext}>
//             {props.children}
//         </TradeContext.Provider>
//     )
// }

// export const useTrade = () useContext(TradeContext)

// export default TradeContext