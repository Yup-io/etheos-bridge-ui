import { createMuiTheme } from '@material-ui/core/styles'
import Colors from './colors'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: Colors.White,
      main: Colors.White,
      contrastText: Colors.Black
    },
    secondary: {
      main: Colors.Black
    },
    third: {
      main: '#00eab7'
    },
    background: {
      default: Colors.Green
    }
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: '0.25rem'
      }
    },
    MuiInputLabel: {
      shrink: {
        color: `${Colors.White} !important`
      }
    }
  },
  typography: {
    button: {
      textTransform: 'uppercase',
      fontSize: '16px',
      lineHeight: '23px',
      letterSpacing: '1%',
      fontWeight: '500',
      fontFamily: 'Rubik'

    },
    display3: {
      fontFamily: 'Rubik',
      fontStyle: 'thin',
      fontSize: '20px',
      lineHeight: '20px',
      color: Colors.Green,
      fontWeight: '100'
    },
    display2: {
      fontFamily: 'Rubik',
      fontStyle: 'thin',
      fontSize: '34px',
      lineHeight: '59px',
      color: Colors.Green
    },
    display1: {
      fontFamily: 'Rubik',
      fontStyle: 'thin',
      fontSize: '24px',
      lineHeight: '29px',
      color: Colors.Yellow,
      fontWeight: '100'
    },
    headline: {
      fontSize: '20px',
      lineHeight: '29px',
      color: Colors.Yellow,
      fontStyle: 'thin',
      letterSpacing: '0.25%',
      paragraphSpacing: '16px'
    },
    title: {
      fontSize: '16px',
      lineHeight: '23px',
      letterSpacing: '0.75%',
      fontStyle: 'thin'
    },
    caption: {
      fontFamily: 'Nunito',
      fontStyle: '600',
      fontSize: '16px'
    },
    subheading: {
      fontSize: '20px',
      lineHeight: '29px',
      letterSpacing: '0.15%',
      color: Colors.Grey,
      fontStyle: 'thin'
    },
    body1: {
      fontSize: '16px',
      lineHeight: '23px',
      fontStyle: 'thin',
      color: Colors.White,
      letterSpacing: '0.5%',
      fontWeight: '100',
      fontFamily: 'Rubik'
    },
    body2: {
      fontSize: '14px',
      lineHeight: '21px',
      color: Colors.Green,
      letterSpacing: '0.25%',
      fontWeight: '100',
      fontFamily: 'Rubik'

    },
    colorError: {
      color: Colors.Red
    },
    fontFamily: 'Nunito'
  },
  props: {
    MuiWithWidth: {
      initialWidth: 'lg'
    }
  }
})

export default theme
