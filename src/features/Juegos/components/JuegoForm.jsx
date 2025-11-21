// src/features/pages/Juegos/components/JuegoForm.jsx
import React from "react";
import RondasForm from "./RondasForm";

export default function JuegoForm({
  values,
  errors,
  handleChange,
  rounds,
  setRounds,
  categorias = [],
  turnos = [],
  estados = [],
  equipos = [],
  onSubmit,
  onCancel,
  submitLabel = "Crear Juego",
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="bg-white dark:bg-black/30 p-6 rounded-2xl shadow-md space-y-6 max-w-3xl mx-auto"
    >
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Crear Juego</h2>

      {/* Campos del juego */}
      <div className="space-y-4">
        {/* Categoria */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Categoría
          </label>
          <select
            name="categoria_id"
            value={values.categoria_id}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.categoria_id ? "border-red-500" : "border-gray-300 dark:border-gray-600"
            } focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white`}
          >
            <option value="">-- Seleccione una categoría --</option>
            {categorias.map((c) => (
              <option key={c.categoria_id} value={c.categoria_id}>
                {c.nombre}
              </option>
            ))}
          </select>
          {errors.categoria_id && <p className="text-red-500 text-sm mt-1">{errors.categoria_id}</p>}
        </div>

        {/* Turno */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Turno</label>
          <select
            name="turno_id"
            value={values.turno_id}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.turno_id ? "border-red-500" : "border-gray-300 dark:border-gray-600"
            } focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white`}
          >
            <option value="">-- Seleccione un turno --</option>
            {turnos.map((t) => (
              <option key={t.turno_id} value={t.turno_id}>
                {t.nombre}
              </option>
            ))}
          </select>
          {errors.turno_id && <p className="text-red-500 text-sm mt-1">{errors.turno_id}</p>}
        </div>

        {/* Estado del juego */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Estado del juego
          </label>
          <select
            name="estado_juego_id"
            value={values.estado_juego_id}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.estado_juego_id ? "border-red-500" : "border-gray-300 dark:border-gray-600"
            } focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white`}
          >
            <option value="">-- Seleccione un estado --</option>
            {estados.map((s) => (
              <option key={s.estado_juego_id || s.estado_id} value={s.estado_juego_id ?? s.estado_id}>
                {s.nombre || s.desc || s.nombre_estado || s.nombre}
              </option>
            ))}
          </select>
          {errors.estado_juego_id && <p className="text-red-500 text-sm mt-1">{errors.estado_juego_id}</p>}
        </div>

        {/* Visible */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            ¿Desea que el juego esté visible ahora?
          </label>
          <select
            name="visible"
            value={String(values.visible)}
            onChange={(e) => {
              const v = e.target.value === "true";
              handleChange({ target: { name: "visible", value: v } });
            }}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white"
          >
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>

      {/* Sección de rondas */}
      <RondasForm
        rounds={rounds}
        setRounds={setRounds}
        estados={estados}
        equipos={equipos}
      />

      {/* Botones */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
        >
          Cancelar
        </button>

        <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}