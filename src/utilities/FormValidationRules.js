import React from 'react'

export default function validate(formData, props, isSubmitting) {
    let errors = {};
    // console.log(formData, props)
    if (!formData.name && props.register && isSubmitting) {
        errors.name = 'Name is required!';
    } 
    if (!formData.email && isSubmitting && (props.register || props.signup)) {
        errors.email = 'Email address is required!';
    }
    else if (formData.email && !/\S+@\S+\.\S+/.test(formData.email) && (props.register || props.signup)) {
        errors.email = 'Email address is invalid!';
    }
    if (!formData.password && isSubmitting && (props.register || props.signup)) {
        errors.password = 'Password is required!';
    } 
    if (formData.password && formData.password.length < 8 && (props.register || props.signup)) {
        // console.log(formData.password)
        errors.password = 'Password must be 8 or more characters!'
    }
    if (formData.buy > (Math.floor(props.cash / props.price)) && props.buy) {
        // console.log(formData.password)
        errors.buy = 'Cost exceeds available funds'
    }
    if (formData.buy < 0 && props.buy) {
        // console.log(formData.password)
        errors.buy = 'You cannot buy negative shares'
    }
    if (formData.sell < 0 && props.sell) {
        // console.log(formData.password)
        errors.sell = 'You cannot sell negative shares'
    }
    if (formData.sell > props.shares && props.sell) {
        // console.log(formData.password)
        errors.sell = 'You do have that many shares'
    }
    
    return errors;
};
