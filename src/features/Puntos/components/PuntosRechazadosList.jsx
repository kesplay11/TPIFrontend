import PuntoRechazadoCard from "./PuntoRechazadoCard";

export default function PuntosRechazadosList({ puntos, onReenviar }) {
    return (
        <div className="space-y-4">
            {puntos.map((punto) => (
                <PuntoRechazadoCard 
                    key={punto.punto_id} 
                    punto={punto} 
                    onReenviar={onReenviar}
                />
            ))}
        </div>
    );
}