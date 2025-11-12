import { useState } from 'react';
import { useParams, useLocation, Switch, Route } from 'wouter';
import { Box, Button, TextField, Typography } from '@mui/material';
import { auth } from '../../../../localStorage/localstorage';
import puntosService from '../../../../services/puntos/PuntosService';

export default function CargarPuntosView() {
  const { juegoId, rondaId } = useParams();
  console.log(rondaId)
  const [location, setLocation] = useLocation();
  const [puntos, setPuntos] = useState('');
  const [loading, setLoading] = useState(false);

  const capitanId = auth.getUserID(); // El capitan que carga el punto
  const equipoId = auth.getUserTeamId(); // Su equipo

  const handleSubmit = async () => {
    const puntosNum = Number(puntos);

    if (!puntosNum || isNaN(puntosNum)) {
      alert("Ingresa un valor numérico válido.");
      return; 
    }

    if(puntosNum < 0) {
      alert("No puedes ingresar puntos negativos.");
      return;
    }

    setLoading(true);

    try {
      await puntosService.crearPunto(equipoId, rondaId, capitanId, Number(puntos));


      alert("Punto cargado correctamente!");
      // Redirigir a la vista principal
      setLocation(`/dashboard`);
    } catch (err) {
      console.error(err);
      alert("Error al cargar el punto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h6" gutterBottom>
        Cargar Punto para Ronda {rondaId}
      </Typography>

      <TextField
        label="Puntos"
        type="number"
        value={puntos}
        onChange={(e) => setPuntos(e.target.value)}
        fullWidth
        sx={{ mb: 3 }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Cargando..." : "Cargar Punto"}
      </Button>


    </Box>
           
  );
}
