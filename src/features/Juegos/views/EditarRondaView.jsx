// src/features/pages/Juegos/views/EditarRondaView.jsx
import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography, Card, CardContent } from "@mui/material";
import { useRoute, useLocation } from "wouter";
import LayoutSubView from "../../common/LayoutSubView";

import useForm from "../../../hooks/useForm";
import juegosService from "../../../services/juegos/JuegosService";
import equiposService from "../../../services/equipos/EquiposService";
import estadosJuegosServices from "../../../services/EstadosJuegosServices";

export default function EditarRondaView() {
  const [match, params] = useRoute("/dashboard/juegos/editar-ronda/:juego_ronda_id");
  const juegoRondaId = params?.juego_ronda_id;
  const [, setLocation] = useLocation();

  const [loading, setLoading] = useState(true);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [serverError, setServerError] = useState("");

  // Nuevos estados para información del juego
  const [juegoInfo, setJuegoInfo] = useState(null);
  const [numeroRonda, setNumeroRonda] = useState("");
  const [allEquipos, setAllEquipos] = useState([]);
  const [estados, setEstados] = useState([]);

  // Usamos useForm para manejar los campos editables
  const { values, errors, handleChange, setValues, validateForm } = useForm(
    {
      estado_ronda_id: "",
      equipos: [],
    },
    // Validación personalizada - solo estado_ronda_id es obligatorio
    (vals) => {
      const e = {};
      if (!vals.estado_ronda_id) e.estado_ronda_id = "El estado de la ronda es obligatorio";
      return e;
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!juegoRondaId) return;
      try {
        setLoading(true);
        
        // 1) Obtener datos de la ronda
        const rondaRes = await juegosService.obtenerRondaPorId(juegoRondaId);
        const puros = rondaRes?.datos_puros ?? {};
        const procesados = rondaRes?.datos_procesados ?? {};

        // 2) Obtener información del juego usando el juego_id de la ronda
        if (puros.juego_id) {
          const juegoRes = await juegosService.obtenerDatosParaEditarJuegoPorId(puros.juego_id);
          setJuegoInfo(juegoRes?.juego || null);
        }

        // Establecer valores en el formulario
        setNumeroRonda(puros.numero_ronda ?? "");
        setValues({
          estado_ronda_id: puros.estado_ronda_id ?? "",
          equipos: (procesados.equipos || []).map(e => e.equipo_id),
        });

      } catch (err) {
        console.error("Error cargando datos:", err);
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

    fetchData();
    fetchOptions();
  }, [juegoRondaId, setValues]);

  const toggleEquipo = (id) => {
    const newEquipos = values.equipos.includes(id)
      ? values.equipos.filter(x => x !== id)
      : [...values.equipos, id];
    
    // Usamos handleChange para mantener la consistencia con useForm
    handleChange({ 
      target: { 
        name: "equipos", 
        value: newEquipos 
      } 
    });
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setServerError("");
    try {
      // Solo enviamos estado_ronda_id y equipos - NO numero_ronda
      const payload = {
        estado_ronda_id: values.estado_ronda_id,
        equipos: values.equipos,
      };
      await juegosService.actualizarRonda(juegoRondaId, payload);
      alert("Ronda actualizada correctamente");
      window.history.back();
    } catch (err) {
      console.error("Error al actualizar ronda:", err);
      const msg = err?.response?.data?.message ?? err?.response?.data?.mensaje ?? "Ocurrió un error al actualizar la ronda";
      setServerError(msg);
    }
  };

  const handleCancel = () => {
    window.history.back();
  };

  if (loading || loadingOptions) {
    return (
      <Box className="w-full h-56 flex items-center justify-center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <LayoutSubView title={`Editar Ronda ${numeroRonda}`}>
      <Box className="p-6 max-w-2xl mx-auto space-y-6">
        
        {/* Información del Juego */}
        {juegoInfo && (
          <Card className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500">
            <CardContent>
              <Typography variant="h6" className="mb-3 text-blue-800 dark:text-blue-200">
                Información del Juego
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Typography variant="body2" className="text-blue-600 dark:text-blue-300 font-medium">
                    Categoría
                  </Typography>
                  <Typography variant="body1" className="text-blue-800 dark:text-blue-100">
                    {juegoInfo.nombre_categoria || "No especificada"}
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
                <div>
                  <Typography variant="body2" className="text-blue-600 dark:text-blue-300 font-medium">
                    Estado del Juego
                  </Typography>
                  <Typography variant="body1" className="text-blue-800 dark:text-blue-100">
                    {juegoInfo.estado_nombre || "No especificado"}
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Formulario de Edición de Ronda */}
        <div className="bg-white dark:bg-black/30 p-6 rounded-2xl shadow-md space-y-6">
          <Typography variant="h5" className="text-gray-900 dark:text-white">
            Editar Ronda
          </Typography>

          {/* Número de Ronda (solo lectura) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Número de Ronda
            </label>
            <input
              type="number"
              value={numeroRonda}
              readOnly
              disabled
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            />
            <Typography variant="body2" className="text-gray-500 dark:text-gray-400 mt-1">
              El número de ronda no se puede modificar
            </Typography>
          </div>

          {/* Estado de la Ronda (editable) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Estado de la Ronda *
            </label>
            <select
              name="estado_ronda_id"
              value={values.estado_ronda_id}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.estado_ronda_id ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              } focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white`}
            >
              <option value="">-- Seleccione estado --</option>
              {estados.map(s => (
                <option 
                  key={s.estado_id || s.estado_ronda_id} 
                  value={s.estado_id || s.estado_ronda_id}
                >
                  {s.nombre || s.desc || s.nombre_estado}
                </option>
              ))}
            </select>
            {errors.estado_ronda_id && (
              <p className="text-red-500 text-sm mt-1">{errors.estado_ronda_id}</p>
            )}
          </div>

          {/* Equipos (editables) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Equipos Participantes ({values.equipos.length} seleccionados)
            </label>
            <div className="max-h-48 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-3 dark:bg-gray-800 space-y-2">
              {allEquipos.length === 0 ? (
                <Typography className="text-gray-500 dark:text-gray-400 text-center py-4">
                  No hay equipos disponibles
                </Typography>
              ) : (
                allEquipos.map(eq => (
                  <label 
                    key={eq.equipo_id} 
                    className="flex items-center space-x-3 py-2 px-3 rounded hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={values.equipos.includes(eq.equipo_id)}
                      onChange={() => toggleEquipo(eq.equipo_id)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                      {eq.nombre}
                    </span>
                  </label>
                ))
              )}
            </div>
            <Typography variant="body2" className="text-gray-500 dark:text-gray-400 mt-1">
              Seleccione los equipos que participarán en esta ronda
            </Typography>
          </div>

          {/* Mensaje de error del servidor */}
          {serverError && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <Typography className="text-red-700 dark:text-red-300 text-sm">
                {serverError}
              </Typography>
            </div>
          )}

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600 transition font-medium"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      </Box>
    </LayoutSubView>
  );
}