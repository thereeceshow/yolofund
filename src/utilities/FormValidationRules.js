import React from 'react'

export default function validate(formData, props, isSubmitting) {
    let errors = {};
    // console.log(formData, props)
    if (!formData.name && props.register && isSubmitting) {
        errors.name = 'Name is required!';
    } 
    if (!formData.email && isSubmitting) {
        errors.email = 'Email address is required!';
    }
    else if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Email address is invalid!';
    }
    if (!formData.password && isSubmitting) {
        errors.password = 'Password is required!';
    } 
    if (formData.password && formData.password.length < 8) {
        // console.log(formData.password)
        errors.password = 'Password must be 8 or more characters!'
    }
    // if (formData.buy > (props.cash * props.price) && props.trade) {
    //     // console.log(formData.password)
    //     errors.buy = 'You cannot buy that many shares'
    // }
    if (formData.buy < 0 && props.trade) {
        // console.log(formData.password)
        errors.buy = 'You cannot buy negative'
    }
    if (formData.sell < 0 && props.trade) {
        // console.log(formData.password)
        errors.sell = 'You cannot sell negative shares'
    }
    // else if (formData.sell > props.shares && props.trade) {
    //     // console.log(formData.password)
    //     errors.sell = 'You do not have shares to sell'
    // }
    return errors;
};
