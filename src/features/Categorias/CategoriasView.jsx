import { Box } from "@mui/material";
import BarraGestionCategorias from "./components/BarraGestionCategorias";
import LayoutSubView from "../common/LayoutSubView";

export default function CategoriasView() {
  return (
    <LayoutSubView title={"Gestion de Categorias"}>
      <BarraGestionCategorias />
    </LayoutSubView>
  );
}