import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Grid, Dialog, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const AdvicesPage = () => {
  const [consejos, setConsejos] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedConsejo, setSelectedConsejo] = useState(null);
  useEffect(() => {
    fetchConsejos();
  }, []);

  const fetchConsejos = async () => {
    try {
      const response = await fetch('http://localhost:3000/consejos');
      const data = await response.json();
      setConsejos(data);
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
    }
  };
  

  const handleOpen = (consejo) => {
    setSelectedConsejo(consejo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedConsejo(null);
  };
  return (
  <div>
    <Grid container spacing={2} sx={{ marginTop: 6 }}>
      {consejos.map((consejo) => (
        <Grid item xs={12} sm={6} md={4} key={consejo.id}>
          <Card onClick={() => handleOpen(consejo)} sx={{ 
            minHeight: '300px', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between', 
            backgroundColor: '#AED3F2' 
          }}>
            <CardMedia
              component="img"
              height="140" // Puedes ajustar la altura según sea necesario
              image={consejo.imagenEnlace}
              alt={`Imagen ${consejo.id}`}
            />
            <CardContent>
              <Typography variant="body2" align="justify">
                {consejo.descripcion}
              </Typography>
              <Box mt={2}>
                <Typography variant="body2" color="primary">
                  <a href={consejo.enlace} target="_blank" rel="noopener noreferrer">
                    {consejo.linkText}
                  </a>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <Box 
            sx={{ 
              position: 'relative', 
              padding: 2 
            }}
          >
            <IconButton 
              onClick={handleClose} 
              sx={{ 
                position: 'absolute', 
                top: 8, 
                right: 8,
                color: 'white', 
                '&:hover': {
                  backgroundColor: '#3766F4', // Fondo azul fuerte al pasar el ratón por encima
                }
              }}
            >
              <CloseIcon />
            </IconButton>
            {selectedConsejo && (
              <>
                <CardMedia
                  component="img"
                  height="200"
                  image={selectedConsejo.imagenEnlace}
                  alt={`Imagen ${selectedConsejo.id}`}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {selectedConsejo.descripcion}
                  </Typography>
                  <Typography variant="body2" color="primary">
                    <a href={selectedConsejo.enlace} target="_blank" rel="noopener noreferrer">
                      {selectedConsejo.linkText}
                    </a>
                  </Typography>
                </CardContent>
              </>
            )}
          </Box>
        </Dialog>
  </div>
  );
};
