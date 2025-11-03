import { useState } from "react";

export default function useForm(initialValues, validate = null) {
const [values, setValues] = useState(initialValues);
const [errors, setErrors] = useState({});

// Cambiar valores del formulario
const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // Validación en tiempo real si se pasa la función validate
    if (validate) {
    const validationErrors = validate({ ...values, [name]: value });
    setErrors(validationErrors);
    }
};

// Resetear el formulario
const resetForm = () => {
    setValues(initialValues);
    setErrors({});
};

// Validar todo el formulario
const validateForm = () => {
    if (!validate) return true;
    const validationErrors = validate(values);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
};

return {
    values,
    errors,
    handleChange,
    resetForm,
    validateForm,
    setValues, // útil para llenar el formulario con datos existentes
};
}
