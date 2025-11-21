import puntosService from "../../../../services/puntos/PuntosService";
import TarjetaPunto from "../components/TarjetaPunto";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import TarjetaPunto from "../components/TarjetaPunto";

export default function PuntosRechazadoView(){
    const [puntos, setPuntos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDatos = async () =>  {
            try {
                const data = await puntosService.obtenerPuntos({estado: "rechazado"});
                setPuntos(data);
            } catch (err) {
                console.error("algo sucedio mal en la carga de los datos de los puntos", err)
                return err
            }
        }
        fetchDatos();
    },[])

    return(
        <div>
            {puntos.map((punto) => {
                <TarjetaPunto
                    
                />
            })}
        </div>
    )

}