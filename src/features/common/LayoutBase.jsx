// src/components/layout/LayoutBase.jsx
import { Box, Typography, Divider } from "@mui/material";

export default function LayoutBase({ title, children }) {
    return (
        <Box className="">
            {/* Título centrado */}
        <h2 className="text-3xl font-bold text-black dark:text-white flex-1 text-center p-4">
            {title}
        </h2>

            <Divider className="mb-4" />

            {/* Contenido de la vista */}
            <Box sx={{m:2}}>
                {children}
            </Box>
        </Box>
    );
}
