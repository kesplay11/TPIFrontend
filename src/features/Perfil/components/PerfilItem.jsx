import { Box, Typography, Divider } from "@mui/material"

export default function PerfilItem ({ label, value }){
    return(
    <Box 
        // 1. Fondo, Margen y Padding
        sx={{ 
            mb: 3, 
            p: 3, 
            m: 2, 
            bgcolor: 'white', 
            borderRadius: 1, 
            boxShadow: 1, 
            // 2. Texto Centrado
            textAlign: 'center' 
        }}
    >
        {/* Etiqueta (Pequeña, secundaria) */}
        <Typography variant="body2" color="text.secondary">
            {label}
        </Typography>

        {/* Valor (MUCHO MÁS GRANDE, primario) */}
        <Typography 
            variant="h5" // ¡Mucho más grande que el original 'h6'!
            component="h3" 
            color="primary" 
            sx={{ 
                mt: 0.5, 
                fontWeight: 'bold' 
            }}
        >
            {value}
        </Typography>
        
        <Divider sx={{ mt: 2 }} />
    </Box>
    )
};