import EstadoBadge from './TextEstado';
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
    juego_id,
    onClickAction,
    isOpen
}) {
    
    const handleClick = () => {
        if (onClickAction){
            onClickAction(juego_id)
        }
    }
    const containerClasses = `
        bg-white p-4 m-2 rounded-lg shadow-md cursor-pointer transition-all 
        hover:shadow-lg hover:bg-gray-50
        ${isOpen ? 'ring-2 ring-blue-500' : ''} 
    `;

    return (
        <div 
            // 1. Mantenemos la estructura visual y agregamos estilos de interactividad
            className={containerClasses}            
            // 👈 2. ASIGNAMOS LA FUNCIÓN AL EVENTO ONCLICK
            onClick={handleClick} 
        >
        <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-sm font-medium text-gray-500">{nombre_turno}</h3> 
                    <h2 className="text-lg font-bold text-gray-900 mt-1">{nombre_categoria}</h2>
                </div>
                <EstadoBadge estado={nombre_estado} />
            </div>
        </div>
    );
}