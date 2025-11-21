// src/features/pages/Juegos/views/EditarJuegoView.jsx
import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useRoute, useLocation } from "wouter";

import useForm from "../../../../hooks/useForm";
import JuegoForm from "../components/JuegoForm";

import juegosService from "../../../../services/juegos/JuegosService";
import categoriasService from "../../../../services/categorias/CategoriasService";
import turnosService from "../../../../services/Turnos/TurnosService";
import estadosJuegosServices from "../../../../services/EstadosJuegosServices";

export default function EditarJuegoView() {
  // Ajustá la ruta si tu path es distinto.
  const [match, params] = useRoute("/dashboard/juegos/editar-juego/:juego_id");
  const juegoId = params?.juego_id;
  const [, setLocation] = useLocation();

  const [loading, setLoading] = useState(true);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [serverError, setServerError] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [turnos, setTurnos] = useState([]);
  const [estados, setEstados] = useState([]);

  const { values, errors, handleChange, setValues, validateForm, resetForm } = useForm(
    {
      categoria_id: "",
      turno_id: "",
      estado_juego_id: "",
      visible: false,
    },
    (vals) => {
      const e = {};
      if (!vals.categoria_id) e.categoria_id = "La categoría es obligatoria";
      if (!vals.turno_id) e.turno_id = "El turno es obligatorio";
      if (!vals.estado_juego_id) e.estado_juego_id = "El estado es obligatorio";
      return e;
    }
  );

  // Cargar opciones (categorías, turnos, estados)
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setLoadingOptions(true);
        const [cats, tns, sts] = await Promise.allSettled([
          categoriasService.obtenerCategorias?.() ?? Promise.resolve([]),
          turnosService.obtenerTurnos?.() ?? Promise.resolve([]),
          estadosJuegosServices.obtenerEstados?.() ?? Promise.resolve([]),
        ]);

        setCategorias(cats.status === "fulfilled" ? cats.value : []);
        setTurnos(tns.status === "fulfilled" ? tns.value : []);
        setEstados(sts.status === "fulfilled" ? sts.value : []);
      } catch (err) {
        console.error("Error cargando opciones:", err);
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, []);

  // Cargar datos del juego
  useEffect(() => {
    const fetchJuego = async () => {
      if (!juegoId) return;
      try {
        setLoading(true);
        const data = await juegosService.obtenerJuegoPorId(juegoId);
        // data esperado: { datos_puros: {...}, datos_procesados: {...} }
        const puros = data?.datos_puros ?? {};
        setValues({
          categoria_id: puros.categoria_id ?? "",
          turno_id: puros.turno_id ?? "",
          estado_juego_id: puros.estado_id ?? puros.estado_juego_id ?? "",
          visible: typeof puros.visible === "boolean" ? puros.visible : (puros.visible === 1),
        });
      } catch (err) {
        console.error("Error al obtener juego:", err);
        setServerError("No se pudo cargar el juego.");
      } finally {
        setLoading(false);
      }
    };

    fetchJuego();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [juegoId, setValues]);

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setServerError("");
    try {
      // Mandamos sólo los campos que el endpoint espera
      const payload = {
        categoria_id: values.categoria_id,
        turno_id: values.turno_id,
        estado_juego_id: values.estado_juego_id,
        visible: values.visible,
      };
      await juegosService.actualizarJuego(juegoId, payload);
      alert("Juego actualizado correctamente");
      setLocation("/dashboard/juegos");
    } catch (err) {
      console.error("Error al actualizar juego:", err);
      setServerError("Ocurrió un error al actualizar el juego.");
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
    <Box className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Editar Juego</h1>

      <JuegoForm
        values={values}
        errors={errors}
        handleChange={handleChange}
        rounds={[]} // No editamos rondas acá
        setRounds={() => {}}
        categorias={categorias}
        turnos={turnos}
        estados={estados}
        equipos={[]} // no necesarios
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Guardar Cambios"
      />

      {serverError && <p className="text-red-500 mt-4 text-center">{serverError}</p>}
    </Box>
  );
}
