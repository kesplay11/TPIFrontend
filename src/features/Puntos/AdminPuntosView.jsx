
import BarraGestionPuntos from "./components/BarraGestionPuntos";
import LayoutBase from "../common/LayoutBase";


export default function AdminPuntosView() {
  return (
  <LayoutBase title={"Puntos"}>
      <BarraGestionPuntos></BarraGestionPuntos>
  </LayoutBase>
  );
}
