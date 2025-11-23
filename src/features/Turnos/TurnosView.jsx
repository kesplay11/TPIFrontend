import { Box } from "@mui/material";
import BarraGestionTurnos from "./components/BarraGestionTurnos";
import LayoutSubView from "../common/LayoutSubView";

export default function TurnosView() {
  return (
    <LayoutSubView title={"Gestion De Turnos"}>
      <BarraGestionTurnos />
    </LayoutSubView>
  );
}