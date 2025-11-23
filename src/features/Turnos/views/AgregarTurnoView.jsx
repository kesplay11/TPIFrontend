// src/features/Dashboard/pages/Turnos/AgregarTurnoView.jsx

import { useLocation } from "wouter";
import { useState } from "react";
import useForm from "../../../hooks/useForm";
import turnoService from "../../../services/Turnos/TurnosService";
import TurnoForm from "../components/TurnoForm";
import LayoutSubView from "../../common/LayoutSubView";

export default function AgregarTurnoView() {
    const [, setLocation] = useLocation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [serverError, setServerError] = useState("");

    // 🧠 Validación local
    const validate = (values) => {
        const errors = {};

        if (!values.nombre.trim()) {
        errors.nombre = "El nombre es obligatorio.";
        }

        if (!values.hora_inicio) {
        errors.hora_inicio = "La hora de inicio es obligatoria.";
        }

        if (!values.hora_fin) {
        errors.hora_fin = "La hora de fin es obligatoria.";
        }

        return errors;
    };

    // ✏️ Hook de formulario con valores iniciales
    const {
        values,
        errors,
        handleChange,
        resetForm,
        validateForm,
    } = useForm(
        { nombre: "", hora_inicio: "", hora_fin: "" },
        validate
    );

    // 🧩 Enviar formulario
    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);
        setServerError("");

        try {
        await turnoService.crearTurno(values);
        resetForm();

        // 🔁 Volver al listado de turnos
        setLocation("/dashboard/mas/turnos");
        } catch (error) {
        console.error("Error al crear turno:", error);
        setServerError("Ocurrió un error al crear el turno.");
        } finally {
        setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        setLocation("/dashboard/mas/turnos");
    };

    return (
        <LayoutSubView>
        <TurnoForm
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
    </LayoutSubView>
    );
}
