import React from 'react'

export default function validate(formData, props) {
    let errors = {};
    // console.log(formData, props)
    if (!formData.name && props.register) {
        errors.name = 'Name is required!';
    } 
    if (!formData.email) {
        errors.email = 'Email address is required!';
    }
    else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Email address is invalid!';
    }
    if (!formData.password) {
        errors.password = 'Password is required!';
    } 
    else if (formData.password.length < 8) {
        // console.log(formData.password)
        errors.password = 'Password must be 8 or more characters!'
    }
    return errors;
};
