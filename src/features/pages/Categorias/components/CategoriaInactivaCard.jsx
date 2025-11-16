import RestoreIcon from "@mui/icons-material/Restore";

export default function ReactivarCategoriaCard({ nombre, onRestore }) {
    return (
        <div className="flex items-center justify-between bg-white dark:bg-black/30 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all">
        <p className="text-lg font-medium text-gray-900 dark:text-white truncate">
            {nombre}
        </p>

        <div>
            <button
            onClick={onRestore}
            className="p-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors"
            >
            <RestoreIcon fontSize="small" />
            </button>
        </div>
        </div>
    );
}
