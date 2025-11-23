import resultadosService from "../../services/Resultados/ResultadosServices";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { CircularProgress, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import LayoutSubView from "../common/LayoutSubView";


export default function ResultadosView() {
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const fetchResultados = async () => {
      try {
        const data = await resultadosService.obtenerResultados();
        setResultados(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error al cargar resultados:", error);
        setResultados([]);
      } finally {
        setLoading(false);
      }
    };
    fetchResultados();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <CircularProgress />
      </div>
    );
  }

  if (!resultados || resultados.length === 0) {
    return (
      <div className="p-6 text-center text-gray-600 dark:text-gray-300">
        No hay resultados para mostrar.
      </div>
    );
  }

  const lider = resultados[0];
  const resto = resultados.slice(1);

  return (
    <LayoutSubView title={"Resultados"}>
      {/* Leader Card (destacado) */}
      {lider && (
        <div className="mt-6 rounded-2xl p-6 shadow-lg bg-[#1E88E5]">
          <div className="flex items-center gap-3">
            <WorkspacePremiumIcon className="text-white text-2xl" />
            <p className="text-white text-lg font-medium">Líder</p>
          </div>

          <div className="flex flex-col items-center justify-center gap-2 mt-3">
            <p className="text-white text-3xl font-bold">
              {lider.equipo_nombre}
            </p>
            <p className="text-white text-5xl font-extrabold tracking-tight">
              {Number(lider.total_puntos).toLocaleString()}
            </p>
            <p className="text-white/80 text-base font-medium">Puntos</p>
          </div>
        </div>
      )}

      {/* Lista de equipos */}
      <div className="mt-6 rounded-xl shadow-lg bg-white dark:bg-[#1a1a1a] divide-y divide-gray-200/70 dark:divide-gray-700">
        {resto.map((equipo, idx) => (
          <div
            key={equipo.equipo_id}
            className="flex items-center gap-4 px-4 py-5 justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 w-10 h-10 text-gray-800 dark:text-gray-200 font-bold text-lg">
                {idx + 2}
              </div>

              <p className="text-lg font-medium text-gray-900 dark:text-gray-200 truncate">
                {equipo.equipo_nombre}
              </p>
            </div>

            <p className="text-lg font-bold text-gray-900 dark:text-gray-200">
              {Number(equipo.total_puntos).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
        </LayoutSubView>
  );
}
