import React from 'react'
import Clip from '../stockClip.png'

export default function Home() {
    return (
        <div className='Home full container-fluid'>
            <div className="row d-flex mt-5">
                <div className="col-12 col-lg-4 px-4">
                    <h6 className="mt-5">
                        Yolo Funds
                    </h6>
                    <p>
                        You Only Live Once, so you need to turn your money into more money.  Learn the keys to investing by playing this game.  See your return in real time.  Can you beat the market?  Aim for 8% return.  If you can learn 8% a year, you are on fire, and will be ready for Wall Street soon.
                    </p>
                    <p>
                        This game was created as a final project for Awesome Inc.  This is the first iteration.
                        </p>
                </div>
                <div className="col-12 col-lg-4">
                    <img className='img-fluid' src={Clip} />

                </div>
                <div className="col-12 col-lg-4 px-4">
                    <h6 className="mt-5">
                        Thanks
                    </h6>
                    <p>
                        A special thanks to Ian and the rest of the team at <a href="https://polygon.io/">Polygon.io</a> for providing access to this amazing API
                    </p>
                </div>
            </div>
            <div className="row d-flex mt-5">
            <div className="col-12 col-lg-4 p-4"></div><div className="col-12 col-lg-4 p-4"></div><div className="col-12 col-lg-4 p-4"></div>

            </div>
        </div>
    )
}
