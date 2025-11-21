// src/features/pages/Juegos/views/EditarRondaView.jsx
import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import { useRoute, useLocation } from "wouter";

import juegosService from "../../../../services/juegos/JuegosService";
import equiposService from "../../../../services/equipos/EquiposService";
import estadosJuegosServices from "../../../../services/EstadosJuegosServices";

export default function EditarRondaView() {
  // Ajustá la ruta si tu path es distinto.
  const [match, params] = useRoute("/dashboard/juegos/editar-ronda/:juego_ronda_id");
  const juegoRondaId = params?.juego_ronda_id;
  const [, setLocation] = useLocation();

  const [loading, setLoading] = useState(true);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [serverError, setServerError] = useState("");

  const [numeroRonda, setNumeroRonda] = useState("");
  const [estadoRondaId, setEstadoRondaId] = useState("");
  const [selectedEquipos, setSelectedEquipos] = useState([]);

  const [allEquipos, setAllEquipos] = useState([]);
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      if (!juegoRondaId) return;
      try {
        setLoading(true);
        // 1) traer datos de la ronda
        const res = await juegosService.obtenerRondaPorId(juegoRondaId);
        // res: { datos_puros: {...}, datos_procesados: { estado, equipos: [...] } }
        const puros = res?.datos_puros ?? {};
        const procesados = res?.datos_procesados ?? {};

        setNumeroRonda(puros.numero_ronda ?? "");
        setEstadoRondaId(puros.estado_id ?? puros.estado_ronda_id ?? "");
        setSelectedEquipos((procesados.equipos || []).map(e => e.equipo_id));

      } catch (err) {
        console.error("Error cargando ronda:", err);
        setServerError("No se pudieron cargar los datos de la ronda");
      } finally {
        setLoading(false);
      }
    };

    const fetchOptions = async () => {
      try {
        setLoadingOptions(true);
        const [eqs, sts] = await Promise.allSettled([
          equiposService.obtenerEquipos?.() ?? Promise.resolve([]),
          estadosJuegosServices.obtenerEstados?.() ?? Promise.resolve([]),
        ]);
        setAllEquipos(eqs.status === "fulfilled" ? eqs.value : []);
        setEstados(sts.status === "fulfilled" ? sts.value : []);
      } catch (err) {
        console.error("Error cargando opciones:", err);
      } finally {
        setLoadingOptions(false);
      }
    };

    fetch();
    fetchOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [juegoRondaId]);

  const toggleEquipo = (id) => {
    setSelectedEquipos(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  const handleSubmit = async () => {
    setServerError("");
    try {
      const payload = {
        numero_ronda: numeroRonda,
        estado_ronda_id: estadoRondaId,
        equipos: selectedEquipos,
      };
      await juegosService.actualizarRonda(juegoRondaId, payload);
      alert("Ronda actualizada correctamente");
      setLocation("/dashboard/juegos");
    } catch (err) {
      console.error("Error al actualizar ronda:", err);
      const msg = err?.response?.data?.message ?? "Ocurrió un error al actualizar la ronda";
      setServerError(msg);
    }
  };

  const handleCancel = () => {
    setLocation("/dashboard/juegos");
  };

  if (loading || loadingOptions) {
    return (
      <Box className="w-full h-56 flex items-center justify-center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Editar Ronda</h1>

      <div className="bg-white dark:bg-black/30 p-6 rounded-2xl shadow-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Número de ronda</label>
          <input
            type="number"
            value={numeroRonda}
            onChange={(e) => setNumeroRonda(e.target.value)}
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Estado de la ronda</label>
          <select
            value={estadoRondaId}
            onChange={(e) => setEstadoRondaId(e.target.value)}
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="">-- Seleccione estado --</option>
            {estados.map(s => (
              <option key={s.estado_id ?? s.estado_ronda_id ?? s.id} value={s.estado_id ?? s.estado_ronda_id ?? s.id}>
                {s.nombre ?? s.desc ?? s.nombre_estado}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Equipos ({selectedEquipos.length} seleccionados)
          </label>
          <div className="max-h-40 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded p-2 dark:bg-gray-800 space-y-1">
            {allEquipos.map(eq => (
              <label key={eq.equipo_id} className="flex items-center space-x-2 py-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedEquipos.includes(eq.equipo_id)}
                  onChange={() => toggleEquipo(eq.equipo_id)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{eq.nombre}</span>
              </label>
            ))}
          </div>
        </div>

        {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </Box>
  );
}
