import React from 'react'
import Dolla from '../dolla.png'
import Hundos from '../hundos.png'
import Chart from '../chart.png'


export default function About() {
    return (
        <div className='About px-3'>
            <div className="row bg-success d-flex justify-content-around text-center text-white gx-5">
                <div className='col-12 col-lg-6 py-5'>
                    <img className='image-fluid' src={Dolla} />
                </div>
                <div className="col-12 col-lg-5 py-5">
                    <h1>
                        Welcome to Yolo Funds!!!
                    </h1>
                    <p>
                        You just landed your dream job, as a hedge fund manager at Silverman-Bahgs.  You're in charge of the new Yolo Fund.  The Yolo Fund is only concerned about making huge gains, and has a very high risk profile, and needs to preform well if you want to keep your job.  So <strong>Bet Big</strong> and win, because if not... you might not last on Wall Street.
                    </p>
                </div>
            </div>
            <div className="row bg-warning d-flex justify-content-around text-center text-dark flex-md-row-reverse gx-5">
                <div className='col-12 col-lg-6 py-5'>
                    <img className='image-fluid rounded-circle' src={Hundos} />
                </div>
                <div className="col-12 col-lg-5 py-5">
                    <h2>
                        How to Play the Game
                        <br />
                    </h2>
                    <h5 className="mt-5">
                        Now you are on Wall Street, and you can quickly see that Cash Rules Everything Around You.
                    </h5>
                    <p className='mt-2 pt-2'>
                        Use real time stock prices and news to make trades.  How well can you play the market? No fees for trading, and unlimited trades each day.
                    </p>
                    <h6 className='mt-2 pt-2'>
                        How well can you pick the stocks that will score the biggest returns?  Starting with <em> 500 million dollars </em> how much can you earn?
                    </h6>
                </div>
            </div>
            <div className="row d-flex justify-content-around text-center text-dark">
                <div className="col-12 col-lg-5 py-5">
                <figure>
                    <blockquote className="blockquote bg-light p-3">
                        <p>
                        The point is, ladies and gentlemen, that greed, for lack of a better word, is good. Greed is right. Greed works. Greed clarifies, cuts through, and captures the essence of the evolutionary spirit. Greed, in all of its forms, greed for life, for money, for love, knowledge, has marked the upward surge in mankind and greed, you mark my words, will not only save Teldar paper, but that other malfunctioning corporation called the USA. Thank you very much.
                        </p>
                    </blockquote>
                    <figcaption className="blockquote-footer">
                        Gordon Gecko, 
                            <cite title="Source Title">
                                Wall Street
                            </cite>
                    </figcaption>
                </figure>

                </div>
            </div>   
        </div>
    )
}
