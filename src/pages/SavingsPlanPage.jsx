import React, { useState, useEffect } from 'react';
import {
  Box, Button, Divider, Typography, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, TextField, Grid, Paper, Snackbar, Alert, IconButton, Menu, MenuItem, Fab
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

export const SavingsPlanPage = () => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false); // State for edit dialog
  const [savingsPlans, setSavingsPlans] = useState([]);
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [initialAmount, setInitialAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [editName, setEditName] = useState(''); // State for edit name
  const [editTargetAmount, setEditTargetAmount] = useState(''); // State for edit target amount
  const [editDeadline, setEditDeadline] = useState(''); // State for edit deadline
  const [editPlanId, setEditPlanId] = useState(null); // State for the plan being edited
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [addAmount, setAddAmount] = useState({}); // State for amount to be added

  useEffect(() => {
    fetchSavingsPlans();
  }, []);

  const fetchSavingsPlans = async () => {
    try {
      const response = await fetch('http://localhost:3000/savingsPlan');
      const data = await response.json();
      setSavingsPlans(data);
    } catch (error) {
      console.error('Error al obtener los planes de ahorro:', error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName('');
    setTargetAmount('');
    setInitialAmount('');
    setDeadline('');
  };

  const handleSave = async () => {
    if (!name || !targetAmount || !initialAmount || !deadline) {
      setSnackbarMessage('Por favor complete toda la información requerida');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    if (parseFloat(initialAmount) > parseFloat(targetAmount)) {
      setSnackbarMessage('La cantidad inicial no puede ser mayor que la cantidad objetivo');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    const nameExists = savingsPlans.some(plan => plan.name.toLowerCase() === name.toLowerCase());
    if (nameExists) {
      setSnackbarMessage('Ya existe un plan con este nombre');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    const newPlan = {
      id: Date.now().toString(),
      name,
      targetAmount: parseFloat(targetAmount),
      initialAmount: parseFloat(initialAmount),
      currentAmount: parseFloat(initialAmount),
      deadline
    };

    try {
      const response = await fetch('http://localhost:3000/savingsPlan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPlan)
      });

      if (response.ok) {
        const savedPlan = await response.json();
        setSavingsPlans([...savingsPlans, savedPlan]);
        handleClose();
        setSnackbarMessage('Plan de ahorro creado exitosamente');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage('Error al crear el plan de ahorro');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        console.error('Error al guardar el plan de ahorro');
      }
    } catch (error) {
      setSnackbarMessage('Error al crear el plan de ahorro');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      console.error('Error al guardar el plan de ahorro:', error);
    }
  };

  const handleEditOpen = (plan) => {
    setEditPlanId(plan.id);
    setEditName(plan.name);
    setEditTargetAmount(plan.targetAmount);
    setEditDeadline(plan.deadline);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditName('');
    setEditTargetAmount('');
    setEditDeadline('');
  };

  const handleEditSave = async () => {
    if (!editName || !editTargetAmount || !editDeadline) {
      setSnackbarMessage('Por favor complete toda la información requerida');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
  
    // Encuentra el plan original
    const plan = savingsPlans.find(plan => plan.id === editPlanId);
  
    // Crea el objeto actualizado
    const updatedPlan = {
      id: editPlanId,
      name: editName,
      targetAmount: parseFloat(editTargetAmount),
      currentAmount: plan.currentAmount, // Mantén la cantidad actual
      deadline: editDeadline
    };
  
    try {
      const response = await fetch(`http://localhost:3000/savingsPlan/${editPlanId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPlan)
      });
  
      if (response.ok) {
        const updatedPlanResponse = await response.json();
        setSavingsPlans(savingsPlans.map(plan => plan.id === editPlanId ? updatedPlanResponse : plan));
        handleEditClose();
        setSnackbarMessage('Plan de ahorro actualizado exitosamente');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage('Error al actualizar el plan de ahorro');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        console.error('Error al actualizar el plan de ahorro');
      }
    } catch (error) {
      setSnackbarMessage('Error al actualizar el plan de ahorro');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      console.error('Error al actualizar el plan de ahorro:', error);
    }
  };
  

  const handleDelete = async (planId) => {
    try {
      const response = await fetch(`http://localhost:3000/savingsPlan/${planId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setSavingsPlans(savingsPlans.filter(plan => plan.id !== planId));
        setSnackbarMessage('Plan de ahorro eliminado exitosamente');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage('Error al eliminar el plan de ahorro');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        console.error('Error al eliminar el plan de ahorro');
      }
    } catch (error) {
      setSnackbarMessage('Error al eliminar el plan de ahorro');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      console.error('Error al eliminar el plan de ahorro:', error);
    }
  };

  const handleMenuClick = (event, planId) => {
    setAnchorEl(event.currentTarget);
    setSelectedPlanId(planId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action) => {
    if (action === 'edit') {
      const plan = savingsPlans.find(plan => plan.id === selectedPlanId);
      handleEditOpen(plan);
    } else if (action === 'delete') {
      handleDelete(selectedPlanId);
    }
    handleMenuClose();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleAddAmountChange = (event, planId) => {
    setAddAmount({
      ...addAmount,
      [planId]: event.target.value
    });
  };

  const handleAddAmountClick = async (planId) => {
    const amountToAdd = parseFloat(addAmount[planId]);
    if (isNaN(amountToAdd) || amountToAdd <= 0) {
      setSnackbarMessage('Por favor ingrese una cantidad válida');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    const plan = savingsPlans.find(plan => plan.id === planId);
    if (plan.currentAmount + amountToAdd > plan.targetAmount) {
      setSnackbarMessage('La cantidad añadida excede la cantidad objetivo');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    const updatedPlan = {
      ...plan,
      currentAmount: plan.currentAmount + amountToAdd
    };

    try {
      const response = await fetch(`http://localhost:3000/savingsPlan/${planId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPlan)
      });

      if (response.ok) {
        const updatedPlanResponse = await response.json();
        setSavingsPlans(savingsPlans.map(plan => plan.id === planId ? updatedPlanResponse : plan));
        setSnackbarMessage('Cantidad añadida exitosamente');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setAddAmount({
          ...addAmount,
          [planId]: ''
        });
      } else {
        setSnackbarMessage('Error al añadir la cantidad');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        console.error('Error al añadir la cantidad');
      }
    } catch (error) {
      setSnackbarMessage('Error al añadir la cantidad');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      console.error('Error al añadir la cantidad:', error);
    }
  };

  return (
    <Box sx={{ padding: 9 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Planes de ahorro</Typography>
        <Button variant="contained" onClick={handleClickOpen}>+ Nuevo</Button>
      </Box>
      <Divider sx={{ marginY: 2 }} />
      <Typography variant="h6" sx={{ marginBottom: 4 }}>Mis planes </Typography>
      <Grid container spacing={2}>
        {savingsPlans.map(plan => (
          <Grid item xs={12} sm={6} md={4} key={plan.id}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="h6"
                  style={{
                    color: '#5776c2',   // Cambia el color si lo deseas
                    fontSize: '1.4rem', // Aumenta el tamaño del texto
                    fontWeight: 'bold'  // Hace el texto más grueso
                  }}
                >{plan.name}
                </Typography>
                <Typography>Cantidad Objetivo: {plan.targetAmount}</Typography>
                <Typography>Cantidad Actual: {plan.currentAmount}</Typography>
                <Typography>Fecha Límite: {plan.deadline}</Typography>
              </Box>
                <IconButton
                  aria-label="more"
                  aria-controls={openMenu ? 'long-menu' : undefined}
                  aria-haspopup="true"
                  onClick={(event) => handleMenuClick(event, plan.id)}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleMenuClose}
                  PaperProps={{
                    style: {
                      maxHeight: 48 * 4.5,
                      width: '20ch',
                    },
                  }}
                >
                  <MenuItem onClick={() => handleMenuItemClick('edit')}>Editar</MenuItem>
                  <MenuItem onClick={() => handleMenuItemClick('delete')}>Eliminar</MenuItem>
                </Menu>
              </Box>
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <Gauge
                  value={plan.currentAmount}
                  startAngle={-110}
                  endAngle={110}
                  sx={{
                    [`& .${gaugeClasses.valueText}`]: {
                      fontSize: 40,
                      transform: 'translate(0px, 0px)',
                    },
                    width: '100%', // Adjust width if needed
                    height: 150, // Adjust height if needed
                  }}
                  text={({ value, valueMax }) => `${value} / ${valueMax}`}
                  valueMax={plan.targetAmount} // Sets the max value to the target amount
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                <TextField
                  id="standard-basic"
                  label="Añadir Cantidad"
                  variant="standard"
                  value={addAmount[plan.id] || ''}
                  onChange={(e) => handleAddAmountChange(e, plan.id)}
                />
                <Fab
                  size="small"
                  color="secondary"
                  aria-label="add"
                  onClick={() => handleAddAmountClick(plan.id)}
                  sx={{ marginLeft: 1 }}
                  style={{ 
                    backgroundColor: '#6696dd', // Cambia esto al color que desees
                    color: 'white' // Cambia el color del ícono si es necesario
                  }}
                >
                  <AddIcon />
                </Fab>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Crear un nuevo plan de ahorro</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, llene el siguiente formulario para crear un nuevo plan de ahorro.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nombre del Plan"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
            inputProps={{ pattern: '[A-Za-z ]+' }}
          />
          <TextField
            margin="dense"
            id="targetAmount"
            label="Cantidad Objetivo"
            type="number"
            fullWidth
            variant="standard"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
          />
          <TextField
            margin="dense"
            id="initialAmount"
            label="Cantidad Inicial"
            type="number"
            fullWidth
            variant="standard"
            value={initialAmount}
            onChange={(e) => setInitialAmount(e.target.value)}
          />
          <TextField
            margin="dense"
            id="deadline"
            label="Fecha Límite"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Editar plan de ahorro</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Modifique los campos necesarios y guarde los cambios.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="editName"
            label="Nombre del Plan"
            type="text"
            fullWidth
            variant="standard"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            inputProps={{ pattern: '[A-Za-z ]+' }}
          />
          <TextField
            margin="dense"
            id="editTargetAmount"
            label="Cantidad Objetivo"
            type="number"
            fullWidth
            variant="standard"
            value={editTargetAmount}
            onChange={(e) => setEditTargetAmount(e.target.value)}
          />
          <TextField
            margin="dense"
            id="editDeadline"
            label="Fecha Límite"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            value={editDeadline}
            onChange={(e) => setEditDeadline(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancelar</Button>
          <Button onClick={handleEditSave} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
