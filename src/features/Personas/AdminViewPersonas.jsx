
import BarraGestionPersonas from "./components/BarraGestionPersonas";
import LayoutSubView from "../common/LayoutSubView";

export default function AdminViewPersonas() {
  return (
    <LayoutSubView title={"Gestion De Personas"}>
      <BarraGestionPersonas></BarraGestionPersonas>
    </LayoutSubView>
  );
}
