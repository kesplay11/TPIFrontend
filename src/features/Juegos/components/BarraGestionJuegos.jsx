import { Link } from "wouter";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import RestoreIcon from "@mui/icons-material/Restore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function BarraGestionJuegos() {

    const gestionLinks = [
        { href: "/dashboard/juegos/agregar", icon: <AddCircleIcon />, text: "Agregar Nuevo Juego" },
        { href: "/dashboard/juegos/listar", icon: <EditIcon />, text: "ver todos los juegos" },
    ];

    return (
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

    );
}
