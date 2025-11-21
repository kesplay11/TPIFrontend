import EstadoBadge from "./TextEstado";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation } from "wouter";

export default function CardJuegoEditar({ juego, isOpen, onClickAction, onDeleteJuego }) {
    const [, setLocation] = useLocation();

    const handleClick = () => {
        if (onClickAction) {
            onClickAction(juego.juego_id);
        }
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        console.log("Editar juego", juego.juego_id);
        // Redirigir a la vista de edición de juego
        setLocation(`/dashboard/juegos/editar-juego/${juego.juego_id}`);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        console.log("Eliminar juego", juego.juego_id);
        // Llamar al handler de eliminación del padre
        if (onDeleteJuego) {
            onDeleteJuego(juego.juego_id, juego.nombre_categoria);
        }
    };

    return (
        <div
            className={`
                bg-white p-4 m-2 rounded-lg shadow-md transition-all 
                hover:shadow-lg hover:bg-gray-50
                ${isOpen ? "ring-2 ring-blue-500" : ""}
            `}
        >
            {/* CABECERA */}
            <div className="flex justify-between items-start" onClick={handleClick}>
                <div>
                    <h3 className="text-sm font-medium text-gray-500">
                        {juego.nombre_turno}
                    </h3>

                    <h2 className="text-lg font-bold text-gray-900 mt-1">
                        {juego.nombre_categoria}
                    </h2>
                </div>

                <EstadoBadge estado={juego.nombre_estado} />
            </div>

            {/* BOTONES EDITAR / ELIMINAR */}
            <div className="flex gap-3 mt-3 justify-end">
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
    );
}