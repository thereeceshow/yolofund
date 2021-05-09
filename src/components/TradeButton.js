import React from 'react';
import { useAuth } from '../utilities/AuthContext'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { usePopperTooltip } from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';

import useForm from '../utilities/useForm'
import validate from '../utilities/FormValidationRules'

import Trade from './Trade';

export default function TradeButton(props
) {
    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
    } = usePopperTooltip({
        closeOnOutsideClick: true,
        closeOnTriggerHidden: false,
        interactive: true,
        placement: 'right',
        trigger: 'click'
    },
        // popperOptions
    );

    const {
        trade,
        token,
        userData
    } = useAuth();

    const APIpost = e => {
        

    }

    const {
        formData,
        errors,
        handleChange,
        handleSubmit
    } = useForm(APIpost,
        (fData, isSubmitting) => validate(fData, props, isSubmitting));




    return (
        <>
            <button type="button" className="btn btn-sm rounded-pill btn-success" ref={setTriggerRef}>
                Trade
                                    </button>
            {visible && (
                <div
                    ref={setTooltipRef}
                    {...getTooltipProps({ className: 'tooltip-container' })}
                >
                    <div {...getArrowProps({ className: 'tooltip-arrow' })} />
                    <button type="button" className="btn btn-sm rounded-pill btn-primary m-4" data-bs-toggle="modal" data-bs-target="#BuyModal">
                        Buy {props.stock}

                    </button>
                    <button type="button" className="btn btn-sm rounded-pill btn-primary m-4" data-bs-toggle="modal" data-bs-target="#SellModal">
                        Sell {props.stock}

                    </button>
                </div>
            )}


            {/* /// --------- BUY MODAL ------------------ */}
            <div className="modal fade" id="BuyModal" tabindex="-1" aria-labelledby="BuyModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen-md-down">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="BuyModalLabel">MRKT ORDER - BUY {props.stock}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSumbit={handleSubmit}>
                                Buy <input type="Shares" id='buy' name='buy' min="1" max={userData.cash / props.price} onChange={handleChange} value={formData.buy}></input> of {props.stock} at {props.price}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* /// --------- Sell MODAL ------------------ */}
            <div className="modal fade" id="SellModal" tabindex="-1" aria-labelledby="SellModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen-md-down">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="SellModalLabel">MRKT ORDER - SELL {props.stock}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSumbit={handleSubmit}>
                                Buy <input type="Shares" id='buy' name='buy' min="1" max={props.shares} onChange={handleChange} value={formData.sell}></input> of {props.stock} at {props.price}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>



        </>


    )
}
