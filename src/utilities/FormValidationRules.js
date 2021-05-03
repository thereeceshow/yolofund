import React from 'react'

export default function validate(formData) {
    let errors = {};
    if (!formData.name) {
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
    } else if (formData.password.length < 8) {
        errors.password = 'Password must be 8 or more characters!'
    }
    return errors;
};
