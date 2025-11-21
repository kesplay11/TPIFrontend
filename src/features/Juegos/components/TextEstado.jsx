

// Define las clases de color para cada estado
const statusStyles = {
  // Amarillo (pendiente)
  'pendiente': 'bg-yellow-100 text-yellow-800 border-yellow-400', 
  // Azul (en-proceso)
  'en-proceso': 'bg-blue-100 text-blue-800 border-blue-400',
  // Verde (finalizado)
  'finalizado': 'bg-green-100 text-green-800 border-green-400',
  // Rojo (suspendido)
  'suspendido': 'bg-red-100 text-red-800 border-red-400',
};

// Puedes añadir un estilo por defecto en caso de que el estado no coincida
const defaultStyles = 'bg-gray-100 text-gray-800 border-gray-400';

export default function EstadoBadge({ estado }) {
  // Selecciona las clases basadas en el 'estado', o usa las por defecto si no se encuentra
  const classes = statusStyles[estado] || defaultStyles;

  // Un valor de texto amigable, capitalizado
  const displayText = estado.charAt(0).toUpperCase() + estado.slice(1).replace('-', ' ');

  return (
    <div 
      // Se combinan las clases base con las clases condicionales
      className={`
        inline-flex items-center 
        px-3 py-1 
        text-xs font-semibold 
        leading-none 
        rounded-full 
        border 
        ${classes}
      `}
    >
      {displayText}
    </div>
  );
}