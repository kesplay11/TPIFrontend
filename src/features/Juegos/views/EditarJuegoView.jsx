// src/features/pages/Juegos/views/EditarJuegoView.jsx
import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useRoute, useLocation } from "wouter";
import LayoutSubView from "../../common/LayoutSubView";

import useForm from "../../../hooks/useForm";
import JuegoForm from "../components/JuegoForm";

import juegosService from "../../../services/juegos/JuegosService";
import categoriasService from "../../../services/categorias/CategoriasService";
import turnosService from "../../../services/Turnos/TurnosService";
import estadosJuegosServices from "../../../services/EstadosJuegosServices";
import equiposService from "../../../services/equipos/EquiposService";

export default function EditarJuegoView() {
  const [match, params] = useRoute("/dashboard/juegos/editar-juego/:juego_id");
  const juegoId = params?.juego_id;
  const [, setLocation] = useLocation();

  const [loading, setLoading] = useState(true);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [serverError, setServerError] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [turnos, setTurnos] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [estados, setEstados] = useState([]);
  const [existingRounds, setExistingRounds] = useState([]); // Rondas existentes
  const [newRounds, setNewRounds] = useState([]); // Nuevas rondas a agregar

  const { values, errors, handleChange, setValues, validateForm } = useForm(
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
        const [cats, tns, sts, eqs] = await Promise.allSettled([
          categoriasService.obtenerCategorias?.() ?? Promise.resolve([]),
          turnosService.obtenerTurnos?.() ?? Promise.resolve([]),
          estadosJuegosServices.obtenerEstados?.() ?? Promise.resolve([]),
          equiposService.obtenerEquipos?.() ?? Promise.resolve([]),
        ]);

        setCategorias(cats.status === "fulfilled" ? cats.value : []);
        setTurnos(tns.status === "fulfilled" ? tns.value : []);
        setEstados(sts.status === "fulfilled" ? sts.value : []);
        setEquipos(eqs.status === "fulfilled" ? eqs.value : []);
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
        const data = await juegosService.obtenerDatosParaEditarJuegoPorId(juegoId);
        
        // data esperado: { juego: {...}, rondas: [...] }
        const juego = data?.juego ?? {};
        const rondas = data?.rondas ?? [];

        setValues({
          categoria_id: juego.categoria_id ?? "",
          turno_id: juego.turno_id ?? "",
          estado_juego_id: juego.estado_juego_id ?? "",
          visible: typeof juego.visible === "boolean" ? juego.visible : (juego.visible === 1),
        });
        
        setExistingRounds(rondas); // Guardar rondas existentes
      } catch (err) {
        console.error("Error al obtener juego:", err);
        setServerError("No se pudo cargar el juego.");
      } finally {
        setLoading(false);
      }
    };

    fetchJuego();
  }, [juegoId, setValues]);

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setServerError("");
    try {
      // 1. Actualizar datos básicos del juego
      const payload = {
        categoria_id: values.categoria_id,
        turno_id: values.turno_id,
        estado_juego_id: values.estado_juego_id,
        visible: values.visible,
      };
      await juegosService.actualizarJuego(juegoId, payload);

      // 2. Agregar nuevas rondas (si hay)
      if (newRounds.length > 0) {
        for (const round of newRounds) {
          await juegosService.agregarRonda(juegoId, round);
        }
      }

      alert("Juego actualizado correctamente");
      window.history.back();
    } catch (err) {
      console.error("Error al actualizar juego:", err);
      setServerError("Ocurrió un error al actualizar el juego.");
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
    <LayoutSubView title={"Editar Juego"}>
      <JuegoForm
        values={values}
        errors={errors}
        handleChange={handleChange}
        rounds={newRounds} // Nuevas rondas a agregar
        setRounds={setNewRounds}
        existingRounds={existingRounds} // Rondas existentes
        categorias={categorias}
        turnos={turnos}
        estados={estados}
        equipos={equipos}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Guardar Cambios"
        mode="edit" // ¡Importante!
      />

      {serverError && <p className="text-red-500 mt-4 text-center">{serverError}</p>}
    </LayoutSubView>
  );
}