import { Typography } from "@mui/material";

export default function PuntosRechazadosHeader() {
    return (
        <div className="text-center">
            <Typography variant="h4" className="text-gray-900 dark:text-white mb-2">
                Puntos Rechazados
            </Typography>
            <Typography variant="body1" className="text-gray-600 dark:text-gray-300">
                Aquí puedes ver y reenviar los puntos que fueron rechazados por los coordinadores
            </Typography>
        </div>
    );
}