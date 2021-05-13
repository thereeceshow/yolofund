import React from 'react'
import Clip from '../stockClip.png'
import { useAuth } from '../utilities/AuthContext'
import { Link, useHistory } from 'react-router-dom'

export default function Home() {

    const {
        token
    } = useAuth();

    let history = useHistory();

    return (
        <div className='Home container-fluid'>
            <div className="row d-flex mt-5">
                <div className="col-12 col-lg-4 px-4">
                    <h6 className="mt-5">
                        Yolo Funds
                    </h6>
                    <p>
                        You Only Live Once, so you need to turn your money into more money.  Learn the keys to investing by playing this game.  See your return in real time.  Can you beat the market?  Aim for 8% return.  If you can earn 8% a year, you are on fire, and will be ready for Wall Street soon.
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
            {!token && <div className="row d-flex text-center">
                <div className="col-12 col-md-6">
                    <Link to="/register" className="mx-2 btn btn-large btn-outline-success m-5 p-5">Signup for a Free Account</Link>
                </div>
                <div className="col-12 col-md-6">
                    <Link to="/login" className=" btn btn-large btn-outline-success m-5 p-5"> Login to an Existing Account </Link>
                </div>

            </div>}
            <div className="row d-flex mt-5">
                <div className="col-12 col-lg-4 p-4"></div><div className="col-12 col-lg-4 p-4"></div><div className="col-12 col-lg-4 p-4"></div>

            </div>
        </div>
    )
}
