/**
 * Componente que muestra el contenido de detalle (la sección oculta) del juego.
 * @param {object} props - Propiedades del componente
 * @param {object[]} props.equipos - Lista de equipos con sus puntos. 
 * @returns {JSX.Element}
 */
export default function DetalleJuego({ equipos = [] }) {
    return (
        // El contenido del acordeón que se mostrará/ocultará
        <div className="mt-4 border-t border-black/10 dark:border-white/10 pt-4 space-y-3">
            {/* Iteramos sobre los equipos para crear las filas */}
            {equipos.map((partido, index) => (
                <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {/* Equipo 1 */}
                        <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-base font-bold">
                            {partido.equipo1_inicial}
                        </div>
                        <span className="font-medium text-black/80 dark:text-white/80 text-base">
                            {partido.equipo1_nombre}
                        </span>
                        
                        <div className="w-px h-4 bg-black/20 dark:bg-white/20"></div>
                        
                        {/* Equipo 2 */}
                        <span className="font-medium text-black/80 dark:text-white/80 text-base">
                            {partido.equipo2_nombre}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-base font-bold">
                            {partido.equipo2_inicial}
                        </div>
                    </div>
                    
                    <div className="text-right">
                        <p className="text-base font-bold text-black/90 dark:text-white/90">
                            {partido.puntos1} - {partido.puntos2}
                        </p>
                        <p className="text-sm text-black/50 dark:text-white/50">Puntos</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

// Nota: Asume que el objeto 'item' del padre ahora tiene una propiedad 'equipos'
// con la estructura { equipo1_inicial, equipo1_nombre, equipo2_inicial, equipo2_nombre, puntos1, puntos2, ... }