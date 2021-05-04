import React from 'react'
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
                    <button type="button" className="btn btn-sm rounded-pill btn-primary m-3">
                        Buy {props.stock}
            </button>
                    <button type="button" className="btn btn-sm rounded-pill btn-primary m-3">
                        Sell {props.stock}
            </button>
                </div>
            )}



        </>
    )
}
