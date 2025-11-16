import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Box, Typography, CircularProgress } from "@mui/material";

import turnoService from "../../../../services/Turnos/TurnosService";
import TurnoInactivoCard from "../components/TurnoInactivoCard";

export default function ReactivarTurnosView() {
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();

  // Cargar solo turnos inactivos (borrado = 1)
  useEffect(() => {
    const fetchInactivos = async () => {
      try {
        const data = await turnoService.obtenerTurnos(1); // ← obtener inactivos
        setTurnos(data);
      } catch (error) {
        console.error("Error al cargar turnos inactivos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInactivos();
  }, []);

  // Reactivar un turno
  const handleRestore = async (turno_id) => {
    try {
      await turnoService.cambiarEstado(turno_id, 0); // ← reactivar

      // Quitar el turno restaurado de la lista local
      setTurnos((prev) => prev.filter((t) => t.turno_id !== turno_id));
    } catch (error) {
      console.error("Error al reactivar turno:", error);
    }
  };

  if (loading) {
    return (
      <Box className="flex items-center justify-center h-64">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="p-6">
      <Typography
        variant="h4"
        className="font-bold mb-6 text-gray-900 dark:text-white"
      >
        Turnos Inactivos
      </Typography>

      {turnos.length === 0 ? (
        <Typography>No hay turnos inactivos.</Typography>
      ) : (
        <Box className="space-y-4">
          {turnos.map((turno) => (
            <TurnoInactivoCard
              key={turno.turno_id}
              nombre={turno.nombre}
              horaInicio={turno.hora_inicio}
              horaFin={turno.hora_fin}
              onRestore={() => handleRestore(turno.turno_id)}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
