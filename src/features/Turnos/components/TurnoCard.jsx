// TurnoCard.jsx
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TurnoCard({ nombre, horaInicio, horaFin, onEdit, onDelete }) {
    return (
        <div className="flex items-center justify-between bg-white dark:bg-black/30 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all">
        <div className="flex flex-col">
            <p className="text-lg font-medium text-gray-900 dark:text-white">
            {nombre}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
            Inicio: {horaInicio}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
            Fin: {horaFin}
            </p>
        </div>

        <div className="flex gap-3">
            <button
            onClick={onEdit}
            className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
            >
            <EditIcon fontSize="small" />
            </button>

            <button
            onClick={onDelete}
            className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
            >
            <DeleteIcon fontSize="small" />
            </button>
        </div>
        </div>
    );
}

