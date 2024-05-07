import { createTheme, responsiveFontSizes } from '@mui/material';

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: '#439974',
        light: '#65B391',
        dark: '#5BB38D'
      },
      secondary: {
        main: '#DF8662',
        light: '#B8603D',
        dark: '#E79F83'
      }
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700
    },
    spacing: 8
  })
);
