// src/components/layout/LayoutSubView.jsx
import { Box, Typography, IconButton, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function LayoutSubView({ title, backTo, children }) {
    const handleGoBack = () => {
        // Retrocede una página en el historial
        window.history.back();
    };

    return (
        <Box>
            {/* Fila con botón y título */}
            <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                <IconButton onClick={handleGoBack}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography 
                    variant="h4" 
                    component="h2"
                    sx={{ 
                        flex: 1, 
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: 'text.primary'
                    }}
                >
                    {title}
                </Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* Contenido */}
            <Box sx={{ m: 2 }}>
                {children}
            </Box>
        </Box>
    );
}