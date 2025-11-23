// src/components/personas/ModalPersonasReactivar.jsx
import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from "@mui/material";
import { Check, Close } from "@mui/icons-material";

export default function ModalPersonasReactivar({ 
  isOpen, 
  title, 
  message, 
  onClose, 
  onConfirm,
  showConfirm = false 
}) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center', pb: 1 }}>
        {title}
      </DialogTitle>
      
      <DialogContent sx={{ textAlign: 'center' }}>
        <Typography id="alert-dialog-description" variant="body1">
          {message}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ 
        justifyContent: 'center', 
        gap: 2, 
        pb: 3,
        px: 3 
      }}>
        {showConfirm ? (
          <>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Check />}
              onClick={() => onConfirm(true)}
              sx={{ minWidth: 100 }}
            >
              Sí
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<Close />}
              onClick={() => onConfirm(false)}
              sx={{ minWidth: 100 }}
            >
              No
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={onClose}
            sx={{ minWidth: 100 }}
          >
            Aceptar
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}