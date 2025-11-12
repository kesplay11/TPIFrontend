
export default function CategoriaForm({
values,
errors,
handleChange,
onSubmit,
onCancel,
submitLabel = "Aceptar",
}) {
return (
    <form
    onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
    }}
    className="bg-white dark:bg-black/30 p-6 rounded-2xl shadow-md space-y-6 max-w-md mx-auto"
    >
    <div>
        <label
        htmlFor="nombre"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
        Nombre de la Categoría
        </label>
        <input
        type="text"
        id="nombre"
        name="nombre"
        value={values.nombre}
        onChange={handleChange}
        placeholder="Ej. Fútbol, Atletismo..."
        className={`w-full px-4 py-2 rounded-lg border ${
            errors.nombre
            ? "border-red-500"
            : "border-gray-300 dark:border-gray-600"
        } focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white`}
        />
        {errors.nombre && (
        <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
        )}
    </div>

    <div className="flex justify-end gap-3">
        <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
        >
        Cancelar
        </button>

        <button
        type="submit"
        className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
        >
        {submitLabel}
        </button>
    </div>
    </form>
);
}
