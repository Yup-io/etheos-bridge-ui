import React, { Component } from 'react'
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import Footer from '../Footer/Footer'

const styles = theme => ({
  container: {
    width: '100%',
    maxHeight: '100vh',
    padding: '0px',
    background: '#3A3A3A',
    fontFamily: 'Rubik',
    [theme.breakpoints.down('sm')]: {
      height: '100%'
    }
  },
  bridgeContainer: {
    width: '30%',
    height: '70vh',
    background: '#434343',
    margin: 'auto',
    borderRadius: '20px',
    [theme.breakpoints.down('md')]: {
      width: '50%',
      height: '60vh'
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '700px',
      overflow: 'hidden'
    }
  },
  text: {
    fontSize: '1.5rem',
    color: '#fff',
    fontWeight: '200'
  },
  textField: {
    width: '70px',
    cssUnderline: {
      borderBottomColor: '#ffffff'
    }
  }
})

const theme = createMuiTheme({
  palette: {
    primary: { main: '#fff' },
    secondary: { main: '#1a1a1a' },
    third: { main: '#00eab7' }
  },
  overrides: {
  }
})

class YupBridge extends Component {
  state = {

  }

  handleTextFieldChange = (e) => {
    console.log(e.target.value)
  }

  render () {
    const { classes } = this.props

    return (
      <>
        <div className={classes.container}>
          <div className={classes.bridgeContainer}>
            <MuiThemeProvider theme={theme}>
              <div>
                <Typography className={classes.text}>
                  Send
                </Typography>
                <TextField
                  autoFocus
                  margin='none'
                  onChange={this.handleTextFieldChange}
                  type='text'
                  fullWidth
                  InputProps={{
                    className: classes.textField,
                    style: {
                      color: '#ffffff'
                    }
                  }}
                />
              </div>
              <div>
                <Typography className={classes.text}>
                  to
                </Typography>
              </div>
            </MuiThemeProvider>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

YupBridge.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(YupBridge)
