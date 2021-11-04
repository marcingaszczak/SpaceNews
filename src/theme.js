
import { createTheme } from '@mui/material/styles';

const newTheme = createTheme({
    palette: {
        type: 'dark',
        action: {
          active: 'rgba(255, 255, 255, 0.54)',
          hover: 'rgba(255, 255, 255, 0.04)',
          selected: 'rgba(255, 255, 255, 0.08)',
          disabled: 'rgba(255, 255, 255, 0.26)',
          disabledBackground: 'rgba(255, 255, 255, 0.12)',
          focus: 'rgba(255, 255, 255, 0.12)'
        },
        background: {
          default: '#111111',
          dark: '#cfcfcf',
          paper: '#eeeeee'
        },
        primary: {
          main: '#119978'
        },
        secondary: {
          main: '#888888'
        },
        text: {
          primary: '#031410',
          secondary: '#ffffff'
        }
      },
  });

  export default newTheme;