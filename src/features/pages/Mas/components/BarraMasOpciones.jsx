import { Link, useLocation } from "wouter";

import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import CategoryIcon from "@mui/icons-material/Category";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function BarraMasOpciones() {
  const [location] = useLocation();

  const gestionLinks = [
    { href: "/dashboard/mas/personas", icon: <PeopleIcon />, text: "Gestionar Personas" },
    { href: "/dashboard/mas/turnos", icon: <AccessTimeIcon />, text: "Gestionar Turnos" },
    { href: "/dashboard/mas/equipos", icon: <GroupWorkIcon />, text: "Gestionar Equipos" },
    { href: "/dashboard/mas/categorias", icon: <CategoryIcon />, text: "Gestionar Categorías" },
    // { href: "/mas/resultados", icon: <AssessmentIcon/> ,  text: "Resultados"}
  ];

  // ✅ Mostrar solo si estamos en la ruta base de “Más”
  const isBaseRoute = location === "/dashboard/mas";

  if (!isBaseRoute) return null;

  return (
    <div>

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
