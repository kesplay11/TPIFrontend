import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

/**
 * Componente de tarjeta para visualizar la información de una persona con acciones de edición y borrado.
 *
 * @param {object} props - Propiedades del componente
 * @param {string} props.nombre - Nombre completo de la persona.
 * @param {string} props.correo - Correo electrónico de la persona.
 * @param {string} props.documento - Documento/DNI de la persona. (Añadido para referencia)
 * @param {function} [props.onEdit] - Función a ejecutar al hacer clic en el botón de editar.
 * @param {function} [props.onDelete] - Función a ejecutar al hacer clic en el botón de eliminar.
 * @returns {JSX.Element}
 */
export default function CardPersona({ nombre, correo, documento, onEdit, onDelete }) {
    return (
        <div className="flex items-center justify-between p-4 rounded-xl bg-white m-2 shadow-md transition-all hover:shadow-lg hover:bg-gray-50 border border-gray-100">
            
            {/* --- Información Principal (Nombre, Email, Documento) --- */}
            <div className="flex-1 min-w-0">
                <p className="text-lg font-bold text-gray-800 truncate">{nombre}</p>
                <p className="text-sm text-gray-500 truncate">{correo}</p>
                {/* Puedes añadir el documento aquí si es relevante para la vista */}
                <p className="text-xs text-gray-400">DNI: {documento || 'N/A'}</p>
            </div>
            
            {/* --- Botones de Acción (Editar y Eliminar) --- */}
            <div className="flex items-center gap-1 ml-4">
                
                {/* Botón Editar */}
                <IconButton 
                    color="primary"
                    onClick={onEdit}
                    aria-label="Editar persona"
                    disabled={!onEdit} 
                >
                    <EditIcon fontSize="small" />
                </IconButton>
                
                {/* Botón Eliminar (Borrado Lógico) */}
                <IconButton 
                    sx={{ color: 'error.main' }}
                    onClick={onDelete}
                    aria-label="Eliminar persona (borrado lógico)"
                    disabled={!onDelete} 
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </div>
        </div>
    );
}