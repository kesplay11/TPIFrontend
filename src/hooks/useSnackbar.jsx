// hooks/useSnackbar.js
import { useState } from 'react';

export default function useSnackbar() {
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const showSnackbar = (message, severity = "success") => {
        setSnackbar({ open: true, message, severity });
    };

    const hideSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    return { snackbar, showSnackbar, hideSnackbar };
}