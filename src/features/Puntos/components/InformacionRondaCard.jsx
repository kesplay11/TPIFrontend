// src/features/pages/Puntos/components/InformacionRondaCard.jsx
import { Card, CardContent, Typography } from "@mui/material";

export default function InformacionRondaCard({ juegoInfo, rondaInfo }) {
    if (!juegoInfo && !rondaInfo) return null;

    return (
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500">
            <CardContent>
                <Typography variant="h6" className="mb-3 text-blue-800 dark:text-blue-200">
                    Información de la Ronda
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {juegoInfo && (
                        <>
                            <div>
                                <Typography variant="body2" className="text-blue-600 dark:text-blue-300 font-medium">
                                    Juego
                                </Typography>
                                <Typography variant="body1" className="text-blue-800 dark:text-blue-100">
                                    {juegoInfo.nombre_categoria || "No especificado"}
                                </Typography>
                            </div>
                            <div>
                                <Typography variant="body2" className="text-blue-600 dark:text-blue-300 font-medium">
                                    Turno
                                </Typography>
                                <Typography variant="body1" className="text-blue-800 dark:text-blue-100">
                                    {juegoInfo.nombre_turno || "No especificado"}
                                </Typography>
                            </div>
                        </>
                    )}
                    {rondaInfo && (
                        <div>
                            <Typography variant="body2" className="text-blue-600 dark:text-blue-300 font-medium">
                                Estado Ronda
                            </Typography>
                            <Typography variant="body1" className="text-blue-800 dark:text-blue-100">
                                {rondaInfo.estado || "No especificado"}
                            </Typography>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}