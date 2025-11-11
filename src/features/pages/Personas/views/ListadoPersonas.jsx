import { useState, useEffect } from "react";
import { Typography, Card, Box, Divider, CircularProgress, Alert } from "@mui/material";
import { useLocation } from "wouter";
// Importar los iconos para que CardPersona pueda usarlos (aunque los importé en CardPersona, por consistencia)
import EditIcon from '@mui/icons-material/Edit'; 
import DeleteIcon from '@mui/icons-material/Delete'; 
import personasService from "../../../../services/personas/PersonasServices";
import CardPersona from "../components/CardPersona";
import ConfirmacionModal from "../components/ConfirmacionModal";


export default function ListadoPersonas() {
    const [personas, setPersonas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // Estado para el modal de confirmación
    const [modalState, setModalState] = useState({
        isOpen: false,
        personaId: null,
        personaNombre: '',
        isProcessing: false, // Para mostrar el spinner dentro del modal
    });

    const [, setLocation] = useLocation();

    // Función principal para obtener datos
    const fetchPersonas = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await personasService.obtenerPersonas();
            setPersonas(data);
        } catch (err) {
            setError("No se pudieron cargar el listado de personas.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Carga inicial de datos
    useEffect(() => {
        fetchPersonas();
    }, []);

    // ----------------------------------------------------
    // Lógica de Edición (Navegación)
    // ----------------------------------------------------
    const handleEdit = (personaId) => {
        console.log(personaId)
        // Redirigir a la vista de edición, pasando el ID como prop
        setLocation(`/mas/personas/${personaId}`); 
    };
    
    // ----------------------------------------------------
    // Lógica de Borrado (Modal y Servicio)
    // ----------------------------------------------------

    // 1. Mostrar el modal de confirmación
    const openDeleteModal = (personaId, personaNombre) => {
        setSuccessMessage(null); // Limpiar mensaje de éxito anterior
        setModalState({
            isOpen: true,
            personaId: personaId,
            personaNombre: personaNombre,
            isProcessing: false,
        });
    };

    // 2. Manejar la acción dentro del modal
    const handleConfirmDelete = async (shouldDelete) => {
        // Cerramos el modal inmediatamente si el usuario cancela (false)
        if (!shouldDelete) {
            setModalState({ isOpen: false, personaId: null, personaNombre: '', isProcessing: false });
            return;
        }

        // Si confirma (true), iniciamos el proceso de borrado
        setModalState(prev => ({ ...prev, isProcessing: true }));
        const { personaId, personaNombre } = modalState;
        
        try {
            // Llamar al servicio para realizar el borrado lógico (borrado_logico = 1)
            await personasService.cambiarEstado(personaId, 1);
            
            // Éxito:
            setSuccessMessage(`¡${personaNombre} ha sido borrado lógicamente con éxito!`);
            
            // Refrescar el listado de personas (o eliminarla del estado local)
            await fetchPersonas(); 

        } catch (err) {
            // Error en la operación de borrado
            setError(`Error al borrar a ${personaNombre}: ${err.message || 'Error de conexión.'}`);
        } finally {
            // Cerrar el modal y resetear el estado de procesamiento
            setModalState({ isOpen: false, personaId: null, personaNombre: '', isProcessing: false });
        }
    };

    // ----------------------------------------------------
    // Renderizado de la Vista
    // ----------------------------------------------------
    
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" className="m-4">
                <Typography variant="h6">{error}</Typography>
            </Alert>
        );
    }
    
    if (!personas || personas.length === 0) {
        return (
            <Typography variant="h6" className="text-center p-8 text-gray-600">
                No hay personas registradas en el sistema.
            </Typography>
        );
    }
    
    // --- Renderizado Final ---

    return (
        <div className='bg-[#f5f7f8] p-1 min-h-screen'>
            {/* Mensaje de éxito después de una operación (borrado) */}
            {successMessage && (
                <Alert severity="success" onClose={() => setSuccessMessage(null)} className="mb-4">
                    {successMessage}
                </Alert>
            )}

            {/* Listado de Personas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {personas.map((item) => 
                    <CardPersona 
                        key={item.persona_id}
                        nombre={item.nombre}
                        correo={item.correo}
                        documento={item.documento}
                        // Pasamos el ID para las acciones
                        onEdit={() => handleEdit(item.persona_id)}
                        onDelete={() => openDeleteModal(item.persona_id, item.nombre)}
                    />
                )}
            </div>
            
            {/* Modal de Confirmación de Borrado */}
            <ConfirmacionModal 
                isOpen={modalState.isOpen}
                title="Confirmar Borrado Lógico"
                message={`¿Está seguro que desea dar de baja a la persona: ${modalState.personaNombre}?`}
                onConfirm={handleConfirmDelete}
                isLoading={modalState.isProcessing}
                // No necesitamos onClose aquí, ya que handleConfirmDelete manejará el cierre
            />

        </div>
    );
}