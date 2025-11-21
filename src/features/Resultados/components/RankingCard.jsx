export default function RankingCard({ equipo, posicion }) {
    const medallas = {
        1: "🥇",
        2: "🥈",
        3: "🥉"
    };

    return (
        <div
            className="
                bg-white p-4 rounded-2xl shadow-sm border border-gray-200 
                hover:shadow-md transition-shadow duration-200
                flex justify-between items-center
            "
        >
            <div className="flex items-center gap-4">
                <div className="text-3xl">
                    {medallas[posicion] || <span className="text-gray-400">#{posicion}</span>}
                </div>

                <div>
                    <p className="text-lg font-semibold text-gray-900">
                        {equipo.equipo_nombre}
                    </p>

                    <p className="text-gray-600">
                        {equipo.total_puntos} puntos
                    </p>
                </div>
            </div>
        </div>
    );
}
