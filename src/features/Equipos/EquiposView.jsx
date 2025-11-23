import BarraGestionEquipos from "./components/BarraGestionEquipos";
import { Box } from "@mui/material";
import LayoutSubView from "../common/LayoutSubView";


export default function EquiposView(){
    return (
        <LayoutSubView title={"Gestion De Equipos"}>
            <BarraGestionEquipos/>
        </LayoutSubView>    
    )
}

