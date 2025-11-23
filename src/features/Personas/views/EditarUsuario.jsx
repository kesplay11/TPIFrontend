import { useState, useEffect } from "react";
import { CircularProgress, Typography, Button } from "@mui/material";
import { useRoute, useLocation } from "wouter"; 
import FormularioPersona from "../components/FormularioPersona";
import personasService from "../../../services/personas/PersonasServices";
import rolesService from "../../../services/roles/RolesService";
import equiposService from "../../../services/equipos/EquiposService";
import useForm from "../../../hooks/useForm";
import LayoutSubView from "../../common/LayoutSubView";

const INITIAL_VALUES = {
    documento: "",
    nombre: "",
    correo: "",
    anio_escolar: "",
    rol_id: "", 
    equipo_id: "",
};

export default function EditarUsuario() {
    const [location] = useLocation();
    console.log("📍 Ruta actual:", location);
    
    const [match, params] = useRoute("/dashboard/mas/personas/editar-usuario/:persona_id");
    const personaId = params ? params.persona_id : null;
    console.log("🆔 Persona ID:", personaId);

    const { values, handleChange, setValues } = useForm(INITIAL_VALUES);

    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [roles, setRoles] = useState([]);
    const [equipos, setEquipos] = useState([]);

    // Función para encontrar ID por nombre
    const encontrarIdPorNombre = (lista, nombre, campoNombre = 'nombre') => {
        const item = lista.find(item => item[campoNombre] === nombre);
        return item ? String(item[Object.keys(item).find(key => key.includes('_id'))]) : '';
    };

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
                // Cargar dependencias y datos de persona en paralelo
                const [fetchedEquipos, fetchedRoles, personaData] = await Promise.all([
                    equiposService.obtenerEquipos(0),
                    rolesService.obtenerRoles(),
                    personasService.obtenerPersonaPorPersonaId(personaId)
                ]);

                console.log("📊 Datos completos de persona:", personaData);
                console.log("👥 Roles disponibles:", fetchedRoles);
                console.log("⚽ Equipos disponibles:", fetchedEquipos);

                setEquipos(fetchedEquipos);
                setRoles(fetchedRoles);

                // Buscar IDs basados en los nombres
                const rolId = encontrarIdPorNombre(fetchedRoles, personaData.nombre_rol, 'rol_nombre');
                const equipoId = encontrarIdPorNombre(fetchedEquipos, personaData.nombre_equipo);

                console.log("🔍 IDs encontrados:", {
                    rolNombre: personaData.nombre_rol,
                    rolId,
                    equipoNombre: personaData.nombre_equipo,
                    equipoId
                });

                // Mapeo CORREGIDO - usando los IDs encontrados
                const formValues = {
                    documento: personaData.documento?.toString() || '',
                    nombre: personaData.nombre || '',
                    correo: personaData.correo || '',
                    rol_id: rolId,
                    equipo_id: equipoId,
                    anio_escolar: personaData.anio_escolar || '',
                };

                console.log("🎯 Valores del formulario a establecer:", formValues);

                setValues(formValues);

            } catch (err) {
                console.error("❌ Error al cargar datos:", err);
                setError(err.message || "Error al cargar los datos de la persona o dependencias.");
            } finally {
                setDataLoading(false);
            }
        };

        fetchData();
    }, [personaId, setValues]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");
        setLoading(true);

        console.log("📤 Datos a enviar en la actualización:", values);

        const dataToSend = {
            documento: values.documento,
            rol_id: parseInt(values.rol_id) || null,
            equipo_id: parseInt(values.equipo_id) || null,
            correo: values.correo,
            anio_escolar: values.anio_escolar,
            nombre: values.nombre
        };

        try {
            await personasService.actualizarPersona(personaId, dataToSend); 
            setSuccessMessage("¡Persona actualizada con éxito!");
            
        } catch (err) {
            console.error("❌ Error de actualización:", err);
            setError(err.message || "Error al actualizar la persona. Verifique los datos.");
        } finally {
            setLoading(false);
        }
    };

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

    return (
        <LayoutSubView title={"Editar Persona"}>
            <FormularioPersona
                title={`Editar Persona: ${values.nombre || 'ID ' + personaId}`}
                submitButtonText="Guardar Cambios"
                values={values}
                handleChange={handleChange}
                handleSubmit={handleUpdate}
                loading={loading}
                error={error}
                successMessage={successMessage}
                roles={roles}
                equipos={equipos}
                isDocumentDisabled={false}
            />
        </LayoutSubView>
    );
}