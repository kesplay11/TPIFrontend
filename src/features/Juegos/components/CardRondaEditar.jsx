import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation } from "wouter";
import EstadoBadge from "./TextEstado";

export default function CardRondaEditar({ ronda, equipos, numero, onDeleteRonda }) {
    const [, setLocation] = useLocation();

    const handleEdit = () => {
        console.log("Editar ronda", ronda.juego_ronda_id);
        // Redirigir a la vista de edición de ronda
        setLocation(`/dashboard/juegos/editar-ronda/${ronda.juego_ronda_id}`);
    };

    const handleDelete = () => {
        console.log("Eliminar ronda", ronda.juego_ronda_id);
        // Llamar al handler de eliminación del padre
        if (onDeleteRonda) {
            onDeleteRonda(ronda.juego_ronda_id, `Ronda ${numero}`);
        }
    };

    return (
        <div className="border p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
            <div className="flex justify-between items-center mb-3 border-b pb-2 border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center font-bold">
                        {numero}
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                            Ronda {numero}
                        </h4>
                        <p className="text-sm text-gray-500">
                            Número de ronda: {ronda.numero_ronda || numero}
                        </p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <EstadoBadge estado={ronda.nombre_estado_ronda || "Sin estado"} />
                    
                    <div className="flex gap-2">
                        <button
                            className="text-blue-600 hover:text-blue-800"
                            onClick={handleEdit}
                        >
                            <EditIcon />
                        </button>
                        <button
                            className="text-red-600 hover:text-red-800"
                            onClick={handleDelete}
                        >
                            <DeleteIcon />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mostrar equipos de la ronda */}
            <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Equipos ({equipos.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                    {equipos.map(equipo => (
                        <span 
                            key={equipo.equipo_id}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                        >
                            {equipo.nombre_equipo || equipo.nombre}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}