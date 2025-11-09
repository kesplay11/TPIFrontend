import { useState, useEffect } from "react";
import { CircularProgress, Typography, Button } from "@mui/material";
import { useRoute } from "wouter"; 
// Importamos el componente presentacional
import FormularioPersona from "../components/FormularioPersona"; // Ruta corregida

// Se asumen rutas relativas para services y hooks
import personasService from "../../../../services/personas/PersonasServices"; // Ruta corregida
import rolesService from "../../../../services/roles/RolesService";
import equiposService from "../../../../services/equipos/EquiposService"; // Ruta corregida
// import useForm from "../hooks/useForm"; // Ruta corregida
import useForm from "../../../../hooks/useForm";


// Valores iniciales (se sobrescribirán al cargar la persona)
const INITIAL_VALUES = {
    documento: "",
    nombre: "",
    correo: "",
    anio_escolar: "",
    rol_id: "", 
    equipo_id: "",
};


export default function EditarUsuario() {
    // 1. Obtener el ID de la persona desde la ruta (asumiendo /gestion-usuarios/editar/:id)
    const [match, params] = useRoute("/dashboard/personas/:persona_id");
    const personaId = params ? params.persona_id : null;


    // 2. Inicialización del formulario, usando setValues para cargar datos
    const { values, handleChange, setValues } = useForm(INITIAL_VALUES);

    // 3. Estados de control y datos
    const [loading, setLoading] = useState(false); // Loading para la acción (actualizar)
    const [dataLoading, setDataLoading] = useState(true); // Loading para dependencias Y carga de persona
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [roles, setRoles] = useState([]);
    const [equipos, setEquipos] = useState([]);


    // 4. Carga de datos: Dependencias (Roles/Equipos) y Datos de la Persona
    useEffect(() => {
        const fetchData = async () => {
            if (!personaId) {
                setError("ID de persona no encontrado en la URL.");
                setDataLoading(false);
                return;
            }

            setDataLoading(true);
            setError("");
            
            try {
                // Fetch de dependencias
                const fetchedEquipos = await equiposService.obtenerEquipos(0);
                setEquipos(fetchedEquipos);
                const fetchedRoles = await rolesService.obtenerRoles();
                setRoles(fetchedRoles);

                // Fetch de datos de la persona a editar
                const personaData = await personasService.obtenerPersonaPorPersonaId(personaId);
                
                // Mapear los datos de la API a los valores del formulario
                const formValues = {
                    documento: personaData.documento || '',
                    nombre: personaData.nombre || '',
                    correo: personaData.correo || '',
                    // Aseguramos que los IDs sean strings si es necesario
                    rol_id: personaData.rol_id ? String(personaData.rol_id) : '',
                    equipo_id: personaData.equipo_id ? String(personaData.equipo_id) : '',
                    anio_escolar: personaData.anio_escolar || '',
                };

                // Cargar los datos en el formulario
                setValues(formValues);

            } catch (err) {
                console.error("Error al cargar datos:", err);
                setError(err.message || "Error al cargar los datos de la persona o dependencias.");
            } finally {
                setDataLoading(false);
            }
        };

        fetchData();
    }, [personaId, setValues]);


    // 5. Manejo del envío del formulario (Actualización)
    const handleUpdate = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");
        setLoading(true);

        const dataToSend = {
            // Documento no se envía en update, asumimos que no cambia
            documento: values.documento,
            rol_id: values.rol_id,
            equipo_id: values.equipo_id,
            correo: values.correo,
            anio_escolar: values.anio_escolar,
            nombre: values.nombre
            // Nota: Se podría añadir el documento para validación si el back-end lo requiere
        };

        try {
            // Asumimos que existe un servicio para actualizar la persona por ID
            console.log(dataToSend);
            await personasService.actualizarPersona(personaId, dataToSend); 
            setSuccessMessage("¡Persona actualizada con éxito!");
            
        } catch (err) {
            console.error("Error de actualización:", err);
            setError(err.message || "Error al actualizar la persona. Verifique los datos.");
        } finally {
            setLoading(false);
        }
    };


    // Manejo de estados de carga y error
    if (dataLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen w-full">
                <CircularProgress color="primary" size={60} />
                <Typography variant="h6" className="ml-4 text-black dark:text-white">
                    Cargando datos de la persona y dependencias...
                </Typography>
            </div>
        );
    }
    
    // Si hay un error fatal de carga de datos, mostrarlo
    if (error && !loading) {
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
            title={`Editar Persona: ${values.nombre || 'ID ' + personaId}`}
            submitButtonText="Guardar Cambios"
            values={values}
            handleChange={handleChange}
            handleSubmit={handleUpdate} // Usamos la función de actualización
            loading={loading}
            error={error}
            successMessage={successMessage}
            roles={roles}
            equipos={equipos}
            isDocumentDisabled={false} // El documento no se puede cambiar al editar
        />
    );
}