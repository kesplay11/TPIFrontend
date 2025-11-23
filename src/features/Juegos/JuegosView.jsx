import { Box } from "@mui/material";
import BarraGestionJuegos from "./components/BarraGestionJuegos";
import LayoutBase from "../common/LayoutBase";

export default function JuegosView() {
    return (
        <LayoutBase title="Gestión de Juegos">
            <BarraGestionJuegos/>
        </LayoutBase>
    );
}