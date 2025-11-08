import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

/**
 * Componente de tarjeta para visualizar la información de una persona.
 *
 * @param {object} props - Propiedades del componente
 * @param {string} props.nombre - Nombre completo de la persona (ej: Juan Pérez).
 * @param {string} props.correo - Correo electrónico de la persona.
 * @param {function} [props.onEdit] - Función a ejecutar al hacer clic en el botón de editar.
 * @param {function} [props.onDelete] - Función a ejecutar al hacer clic en el botón de eliminar.
 * @returns {JSX.Element}
 */
export default function CardPersona({ nombre, correo, onEdit, onDelete }) {
    return (
        <div className="flex items-center justify-between p-4 rounded-lg bg-white  m-2 rounded-lg shadow-md cursor-pointer transition-all hover:shadow-lg hover:bg-gray-50">
             
            {/* --- Información Principal (Nombre y Email) --- */}
            <div className="flex-1">
                <p className="text-lg font-bold text-black dark:text-white">{nombre}</p>
                <p className="text-base text-black/60 dark:text-white/60">{correo}</p>
            </div>
            
            {/* --- Botones de Acción (Editar y Eliminar) --- */}
            <div className="flex items-center gap-2">
                
                {/* Botón Editar */}
                <button 
                    className="p-2 rounded-full hover:bg-primary/10 dark:hover:bg-primary/20 text-primary transition-colors"
                    onClick={onEdit}
                    aria-label="Editar persona"
                    // Deshabilita si no se proporciona la función
                    disabled={!onEdit} 
                >
                    {/* ICONO DE MUI: EditIcon */}
                    <EditIcon fontSize="small" />
                </button>
                
                {/* Botón Eliminar */}
                <button 
                    className="p-2 rounded-full hover:bg-red-500/10 dark:hover:bg-red-500/20 text-red-500 transition-colors"
                    onClick={onDelete}
                    aria-label="Eliminar persona"
                    // Deshabilita si no se proporciona la función
                    disabled={!onDelete} 
                >
                    {/* ICONO DE MUI: DeleteIcon */}
                    <DeleteIcon fontSize="small" />
                </button>
            </div>
        </div>
    );
}