import React, { useState, useEffect } from 'react';
import {
  Box, Button, Divider, Typography, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, TextField, Tab, Tabs, Snackbar, Alert, Grid, Paper, IconButton, Menu, MenuItem
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { MuiColorInput } from 'mui-color-input'

const options = ['Editar', 'Eliminar'];

const ITEM_HEIGHT = 48;

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

function CategoryItem({ category, onEdit, onDelete }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (option) => {
    if (option === 'Editar') {
      onEdit(category);
    } else if (option === 'Eliminar') {
      onDelete(category);
    }
    setAnchorEl(null);
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: category.color  }}>
      <Typography variant="body1">{category.name}</Typography>
      <IconButton
        aria-label="more"
        aria-controls={menuOpen ? 'long-menu' : undefined}
        aria-expanded={menuOpen ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleMenuClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            onClick={() => handleMenuItemClick(option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Paper>
  );
}

export const CategoriesPage = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [categoryName, setCategoryName] = useState('');
  const [color, setColor] = useState('');
  const [categories, setCategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
    setEditMode(false);
  };

  const handleClose = () => {
    setOpen(false);
    setCategoryName('');
    setColor('');
    setEditMode(false);
    setEditCategoryId(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleColorChange = (event) => {
    setColor(event);
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3000/categoria');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
    }
  };

  const handleSaveCategory = async () => {
    if (!categoryName.trim()) {
      setErrorMessage('Por favor, complete el nombre de la categoría');
      return;
    }

    if (!color.trim()) {
      setErrorMessage('Por favor, seleccione un color');
      return;
    }

    const newCategory = {
      id: editMode ? editCategoryId : Date.now().toString(),
      name: categoryName,
      color: color,
      type: value === 0 ? 'ingreso' : 'gasto'
    };

    const url = editMode ? `http://localhost:3000/categoria/${editCategoryId}` : 'http://localhost:3000/categoria';
    const method = editMode ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCategory)
      });

      if (response.ok) {
        const savedCategory = await response.json();
        if (editMode) {
          setCategories(categories.map(cat => (cat.id === editCategoryId ? savedCategory : cat)));
          setSuccessMessage('Categoría editada con éxito');
        } else {
          setCategories([...categories, savedCategory]);
          setSuccessMessage('Categoría guardada con éxito');
        }
        handleClose();
      } else {
        console.error('Error al guardar la categoría');
      }
    } catch (error) {
      console.error('Error al guardar la categoría:', error);
    }
  };

  const handleEditCategory = (category) => {
    setEditMode(true);
    setEditCategoryId(category.id);
    setCategoryName(category.name);
    setColor(category.color);
    setOpen(true);
  };

  const handleDeleteCategory = async (category) => {
    try {
      const response = await fetch(`http://localhost:3000/categoria/${category.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setCategories(categories.filter(cat => cat.id !== category.id));
        setSuccessMessage('Categoría eliminada con éxito');
      } else {
        console.error('Error al eliminar la categoría');
      }
    } catch (error) {
      console.error('Error al eliminar la categoría:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage('');
    setErrorMessage('');
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Categorias</Typography>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          + Nueva
        </Button>
      </Box>
      <Divider sx={{ marginY: 2 }} />
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Ingreso" {...a11yProps(0)} />
          <Tab label="Gasto" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Typography variant="h6">Categorías de Ingreso</Typography>
        <Grid container spacing={2}>
          {categories.filter(cat => cat.type === 'ingreso').map(cat => (
            <Grid item xs={12} sm={6} md={4} key={cat.id}>
              <CategoryItem category={cat} onEdit={handleEditCategory} onDelete={handleDeleteCategory} />
            </Grid>
          ))}
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Typography variant="h6">Categorías de Gasto</Typography>
        <Grid container spacing={2}>
          {categories.filter(cat => cat.type === 'gasto').map(cat => (
            <Grid item xs={12} sm={6} md={4} key={cat.id}>
              <CategoryItem category={cat} onEdit={handleEditCategory} onDelete={handleDeleteCategory} />
            </Grid>
          ))}
        </Grid>
      </CustomTabPanel>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{editMode ? 'Editar Categoría' : 'Añadir Categoría'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {editMode ? 'Por favor, edita el nombre de la categoría.' : 'Por favor, ingresa la nueva categoría que deseas añadir.'}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nombre de la Categoría"
            type="text"
            fullWidth
            variant="standard"
            value={categoryName}
            onChange={handleCategoryNameChange}
          />
          <MuiColorInput format="hex" isAlphaHidden='false' value={color} onChange={handleColorChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSaveCategory} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={!!successMessage || !!errorMessage} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={successMessage ? 'success' : 'error'} sx={{ width: '100%' }}>
          {successMessage || errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
