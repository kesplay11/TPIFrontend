import { useLocation } from "wouter";
import { useState } from "react";
import useForm from "../../../../hooks/useForm";
import equiposService from "../../../../services/equipos/EquiposService";
import EquipoForm from "../components/EquipoForm";

export default function AgregarEquipoView() {
    const [, setLocation] = useLocation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [serverError, setServerError] = useState("");

    // 🧠 Validación local
    const validate = (values) => {
        const errors = {};
        if (!values.nombre.trim()) {
        errors.nombre = "El nombre es obligatorio.";
        } 
        return errors;
    };

    const {
        values,
        errors,
        handleChange,
        resetForm,
        validateForm,
    } = useForm({ nombre: "" }, validate);

    // 🧩 Enviar formulario
    const handleSubmit = async () => {
        if (!validateForm()) return;
        setIsSubmitting(true);
        setServerError("");

        try {
        await equiposService.crearEquipo(values.nombre.trim());
        resetForm();
        // 🔁 Volver a la lista de categorías
        setLocation("/dashboard/mas/categorias");
        } catch (error) {
        console.error("Error al crear categoría:", error);
        setServerError("Ocurrió un error al crear la categoría.");
        } finally {
        setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        setLocation("/dashboard/mas/categorias");
    };

    return (
        <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Agregar Nuevo Equipo
        </h1>

        <CategoriaForm
            values={values}
            errors={errors}
            handleChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitLabel={isSubmitting ? "Guardando..." : "Aceptar"}
        />

        {serverError && (
            <p className="text-red-500 mt-4 text-center">{serverError}</p>
        )}
        </div>
    );
}
