import EquipoRow from "./EquipoRow";
import { Paper } from "@mui/material";

export default function ResultadosTable({ equipos }) {
  return (
    <Paper
      elevation={3}
      className="w-full max-w-3xl p-4 rounded-xl overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3 text-sm font-semibold text-gray-600">#</th>
              <th className="p-3 text-sm font-semibold text-gray-600">
                Equipo
              </th>
              <th className="p-3 text-sm font-semibold text-gray-600 text-right">
                Puntos
              </th>
            </tr>
          </thead>

          <tbody>
            {equipos.map((equipo, index) => (
              <EquipoRow
                key={equipo.equipo_id}
                index={index}
                nombre={equipo.equipo_nombre}
                puntos={equipo.total_puntos}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Paper>
  );
}
