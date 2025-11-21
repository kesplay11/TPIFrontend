    // src/features/pages/Juegos/views/AgregarJuegoView.jsx
    import { useState, useEffect } from "react";
    import categoriasService from "../../../../services/categorias/CategoriasService";
    import turnosService from "../../../../services/Turnos/TurnosService";
    import estadosJuegosServices from "../../../../services/EstadosJuegosServices";
    import equiposService from "../../../../services/equipos/EquiposService";
    import juegosService from "../../../../services/juegos/JuegosService";
    import JuegoForm from "../components/JuegoForm";
    import { auth } from "../../../../localStorage/localstorage";
    import { useLocation } from "wouter";
    import useForm from "../../../../hooks/useForm";

    export default function AgregarJuegoView() {
    const [, setLocation] = useLocation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [serverError, setServerError] = useState("");

    const [categorias, setCategorias] = useState([]);
    const [turnos, setTurnos] = useState([]);
    const [estados, setEstados] = useState([]);
    const [equipos, setEquipos] = useState([]);

    const [rounds, setRounds] = useState([]);

    const validate = (values) => {
        const errors = {};
        if (!values.categoria_id) errors.categoria_id = "La categoría es obligatoria.";
        if (!values.turno_id) errors.turno_id = "El turno es obligatorio.";
        if (!values.estado_juego_id) errors.estado_juego_id = "El estado del juego es obligatorio.";
        return errors;
    };

    const { values, errors, handleChange, resetForm, validateForm } = useForm(
        {
        categoria_id: "",
        turno_id: "",
        estado_juego_id: "",
        visible: false,
        },
        validate
    );

    useEffect(() => {
        const fetchOptions = async () => {
        try {
            const [cats, trns, ests, eqs] = await Promise.all([
            categoriasService.obtenerCategorias(),
            turnosService.obtenerTurnos(),
            estadosJuegosServices.obtenerEstados(),
            equiposService.obtenerEquipos(),
            ]);

            setCategorias(Array.isArray(cats) ? cats : []);
            setTurnos(Array.isArray(trns) ? trns : []);
            setEstados(Array.isArray(ests) ? ests : []);
            setEquipos(Array.isArray(eqs) ? eqs : []);
        } catch (err) {
            console.error("Error al cargar opciones:", err);
        }
        };

        fetchOptions();
    }, []);

    const handleSubmit = async () => {
        if (!validateForm()) return;
        if (rounds.length === 0) {
        setServerError("Debes agregar al menos una ronda.");
        return;
        }

        setIsSubmitting(true);
        setServerError("");

        try {
        const persona_id = (auth.getUserID && auth.getUserID()) || (auth.getPersonaId && auth.getPersonaId()) || null;
        if (!persona_id) throw new Error("No se pudo obtener el id del usuario (persona_id).");

        // Normalizar rondas para enviar al backend
        const payloadRondas = rounds.map((r, idx) => ({
            estado_ronda_id: Number(r.estado_ronda_id) || 1,
            numero_ronda: Number(r.numero_ronda ?? idx + 1),
            equipos: Array.isArray(r.equipos) ? r.equipos.map(Number) : [],
        }));

        const payload = {
            persona_id,
            categoria_id: Number(values.categoria_id),
            turno_id: Number(values.turno_id),
            estado_juego_id: Number(values.estado_juego_id),
            visible: values.visible ? 1 : 0,
            rondas: payloadRondas,
        };

        await juegosService.crearJuego(payload);
        // redirigir a la lista de juegos
        setLocation("/dashboard/juegos");
        } catch (err) {
        console.error("Error al crear el juego:", err);
        setServerError(err.message || "Ocurrió un error al crear el juego.");
        } finally {
        setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        resetForm();
        setRounds([]);
        setLocation("/dashboard/juegos");
    };

    return (
        <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Agregar Juego</h1>

        <JuegoForm
            values={values}
            errors={errors}
            handleChange={handleChange}
            rounds={rounds}
            setRounds={setRounds}
            categorias={categorias}
            turnos={turnos}
            estados={estados}
            equipos={equipos}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitLabel={isSubmitting ? "Guardando..." : "Crear Juego"}
        />

        {serverError && <p className="text-red-500 mt-4">{serverError}</p>}
        </div>
    );
}
