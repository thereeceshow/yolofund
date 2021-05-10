import React from 'react';
import { useAuth } from '../utilities/AuthContext'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { usePopperTooltip } from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';

import useForm from '../utilities/useForm'
import validate from '../utilities/FormValidationRules'

import Trade from './Trade';

export default function TradeButton(props) {
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
        trade(formData)

    }
    
    const {
        formData,
        errors,
        handleChange,
        handleSubmit
    } = useForm(APIpost,
        (fData, isSubmitting) => validate(fData, props, isSubmitting));


    // console.log(formData)
        
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
            <div className="modal fade" id="BuyModal" tabIndex="-1" aria-labelledby="BuyModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen-md-down">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="BuyModalLabel">MRKT ORDER - BUY {props.stock}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                            <div className="p-3">Buy <input className={`form-control ${formData.buy && 'is-valid'} ${!!errors.buy && 'is-invalid'}`} type="number" id='buy' name='buy' min="1" max={formData.maxBuy} onChange={handleChange} value={formData.buy}></input> of {props.stock} at {props.price}
                            <div className="invalid-feedback">{errors.buy}</div>
                            </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary">Submit Trade</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* /// --------- Sell MODAL ------------------ */}
            <div className="modal fade" id="SellModal" tabIndex="-1" aria-labelledby="SellModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen-md-down">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="SellModalLabel">MRKT ORDER - SELL {props.stock}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSumbit={handleSubmit}>
                            <div className="p-3">Sell <input className={`form-control ${formData.sell && 'is-valid'} ${!!errors.sell && 'is-invalid'}`} type="number" id='buy' name='buy' min="1" max={props.shares} onChange={handleChange} value={formData.sell} required></input> of {props.stock} at {props.price}
                                <div className="invalid-feedback">{errors.buy}</div>
                            </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>
            </div>



        </>


    )
}
