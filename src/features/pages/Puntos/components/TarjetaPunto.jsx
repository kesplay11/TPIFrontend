import { Card, CardContent, Typography, Button, Box } from "@mui/material";

export default function TarjetaPunto({ punto, onEditar }) {
  return (
    <Card sx={{ mb: 2, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 1 }}>
           {punto.nombre_categoria}
        </Typography>

        <Typography variant="body2">
          <strong>Equipo:</strong> {punto.nombre}
        </Typography>
        <Typography variant="body2">
          <strong>Juego ID:</strong> {punto.juego_id}
        </Typography>
        <Typography variant="body2">
          <strong>Ronda:</strong> {punto.numero_ronda}
        </Typography>
        <Typography variant="body2">
          <strong>Puntos:</strong> {punto.puntos}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          <strong>Estado:</strong> {punto.desc_estado_punto}
        </Typography>

        <Box textAlign="right">
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => onEditar(punto)}
          >
            Editar
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
