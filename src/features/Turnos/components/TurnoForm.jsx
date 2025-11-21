// src/features/Dashboard/pages/Turnos/components/TurnoForm.jsx

export default function TurnoForm({
    values,
    errors,
    handleChange,
    onSubmit,
    onCancel,
    submitLabel = "Guardar",
    }) {
    return (
        <form
        onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
        }}
        className="bg-white dark:bg-black/30 p-6 rounded-2xl shadow-md flex flex-col gap-5"
        >
        {/* Título dinámico */}
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {submitLabel.includes("Actualizar") ? "Editar Turno" : "Crear Turno"}
        </h2>

        {/* Nombre */}
        <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700 dark:text-gray-300">
            Nombre
            </label>
            <input
            type="text"
            name="nombre"
            value={values.nombre}
            onChange={handleChange}
            className="p-2 rounded-lg bg-gray-100 dark:bg-black/20 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
            />
            {errors.nombre && (
            <p className="text-red-500 text-sm">{errors.nombre}</p>
            )}
        </div>

        {/* Hora Inicio */}
        <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700 dark:text-gray-300">
            Hora de Inicio
            </label>
            <input
            type="time"
            name="hora_inicio"
            value={values.hora_inicio}
            onChange={handleChange}
            className="p-2 rounded-lg bg-gray-100 dark:bg-black/20 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
            />
            {errors.hora_inicio && (
            <p className="text-red-500 text-sm">{errors.hora_inicio}</p>
            )}
        </div>

        {/* Hora Fin */}
        <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700 dark:text-gray-300">
            Hora de Fin
            </label>
            <input
            type="time"
            name="hora_fin"
            value={values.hora_fin}
            onChange={handleChange}
            className="p-2 rounded-lg bg-gray-100 dark:bg-black/20 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
            />
            {errors.hora_fin && (
            <p className="text-red-500 text-sm">{errors.hora_fin}</p>
            )}
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-3 pt-4">
            <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white hover:opacity-80"
            >
            Cancelar
            </button>

            <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
            >
            {submitLabel}
            </button>
        </div>
        </form>
    );
}
