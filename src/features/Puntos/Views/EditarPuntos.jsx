import { useEffect, useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import puntosService from "../../../../services/puntos/PuntosService";
import TarjetaPunto from "../components/TarjetaPunto";
import ConfirmacionModalPuntos from "../components/ConfirmacionModalPuntos";
import { auth } from "../../../../localStorage/localstorage";

export default function EditarPuntos() {
  const [puntos, setPuntos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [puntoSeleccionado, setPuntoSeleccionado] = useState(null);
  const [nuevoPuntaje, setNuevoPuntaje] = useState("");
  const [saving, setSaving] = useState(false);

  const rol = auth.getUserRole(); // para mostrar permisos según rol

  // 🔄 Traer puntos confirmados
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await puntosService.obtenerPuntos("confirmado");
        setPuntos(data);
      } catch (err) {
        console.error("Error al obtener puntos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 🧩 Abrir modal de edición
  const handleEditar = (punto) => {
    setPuntoSeleccionado(punto);
    setNuevoPuntaje(punto.puntos);
    setModalOpen(true);
  };

  // 🧩 Confirmar actualización
  const handleConfirm = async (confirmed) => {
    if (!confirmed) {
      setModalOpen(false);
      return;
    }

    if (!nuevoPuntaje || isNaN(nuevoPuntaje) || Number(nuevoPuntaje) < 0) {
      alert("Ingresá un valor numérico válido (mayor o igual a 0).");
      return;
    }

    setSaving(true);
    try {
      await puntosService.actualizarPuntos(
        puntoSeleccionado.punto_id,
        Number(nuevoPuntaje)
      );

      // 🔁 Actualizar vista
      setPuntos((prev) =>
        prev.map((p) =>
          p.punto_id === puntoSeleccionado.punto_id
            ? { ...p, puntos: nuevoPuntaje }
            : p
        )
      );

      alert("Punto actualizado correctamente.");
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Error al actualizar el punto.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Typography>Cargando puntos...</Typography>;

  return (
    <Box p={3} pb={10}>
      <Typography variant="h5" gutterBottom>
        Editar Puntos Confirmados
      </Typography>

      {puntos.length === 0 ? (
        <Typography variant="body1">No hay puntos confirmados.</Typography>
      ) : (
        puntos.map((p) => (
          <TarjetaPunto key={p.punto_id} punto={p} onEditar={handleEditar} />
        ))
      )}

      <ConfirmacionModalPuntos
        isOpen={modalOpen}
        title="Editar Puntaje"
        message={
          <>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Ingresá el nuevo valor del puntaje:
            </Typography>
            <TextField
              fullWidth
              type="number"
              value={nuevoPuntaje}
              onChange={(e) => setNuevoPuntaje(e.target.value)}
            />
          </>
        }
        onConfirm={handleConfirm}
        onClose={() => setModalOpen(false)}
        isLoading={saving}
        confirmLabel="Guardar Cambios"
      />
    </Box>
  );
}
