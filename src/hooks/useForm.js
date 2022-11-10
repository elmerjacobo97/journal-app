import {useEffect, useMemo, useState} from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {
    const [ formState, setFormState ] = useState( initialForm );
    const [ formValidation, setFormValidation ] = useState({});

    useEffect(() => {
        createValidators();
    }, [formState]);

    // Si el formulario inicial cambia
    useEffect(() => {
        setFormState(initialForm)
    }, [initialForm]);


    const isFormValid = useMemo(() => {
        for (const forValue of Object.keys(formValidation)) {
            if (formValidation[forValue] !== null) return false;

            return true;
        }
    }, [formValidation])

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => {
        const formCheckedValues = {};
        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage] = formValidations[formField];
            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
        }
        setFormValidation(formCheckedValues);
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid
    }
}