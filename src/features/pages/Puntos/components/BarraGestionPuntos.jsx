import { Link, useLocation } from "wouter";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function BarraGestionPuntos() {
  const [location] = useLocation();

  const gestionLinks = [
    { href: "/puntos/cargar", icon: <AddCircleIcon />, text: "Cargar Puntos" },
    { href: "/puntos/confirmar", icon: <CheckCircleIcon />, text: "Confirmar Puntos" },
    { href: "/puntos/editar", icon: <EditIcon />, text: "Editar Puntos" },
  ];

  // ✅ Mostrar solo si estamos en la ruta base de puntos
  const isBaseRoute = location === "/puntos";

  if (!isBaseRoute) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold text-black dark:text-white mb-6">
        Opciones de Gestión de Puntos
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
