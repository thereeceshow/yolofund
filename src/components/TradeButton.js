import React from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';
import BuyModal from './BuyModal'
import SellModal from './SellModal'



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
                    <button type="button" className="btn btn-sm rounded-pill btn-primary m-4" data-bs-toggle="modal" data-bs-target={`#BuyModal-${props.stock}`}>
                        Buy {props.stock}

                    </button>
                    <button type="button" className="btn btn-sm rounded-pill btn-primary m-4" data-bs-toggle="modal" data-bs-target={`#SellModal-${props.stock}`}>
                        Sell {props.stock}

                    </button>
                </div>
            )}

            <BuyModal
                buy
                stock={props.stock}
                price={props.price}
                cash={props.cash}
            />

            <SellModal
                sell
                stock={props.stock}
                price={props.price}
                cash={props.cash}
                shares={props.shares}

            />
        </>


    )
}
