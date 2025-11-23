// src/features/Dashboard/pages/Turnos/EditarTurnoView.jsx
import { useEffect } from "react";
import { Box } from "@mui/material";
import { useRoute } from "wouter";
import turnoService from "../../../services/Turnos/TurnosService";
import useForm from "../../../hooks/useForm";
import LayoutSubView from "../../common/LayoutSubView";
import TurnoForm from "../components/TurnoForm";

export default function EditarTurnoView() {
    const [match, params] = useRoute(
        "/dashboard/mas/turnos/editar-turno/:turno_id"
    );

    const turnoId = params?.turno_id;
    const handleCancel = () => {
        window.history.back();
    };

    const {
        values,
        errors,
        handleChange,
        setValues,
        validateForm,
    } = useForm(
        {
        nombre: "",
        hora_inicio: "",
        hora_fin: "",
        },
        (values) => {
        const errors = {};

        if (!values.nombre.trim()) {
            errors.nombre = "El nombre es obligatorio.";
        }
        if (!values.hora_inicio) {
            errors.hora_inicio = "La hora de inicio es obligatoria.";
        }
        if (!values.hora_fin) {
            errors.hora_fin = "La hora de cierre es obligatoria.";
        }

        return errors;
        }
    );

    // 🔄 Cargar los datos del turno al entrar
    useEffect(() => {
        const fetchTurno = async () => {
        try {
            const turno = await turnoService.obtenerTurnoPorId(turnoId);
            if (turno) {
            setValues({
                nombre: turno.nombre ?? "",
                hora_inicio: turno.hora_inicio ?? "",
                hora_fin: turno.hora_fin ?? "",
            });
            }
        } catch (error) {
            console.error("Error al cargar el turno:", error);
        }
        };

        if (turnoId) fetchTurno();
    }, [turnoId, setValues]);

    // 📝 Guardar cambios
    const handleSubmit = async () => {
        if (!validateForm()) return;

        try {
        await turnoService.actualizarTurno(
            turnoId,{
            nombre: values.nombre.trim(),
            hora_inicio: values.hora_inicio,
            hora_fin: values.hora_fin
            }
        );

        alert("Turno actualizado correctamente");
        } catch (error) {
        console.error("Error al actualizar turno:", error);
        alert("Error al actualizar el turno");
        }
    };

    return (
    <LayoutSubView title={"Editar Turno"}>

        <TurnoForm
            values={values}
            errors={errors}
            handleChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
        />
    </LayoutSubView>
    );
}
