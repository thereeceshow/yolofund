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
        console.log('inthedeep')
    }, [formData])

return {
    handleChange,
    handleSubmit,
    formData,
    errors,
}
}

export default useForm;