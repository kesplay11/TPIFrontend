import { TextField } from "@mui/material"
import React from 'react';
import EstadoBadge from "./components/TextEstado"; // Asumo que TextEstado es tu EstadoBadge

/**
 * Componente para visualizar un juego en una lista, ahora con funcionalidad de clic.
 * * @param {object} props - Propiedades del componente
 * @param {string} props.nombre - Nombre del juego.
 * @param {string} props.estado - Estado actual del juego (ej: 'pendiente', 'en-proceso').
 * @param {number|string} props.turno - Número o descripción del turno.
 * @param {function} props.onClickAction - Función a ejecutar cuando se hace clic en la tarjeta.
 * @returns {JSX.Element}
 */

function onClickActionn(){
    console.log("se clickeo")
}
const datos = {nombre:"FUBTOLITO", estado: "pendiente", turno: "vespertino"}
export default function JuegosView({ nombre, estado, turno, onClickAction }) {
    // Definimos el estado del componente (opcional) si deseas manejar un clic interno, 
    // pero para ejecutar una acción externa, solo necesitamos la prop 'onClickAction'.

    return (
        <div 
            // 1. Mantenemos la estructura visual y agregamos estilos de interactividad
            className="bg-white p-4 m-2 rounded-lg shadow-md cursor-pointer transition-all hover:shadow-lg hover:bg-gray-50"
            
            // 2. Agregamos el evento onClick al div contenedor
            onClick={onClickActionn}
        >
            <div className="flex justify-between items-center">
                {/* Usamos el valor de la prop 'turno' */}
                <h3 className="text-sm font-medium text-gray-500">{datos.turno}</h3> 
                
                {/* Usamos el valor de la prop 'estado' */}
                <EstadoBadge estado={datos.estado} />
            </div>
            
            <div className="mt-1">
                {/* Usamos el valor de la prop 'nombre' */}
                <h2 className="text-lg font-bold text-gray-900">{datos.nombre}</h2>
            </div>
        </div>
    );
}


// import React from 'react';

// // Datos de ejemplo para los juegos
// const gameData = [
//   {
//     id: 1,
//     turno: 1,
//     nombre: "Juego de Cartas",
//     estado: "Pendiente",
//     estadoColor: "yellow",
//     ring: false,
//     details: null,
//   },
//   {
//     id: 2,
//     turno: 2,
//     nombre: "Ajedrez",
//     estado: "En Proceso",
//     estadoColor: "blue",
//     ring: true,
//     details: [
//       { equipo1: "E1", equipo2: "E2", nombre1: "Equipo 1", nombre2: "Equipo 2", puntos1: 15, puntos2: 7 },
//       { equipo1: "E3", equipo2: "E4", nombre1: "Equipo 3", nombre2: "Equipo 4", puntos1: 10, puntos2: 12 },
//     ],
//   },
//   {
//     id: 3,
//     turno: 3,
//     nombre: "Dominó",
//     estado: "Finalizado",
//     estadoColor: "green",
//     ring: false,
//     details: null,
//   },
//   {
//     id: 4,
//     turno: 1,
//     nombre: "Parchís",
//     estado: "Suspendido",
//     estadoColor: "red",
//     ring: false,
//     details: null,
//   },
// ];

// // Mapeo de colores para los estados
// const statusColors = {
//   yellow: { text: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-100 dark:bg-yellow-900/50" },
//   blue: { text: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/50" },
//   green: { text: "text-green-600 dark:text-green-400", bg: "bg-green-100 dark:bg-green-900/50" },
//   red: { text: "text-red-600 dark:text-red-400", bg: "bg-red-100 dark:bg-red-900/50" },
// };

