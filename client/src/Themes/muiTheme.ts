import { createTheme, ThemeOptions } from '@mui/material';

const options: ThemeOptions = {
  palette: {
    primary: {
      main: '#14496a',
    },
    secondary: {
      main: '#15bf20',
    },
    success: {
      main: '#14496A',
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Cairo',
          fontSize: 13,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontFamily: 'Cairo',
          fontSize: 13,
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          fontFamily: 'Cairo',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: 'Cairo',
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          fontFamily: 'Cairo',
          letterSpacing: 0.00938,
          fontSize: 13,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: { arrow: { color: '#14496a' } },
      defaultProps: {
        arrow: true,
        componentsProps: {
          tooltip: {
            sx: {
              padding: 1,
              backgroundColor: '#14496a',
              fontSize: 12,
            },
          },
        },
      },
    },
  },
};

export const themeVariants = {
  default: createTheme({
    ...options,
    direction: 'ltr',
  }),
  RTL: createTheme({
    ...options,
    direction: 'rtl',
  }),
};
