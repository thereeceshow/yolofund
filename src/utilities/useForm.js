import { useState, useEffect } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect'

const useForm = (callback, validate) => {

    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {

            callback();
        }
    }, [errors]);

    const handleSubmit = (e) => {
        console.log('in handleSubmit')
        console.log(errors);
        console.log(formData)
        if (e) e.preventDefault();
        setErrors(validate(formData, isSubmitting));
        setIsSubmitting(true);
    };

    const handleChange = (e) => {
        e.persist();
        setFormData(formData => ({...formData, [e.target.name]: e.target.value}));
    };
    useDeepCompareEffect(() => {
        setErrors(validate(formData, isSubmitting))
    }, [formData])

return {
    handleChange,
    handleSubmit,
    formData,
    errors,
}
}

export default useForm;