// /**
//  * Componente para mostrar los detalles de los equipos en el juego "En Proceso".
//  */
// const GameDetails = ({ details }) => {
//   return (
//     <div className="mt-4 border-t border-black/10 dark:border-white/10 pt-4 space-y-3">
//       {details.map((detail, index) => (
//         <div key={index} className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">{detail.equipo1}</div>
//             <span className="font-medium text-black/80 dark:text-white/80">{detail.nombre1}</span>
//             <div className="w-px h-4 bg-black/20 dark:bg-white/20"></div>
//             <span className="font-medium text-black/80 dark:text-white/80">{detail.nombre2}</span>
//             <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">{detail.equipo2}</div>
//           </div>
//           <div className="text-right">
//             <p className="text-sm font-bold text-black/90 dark:text-white/90">{detail.puntos1} - {detail.puntos2}</p>
//             <p className="text-xs text-black/50 dark:text-white/50">Puntos</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// /**
//  * Componente individual para cada tarjeta de juego.
//  */
// const GameCard = ({ game }) => {
//   const color = statusColors[game.estadoColor];
//   const ringClass = game.ring ? "ring-2 ring-primary" : "";

//   return (
//     <div className={`bg-white/80 dark:bg-white/5 rounded-lg p-4 cursor-pointer transition-all hover:bg-white dark:hover:bg-white/10 ${ringClass}`}>
//       <div className="flex justify-between items-start">
//         <div>
//           <p className="text-sm text-black/60 dark:text-white/60">Turno {game.turno}</p>
//           <p className="text-base font-bold text-black/90 dark:text-white/90 mt-1">{game.nombre}</p>
//         </div>
//         <span className={`text-xs font-medium ${color.text} ${color.bg} px-2 py-1 rounded-full`}>{game.estado}</span>
//       </div>
//       {game.details && <GameDetails details={game.details} />}
//     </div>
//   );
// };

// /**
//  * Componente principal de la aplicación.
//  */
// const JuegosView = () => {
//   // Configuración de Tailwind (simulada aquí, en un proyecto real iría en index.css o global.css)
//   const tailwindConfig = `
//     .bg-background-light { background-color: #f6f7f8; }
//     .dark .bg-background-dark { background-color: #101a22; }
//     .text-primary { color: #1392ec; }
//     .ring-primary { --tw-ring-color: #1392ec; }
//     .bg-primary\\/20 { background-color: rgba(19, 146, 236, 0.2); }
//   `;

//   return (
//     <div className="relative flex h-auto min-h-screen w-full flex-col justify-between group/design-root overflow-x-hidden font-display bg-background-light dark:bg-background-dark">
//       {/* Puedes agregar esta línea para simular la configuración de tailwind en este entorno */}
//       <style>{tailwindConfig}</style> 
      
//       <div>
//         {/* Header */}
//         <header className="flex items-center justify-between p-4 bg-background-light dark:bg-background-dark border-b border-black/10 dark:border-white/10">
//           <div className="w-10"></div>
//           <h1 className="text-lg font-bold text-black/90 dark:text-white/90">Juegos</h1>
//           <button className="flex items-center justify-center h-10 w-10 text-primary">
//             <span className="material-symbols-outlined text-3xl">add</span>
//           </button>
//         </header>

//         {/* Main Content (Lista de Juegos) */}
//         <main className="p-4 space-y-4">
//           {gameData.map(game => (
//             <GameCard key={game.id} game={game} />
//           ))}
//         </main>
//       </div>

//       {/* Footer / Navigation */}
//       <footer className="sticky bottom-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-t border-black/10 dark:border-white/10">
//         <nav className="flex justify-around items-center h-16">
//           <a className="flex flex-col items-center justify-center gap-1 text-primary" href="#">
//             <span className="material-symbols-outlined">face_5</span>
//             <p className="text-xs font-medium">Juegos</p>
//           </a>
//           <a className="flex flex-col items-center justify-center gap-1 text-black/60 dark:text-white/60" href="#">
//             <span className="material-symbols-outlined">checklist</span>
//             <p className="text-xs font-medium">Rondas</p>
//           </a>
//           <a className="flex flex-col items-center justify-center gap-1 text-black/60 dark:text-white/60" href="#">
//             <span className="material-symbols-outlined">emoji_events</span>
//             <p className="text-xs font-medium">Puntajes</p>
//           </a>
//           <a className="flex flex-col items-center justify-center gap-1 text-black/60 dark:text-white/60" href="#">
//             <span className="material-symbols-outlined">person</span>
//             <p className="text-xs font-medium">Perfil</p>
//           </a>
//         </nav>
//       </footer>
//     </div>
//   );
// };

// export default JuegosView;