import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

export const SavingsPlanPage = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="container-page-mod">
      <Box sx={{ padding: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Planes de ahorro</Typography>
          <Button variant="contained" onClick={handleClickOpen}>
            Nuevo +
          </Button>
        </Box>
        <Divider sx={{ marginY: 2 }} />
        <Typography variant="h6">Mis planes</Typography>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Crear un nuevo plan de ahorro</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Por favor, llene el siguiente formulario para crear un nuevo plan
              de ahorro.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Nombre del Plan"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="amount"
              label="Cantidad Objetivo"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="amount"
              label="Cantidad Inicial"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="date"
              label="Fecha Límite"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleClose} variant="contained">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};
