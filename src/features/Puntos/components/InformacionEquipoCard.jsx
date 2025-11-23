// src/features/pages/Puntos/components/InformacionEquipoCard.jsx
import { Card, CardContent, Typography } from "@mui/material";

export default function InformacionEquipoCard({ equipoNombre, role }) {
    return (
        <Card className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500">
            <CardContent>
                <Typography variant="h6" className="mb-2 text-green-800 dark:text-green-200">
                    Información del Equipo
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Typography variant="body2" className="text-green-600 dark:text-green-300 font-medium">
                            Equipo Seleccionado
                        </Typography>
                        <Typography variant="body1" className="text-green-800 dark:text-green-100 font-semibold">
                            {equipoNombre}
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="body2" className="text-green-600 dark:text-green-300 font-medium">
                            Rol
                        </Typography>
                        <Typography variant="body1" className="text-green-800 dark:text-green-100">
                            {role === 'coordinador' ? 'Coordinador' : 'Capitán'}
                        </Typography>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}