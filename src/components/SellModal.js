import React from 'react'
import { useAuth } from '../utilities/AuthContext'
import { axiosHelper } from '../utilities/axiosHelper'

import useForm from '../utilities/useForm'
import validate from '../utilities/FormValidationRules'
import history from '../utilities/history';

export default function SellModal(props) {
    
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    const {
        token,
        getUser,
    } = useAuth();

    function updateReload() {
        history.go(0);
    }

    function trade(tradeData) {
        console.log('in the trade')
        axiosHelper({
            url: '/api/auth/trade',
            method: 'post',
            data: {
                shares: parseInt(tradeData.sell),
                transaction_price: parseInt(props.price),
                ticker_sym: props.stock,
                buy: 0
            },
            successMethod: updateReload,
            // failureMethod: 'test',
            token
        })
    }

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





    return (
        

            <div className="modal fade" id={`SellModal-${props.stock}`} tabIndex="-1" aria-labelledby={`SellModalLabel-${props.stock}`} aria-hidden="true">
                <form onSubmit={handleSubmit}>
                    <div className="modal-dialog modal-fullscreen-md-down">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id={`SellModalLabel-${props.stock}`}>MRKT ORDER - SELL {props.stock}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="p-3">Sell
                                <input className={`form-control ${formData.sell && 'is-valid'} ${!!errors.sell && 'is-invalid'}`}
                                        type="number" id='sell'
                                        name='sell'
                                        min="1"
                                        max={props.shares}
                                        onChange={handleChange}
                                        value={formData.sell || ''}
                                        required />
                                 of {props.stock} at {formatter.format(props.price)}
                                    <div className="invalid-feedback">{errors.sell}</div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        
    )
}
