import { useState, useEffect } from "react";
import CardJuegoEditar from "../components/CardJuegoEditar";
import DetalleJuegoEditar from "../components/DetalleJuegoEditar";
import ConfirmacionModal from "../../Personas/components/ConfirmacionModal";
import LayoutSubView from "../../common/LayoutSubView";
import useSnackbar from "../../../hooks/useSnackbar";
import juegosService from "../../../services/juegos/JuegosService";
import { auth } from "../../../localStorage/authStorage";

import { Box, CircularProgress, Typography, Snackbar, Alert } from "@mui/material";

export default function ListadoJuegosEditarView() {
    const [juegos, setJuegos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { snackbar, showSnackbar, hideSnackbar } = useSnackbar();

    const [openCardId, setOpenCardId] = useState(null);
    
    // Estados para modales de confirmación
    const [confirmModal, setConfirmModal] = useState({
        open: false,
        title: "",
        message: "",
        type: "", // 'juego' o 'ronda'
        id: null,
        isLoading: false
    });

    const handleCardClick = (juegoId) => {
        setOpenCardId(prev => prev === juegoId ? null : juegoId);
    };

    // Handler para eliminar juego
    const handleDeleteJuego = (juegoId, juegoNombre) => {
        setConfirmModal({
            open: true,
            title: "Eliminar Juego",
            message: `¿Estás seguro de que deseas eliminar el juego "${juegoNombre}"? Esta acción no se puede deshacer.`,
            type: "juego",
            id: juegoId,
            isLoading: false
        });
    };

    // Handler para eliminar ronda
    const handleDeleteRonda = (rondaId, rondaNombre) => {
        setConfirmModal({
            open: true,
            title: "Eliminar Ronda",
            message: `¿Estás seguro de que deseas eliminar la "${rondaNombre}"? Esta acción no se puede deshacer.`,
            type: "ronda",
            id: rondaId,
            isLoading: false
        });
    };

    // Handler de confirmación del modal
    const handleConfirm = async (confirmed) => {
        if (!confirmed) {
            setConfirmModal(prev => ({ ...prev, open: false }));
            return;
        }

        setConfirmModal(prev => ({ ...prev, isLoading: true }));

        try {
            if (confirmModal.type === "juego") {
                await juegosService.borrarJuego(confirmModal.id, true);
                setJuegos(prev => prev.filter(j => j.juego_id !== confirmModal.id));
                showSnackbar("Juego elimiminado correctamente", "success");
            } else if (confirmModal.type === "ronda") {
                await juegosService.borrarRonda(confirmModal.id, true);
                // Recargar los juegos para reflejar los cambios en las rondas
                await fetchJuegos();
                showSnackbar("Ronda eliminada correctamente", "success") 
            }
        } catch (err) {
            console.error("Error al eliminar:", err);
            showSnackbar("Ronda eliminada correctamente", "error") 
        } finally {
            setConfirmModal(prev => ({ ...prev, open: false, isLoading: false }));
        }
    };

    const fetchJuegos = async () => {
        setLoading(true);
        try {
            const role = auth.getUserRole();
            let data = [];

            if (role === "alumno") {
                data = await juegosService.obtenerJuegosVisibles();
            } else {
                data = await juegosService.obtenerTodosLosJuegos();
            }

            setJuegos(data);
        } catch (err) {
            console.error(err);
            setError("No se pudieron cargar los juegos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJuegos();
    }, []);

    if (loading) {
        return (
            <Box className="w-full h-[50vh] flex items-center justify-center">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Typography color="error" variant="h6" className="p-8 text-center">
                {error}
            </Typography>
        );
    }

    return (
        <LayoutSubView title={"Juegos"}>
        <div>
            {juegos.map(juego => (
                <div key={juego.juego_id}>
                    <CardJuegoEditar
                        juego={juego}
                        isOpen={openCardId === juego.juego_id}
                        onClickAction={handleCardClick}
                        onDeleteJuego={handleDeleteJuego}
                    />

                    {openCardId === juego.juego_id && (
                        <DetalleJuegoEditar 
                            juegoId={juego.juego_id} 
                            onDeleteRonda={handleDeleteRonda}
                        />
                    )}
                </div>
            ))}

            {/* Modal de Confirmación */}
            <ConfirmacionModal
                isOpen={confirmModal.open}
                title={confirmModal.title}
                message={confirmModal.message}
                onConfirm={handleConfirm}
                onClose={() => setConfirmModal(prev => ({ ...prev, open: false }))}
                isLoading={confirmModal.isLoading}
            />

            {/* Snackbar para feedback */}
        <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={hideSnackbar}>
        <Alert onClose={hideSnackbar} severity={snackbar.severity}>
            {snackbar.message}
        </Alert>
        </Snackbar>


        {!loading && juegos.length === 0 && (
            <Typography variant="h6" className="text-center p-8 text-gray-500">
            No hay juegos para mostrar
            </Typography>
        )}
        </div>
        </LayoutSubView>
    );
}