import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'Fira Sans , sans-serif', // Replace with your font

    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
        @font-face {
          font-family: 'Fira Sans';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
        }
      `,
        },
    },
});

export default theme;