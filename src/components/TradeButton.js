import React from 'react';
import { useAuth } from '../utilities/AuthContext'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { usePopperTooltip } from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';

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
        closeOnTriggerHidden: true,
        trigger: 'click'
    },
        // popperOptions
    );
    // console.log(visible)

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
                    <button type="button" className="btn btn-sm rounded-pill btn-primary m-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        Buy {props.stock}
                    </button>
                    <button type="button" className="btn btn-sm rounded-pill btn-primary m-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        Sell {props.stock}
                    </button>
                </div>
            )}

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {props.stock}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Understood</button>
                        </div>
                    </div>
                </div>
            </div>



        </>


    )
}
