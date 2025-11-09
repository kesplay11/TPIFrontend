import { useState, useEffect } from "react";
import { CircularProgress, Typography, Button } from "@mui/material";
import { useLocation } from "wouter";
// Importamos el componente presentacional
import FormularioPersona from "../components/FormularioPersona"; // Ruta corregida

// Se asumen rutas relativas para services y hooks
import personasService from "../../../../services/personas/PersonasServices"; // Ruta corregida
import rolesService from "../../../../services/roles/RolesService";
import equiposService from "../../../../services/equipos/EquiposService"; // Ruta corregida
// import useForm from "../hooks/useForm"; // Ruta corregida
import useForm from "../../../../hooks/useForm";

export default function CrearUsuario() {
    // Inicialización del formulario, estableciendo selectores en null para obligar a la selección
    const { values, handleChange, resetForm } = useForm({
        documento: "",
        nombre: "",
        correo: "",
        anio_escolar: "", 
        rol_id: "",
        equipo_id: "",
    });

    const [, setLocation] = useLocation();

    // Estados de control y datos
    const [loading, setLoading] = useState(false); // Loading para la acción (crear)
    const [dataLoading, setDataLoading] = useState(true); // Loading para dependencias (roles/equipos)
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [roles, setRoles] = useState([]);
    const [equipos, setEquipos] = useState([]);

    // 1. Carga inicial de datos (Roles y Equipos)
    useEffect(() => {
        const fetchDependencies = async () => {
            setDataLoading(true);
            setError("");
            try {
                // Obtener equipos (borrado = 0 para activos)
                const fetchedEquipos = await equiposService.obtenerEquipos(0);
                setEquipos(fetchedEquipos);

                // Obtener roles
                const fetchedRoles = await rolesService.obtenerRoles();
                setRoles(fetchedRoles);
            } catch (err) {
                console.error("Error de carga de dependencias:", err);
                setError("Error al cargar roles y equipos. Revise la conexión.");
            } finally {
                setDataLoading(false);
            }
        };

        fetchDependencies();
    }, []);

    // 2. Manejo del envío del formulario (Creación)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");
        setLoading(true);

        const dataToSend = {
            documento: values.documento,
            rol_id: values.rol_id,
            equipo_id: values.equipo_id,
            correo: values.correo,
            anio_escolar: values.anio_escolar,
            nombre: values.nombre
        };

        try {
            await personasService.crearPersonaConMail(dataToSend);
            
            setSuccessMessage("¡Usuario creado y correo de bienvenida enviado con éxito!");
            resetForm(); // Limpiar el formulario
            
        } catch (err) {
            console.error("Error de creación:", err);
            // El servicio debe devolver un error comprensible
            setError(err.message || "Error al crear la persona. Verifique los datos.");
        } finally {
            setLoading(false);
        }
    };

    // Manejo de estados de carga y error inicial
    if (dataLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen w-full">
                <CircularProgress color="primary" size={60} />
                <Typography variant="h6" className="ml-4 text-black dark:text-white">
                    Cargando datos de roles y equipos...
                </Typography>
            </div>
        );
    }
    
    // Si hay un error fatal de carga de datos, mostrarlo
    if (error && !loading && roles.length === 0 && equipos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen w-full p-4">
                <Typography color="error" variant="h6" className="text-center">
                    {error}
                </Typography>
                <Button onClick={() => window.location.reload()} variant="contained" className="mt-4">
                    Reintentar Carga
                </Button>
            </div>
        );
    }

    // Renderizado del componente presentacional
    return (
        <FormularioPersona
            title="Crear Nuevo Usuario"
            submitButtonText="Registrar Persona"
            values={values}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={loading}
            error={error}
            successMessage={successMessage}
            roles={roles}
            equipos={equipos}
        />
    );
}