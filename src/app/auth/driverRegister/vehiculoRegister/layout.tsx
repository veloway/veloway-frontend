import React, { PropsWithChildren } from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

const VehiculoLayout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div>
      <AppBar position="static" sx={{ background: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Registrar Vehículo
          </Typography>
        </Toolbar>
      </AppBar>
      <main
        style={{
          padding: '2rem',
          background: 'linear-gradient(to right, #42a5f5, #478ed1)',
          minHeight: '100vh', // Asegura que el fondo cubra toda la altura
        }}
      >
        <Container maxWidth="lg">
          {children}
        </Container>
      </main>
    </div>
  );
};

export default VehiculoLayout;
