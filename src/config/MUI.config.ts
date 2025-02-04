import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      light: '#1976d2',
      main: '#176bc4',
      dark: '#1360ad',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#F2F8FF',
      dark: '#dcdee1',
      contrastText: '#000',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    }
  }
});
