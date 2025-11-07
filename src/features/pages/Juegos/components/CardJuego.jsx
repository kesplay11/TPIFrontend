import EstadoBadge from "./TextEstado"; // Asumo que TextEstado es tu EstadoBadge

/**
 * Componente para visualizar un juego en una lista, ahora con funcionalidad de clic.
 * * @param {object} props - Propiedades del componente
 * @param {string} props.nombre_categoria - Nombre del juego (usado para mostrar el título).
 * @param {string} props.nombre_estado - Estado actual del juego (ej: 'pendiente', 'en-proceso').
 * @param {number|string} props.nombre_turno - Descripción del turno.
 * @param {function} props.onClickAction - Función a ejecutar cuando se hace clic en la tarjeta. 
 * @returns {JSX.Element}
 */
export default function CardJuego({ 
    nombre_categoria, 
    nombre_estado, 
    nombre_turno, 
    onClickAction // 👈 1. ACEPTAMOS LA FUNCIÓN COMO PROP
}) {
    // Si la función no se pasa desde el padre, usamos una función vacía por defecto
    const handleClick = onClickAction || (() => {}); 

    return (
        <div 
            // 1. Mantenemos la estructura visual y agregamos estilos de interactividad
            className="bg-white p-4 m-2 rounded-lg shadow-md cursor-pointer transition-all hover:shadow-lg hover:bg-gray-50"
            
            // 👈 2. ASIGNAMOS LA FUNCIÓN AL EVENTO ONCLICK
            onClick={handleClick} 
        >
            <div className="flex justify-between items-center">
                {/* Usamos el valor de la prop 'turno' */}
                <h3 className="text-sm font-medium text-gray-500">{nombre_turno}</h3> 
                
                {/* Usamos el valor de la prop 'estado' */}
                <EstadoBadge estado={nombre_estado} />
            </div>
            
            <div className="mt-1">
                {/* Usamos el valor de la prop 'nombre' */}
                <h2 className="text-lg font-bold text-gray-900">{nombre_categoria}</h2>
            </div>
        </div>
    );
}