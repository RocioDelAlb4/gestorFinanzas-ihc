import React, { useState } from 'react';
import { Box, Button, Divider, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Tab, Tabs } from '@mui/material';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export const CategoriesPage = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Categorias</Typography>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Añadir Categoría
        </Button>
      </Box>
      <Divider sx={{ marginY: 2 }} />
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Ingreso " {...a11yProps(0)} />
          <Tab label="Gasto" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
     
      </CustomTabPanel>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Añadir Categoría</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, ingresa la nueva categoría que deseas añadir.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nombre de la Categoría"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClose}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
