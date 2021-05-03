import React from 'react'
import Stock from './Stock'

export default function Dash() {

    let stocks = ['AAPL', 'TSLA', 'VTI']

    // const listStocks = stocks.map((el) =>
    // <li>
    // <Stock 
    //     stk={AAPL}
    // />
    // </li>)
    // <li>
    // <Stock 
    //     stk={TSLA}
    // />
    // </li>
    // <li>
    // <Stock 
    //     stk={MSFT}
    // />
    // </li>



    return (
        <div>
            <ul>
                <li>
                    <Stock
                        stk={'AAPL'}
                    />
                </li>
                <li>
                    <Stock
                        stk={"TSLA"} />
                </li>
                <li>
                    <Stock
                        stk={'MSFT'} />
                </li>
            </ul>

        </div>
    )
}
