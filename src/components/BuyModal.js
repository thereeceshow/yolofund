import React from 'react'
import { useAuth } from '../utilities/AuthContext'
import { axiosHelper } from '../utilities/axiosHelper'
import useForm from '../utilities/useForm'
import validate from '../utilities/FormValidationRules'
import history from '../utilities/history';


// import formatter from '../utilities/formatter'

export default function BuyModal(props) {

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
                shares: parseInt(tradeData.buy),
                transaction_price: parseInt(props.price),
                ticker_sym: props.stock,
                buy: 1
            },
            successMethod: updateReload,
            // failureMethod: 'test',
            token
        })
    }

    const APIpost = e => {
        console.log('in Post')
        trade(formData)

    }
    const {
        formData,
        errors,
        handleChange,
        handleSubmit
    } = useForm(APIpost,
        (fData, isSubmitting) => validate(fData, props, isSubmitting));




    // console.log(props.cash, formData.buy, props.price)
    return (
        
            
            <div className="modal fade" id={`BuyModal-${props.stock}`} tabIndex="-1"  aria-labelledby={`BuyModalLabel-${props.stock}`} aria-hidden="true">
                <form onSubmit={handleSubmit}>
                    <div className="modal-dialog modal-fullscreen-md-down">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id={`BuyModalLabel-${props.stock}`}>MRKT ORDER - BUY {props.stock}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="p-3">
                                    Buy <input
                                        className={`form-control ${formData.buy && 'is-valid'} ${!!errors.buy && 'is-invalid'}`}
                                        type="number"
                                        id='buy'
                                        name='buy'
                                        min="1"
                                        max={Math.floor(props.cash / props.price)}
                                        onChange={handleChange}
                                        value={formData.buy || ''} />
                                     of {props.stock} at {formatter.format(props.price)}
                                    <div className="invalid-feedback">{errors.buy}</div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Submit Trade</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
    
    )
}
