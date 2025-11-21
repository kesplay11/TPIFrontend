// src/features/pages/Juegos/components/RondasForm.jsx
import React from "react";

export default function RondasForm({ rounds, setRounds, estados, equipos }) {
  // Rounds handlers
  const addRound = () => {
    setRounds((prev) => [
      ...prev,
      { numero_ronda: prev.length + 1, estado_ronda_id: "", equipos: [] },
    ]);
  };

  const removeRound = (index) => {
    setRounds((prev) => prev.filter((_, i) => i !== index));
  };

  const updateRound = (index, patch) => {
    setRounds((prev) => prev.map((r, i) => (i === index ? { ...r, ...patch } : r)));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white">Rondas</h3>
        <button
          type="button"
          onClick={addRound}
          className="px-3 py-1 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
        >
          Agregar ronda
        </button>
      </div>

      {rounds.length === 0 && (
        <p className="text-sm text-gray-500">Aún no agregaste rondas. Agrega al menos una.</p>
      )}

      {rounds.map((r, idx) => (
  <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border">
    {/* Encabezado de la ronda */}
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center font-bold">
          {idx + 1}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Ronda {idx + 1}</p>
          <p className="text-xs text-gray-500">Número de ronda: {r.numero_ronda ?? idx + 1}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => removeRound(idx)}
          className="px-2 py-1 rounded bg-red-500 text-white text-sm hover:bg-red-600"
        >
          Eliminar
        </button>
      </div>
    </div>

    {/* Campos de la ronda */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {/* Select de estado */}
      <div>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
          Estado de la ronda
        </label>
        <select
          value={r.estado_ronda_id}
          onChange={(e) => updateRound(idx, { estado_ronda_id: e.target.value })}
          className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        >
          <option value="">-- Seleccione estado --</option>
          {estados.map((s) => (
            <option
              key={s.estado_ronda_id ?? s.estado_id ?? s.estado}
              value={s.estado_ronda_id ?? s.estado_id ?? s.estado}
            >
              {s.nombre || s.desc || s.nombre_estado || s.estado}
            </option>
          ))}
        </select>
      </div>

      {/* Select de equipos - Versión con checkboxes */}
      <div>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
          Equipos ({r.equipos.length} seleccionados)
        </label>
        <div className="max-h-32 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded p-2 dark:bg-gray-800 space-y-1">
          {equipos.map((eq) => (
            <label key={eq.equipo_id} className="flex items-center space-x-2 py-1 cursor-pointer">
              <input
                type="checkbox"
                checked={r.equipos.includes(eq.equipo_id)}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  const nuevosEquipos = isChecked
                    ? [...r.equipos, eq.equipo_id]
                    : r.equipos.filter(id => id !== eq.equipo_id);
                  updateRound(idx, { equipos: nuevosEquipos });
                }}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{eq.nombre}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  </div>
))}
    </div>
  );
}