import { Card, CardContent, Typography, Button } from "@mui/material";

export default function PuntoRechazadoCard({ punto, onReenviar }) {

    return (
        <Card className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500">
            <CardContent>
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <Typography variant="h6" className="text-red-800 dark:text-red-200">
                                {punto.nombre_categoria}
                            </Typography>
                            <span className="px-2 py-1 bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200 text-sm rounded-full">
                                Rechazado
                            </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-3">
                            <div>
                                <Typography variant="body2" className="text-red-600 dark:text-red-300 font-medium">
                                    Ronda
                                </Typography>
                                <Typography className="text-red-800 dark:text-red-100">
                                    {punto.numero_ronda}
                                </Typography>
                            </div>
                            <div>
                                <Typography variant="body2" className="text-red-600 dark:text-red-300 font-medium">
                                    Turno
                                </Typography>
                                <Typography className="text-red-800 dark:text-red-100">
                                    {punto.nombre_turno}
                                </Typography>
                            </div>
                            <div>
                                <Typography variant="body2" className="text-red-600 dark:text-red-300 font-medium">
                                    Puntos Cargados
                                </Typography>
                                <Typography className="text-red-800 dark:text-red-100 font-bold">
                                    {punto.puntos}
                                </Typography>
                            </div>
                        </div>

                        <Typography variant="body2" className="text-red-600 dark:text-red-300">
                            <strong>Capitán:</strong> {punto.nombre_capitan}
                        </Typography>
                    </div>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => onReenviar(punto)}
                        className="ml-4 bg-green-600 hover:bg-green-700"
                    >
                        Reenviar
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}