import { createTheme, responsiveFontSizes } from '@mui/material';

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: '#010837',
        light: '#33395f',
        dark: '#000526'
      },
      secondary: {
        main: '#00838f',
        light: '#339ba5',
        dark: '#005b64'
      }
    },
    typography: {
      fontFamily: 'Ubuntu, sans-serif',
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700
    },
    spacing: 8
  })
);
