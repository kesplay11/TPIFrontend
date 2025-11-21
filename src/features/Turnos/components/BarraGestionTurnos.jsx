import { Link } from "wouter";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import RestoreIcon from "@mui/icons-material/Restore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function BarraGestionTurnos() {

    const gestionLinks = [
        { href: "/dashboard/mas/turnos/agregar", icon: <AddCircleIcon />, text: "Agregar Turno" },
        { href: "/dashboard/mas/turnos/listar", icon: <EditIcon />, text: "Editar Turnos" },
        { href: "/dashboard/mas/turnos/reactivar", icon: <RestoreIcon />, text: "Reactivar Turnos" },
    ];

    return (
        <div>
        <h2 className="text-2xl font-bold text-black dark:text-white mb-6">
            Opciones de Gestion de Turnos
        </h2>

        <div className="space-y-4">
            {gestionLinks.map((link) => (
            <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-4 p-4 rounded-lg bg-white dark:bg-black/20 shadow-sm hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
            >
                {link.icon}
                <p className="text-black dark:text-white text-base font-medium flex-1 truncate">
                {link.text}
                </p>
                <ChevronRightIcon
                className="text-black/50 dark:text-white/50"
                fontSize="medium"
                />
            </Link>
            ))}
        </div>
        </div>
    );
}
