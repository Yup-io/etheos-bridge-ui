import React, { Component } from 'react'
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { Grid, MenuItem, FormHelperText } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import Footer from '../Footer/Footer'

const styles = theme => ({
  container: {
    width: '100%',
    padding: '0px',
    background: '#3A3A3A',
    fontFamily: 'Rubik',
    [theme.breakpoints.down('sm')]: {
      height: '100%'
    }
  },
  bridgeContainer: {
    width: '30%',
    minHeight: '70vh',
    background: '#434343',
    margin: 'auto',
    borderRadius: '20px',
    [theme.breakpoints.down('md')]: {
      width: '60%'
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  grid: {
    padding: '5% 7%'
  },
  textItem: {
    width: '75px'
  },
  gridItem: {
    minWidth: '110px',
    padding: '0px 25px !important',
    [theme.breakpoints.down('md')]: {
      padding: '0px 15px !important'
    }
  },
  text: {
    width: '75px',
    fontSize: '1.5rem',
    color: '#fff',
    fontWeight: '100'
  },
  textField: {
    width: '110px',
    fontSize: '1.2rem',
    color: '#fff',
    cssUnderline: {
      borderBottomColor: '#ffffff'
    }
  },
  formControl: {
    minWidth: 100,
    marginRight: '10px',
    [theme.breakpoints.down('xs')]: {
      minWidth: 20
    }
  },
  menu: {

  },
  acctField: {
    width: '20vw',
    color: '#fff',
    [theme.breakpoints.down('md')]: {
      width: '40vw'
    }
  },
  feeGrid: {
    padding: '1% 7%',
    margin: 'auto'
  },
  feeText: {
    fontSize: '1.1rem',
    color: '#C4C4C4',
    fontWeight: '200'
  },
  sendBtn: {
    backgroundColor: '#04C399',
    width: '70%',
    height: '50px',
    display: 'flex',
    margin: '10% auto auto auto',
    '&:hover': {
      backgroundColor: '#04C399',
      opacity: '0.7'
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
    token: 'YUP',
    block: 'Ethereum'
  }

  handleBalanceChange = (e) => {
    console.log(e.target.value)
  }

  handleAcctChange = (e) => {
    console.log(e.target.value)
  }

  handleTokenChange = (e) => {
    const token = e.target.value
    this.setState({
      token
    })
    console.log(this.state.token)
  }

  handleBlockChange = (e) => {
    const block = e.target.value
    this.setState({
      block
    })
    console.log(this.state.block)
  }

  render () {
    const { classes } = this.props

    return (
      <>
        <div className={classes.container}>
          <div className={classes.bridgeContainer}>
            <MuiThemeProvider theme={theme}>
              <Grid container
                className={classes.grid}
                alignItems='center'
                direction='row'
                spacing={2}
              >
                <Grid item
                  className={classes.textItem}
                  style={{ marginBottom: '15px' }}
                >
                  <Typography className={classes.text}>
                    Send
                  </Typography>
                </Grid>
                <Grid item
                  className={classes.gridItem}
                >
                  <TextField
                    autoFocus
                    margin='none'
                    onChange={this.handleBalanceChange}
                    type='text'
                    fullWidth
                    InputProps={{
                      className: classes.textField,
                      style: {
                        color: '#ffffff'
                      }
                    }}
                  />
                  <FormHelperText style={{ opacity: '0.7', color: '#C4C4C4' }}>Balance:</FormHelperText>
                </Grid>
                <Grid item
                  className={classes.gridItem}
                >
                  <FormControl className={classes.formControl}>
                    <Select
                      className={classes.textField}
                      inputProps={{
                        className: classes.textField
                      }}
                      MenuProps={{
                       getContentAnchorEl: null,
                       anchorOrigin: {
                         vertical: 'bottom',
                         horizontal: 'center'
                       }
                     }}
                      value={this.state.token}
                      onChange={this.handleTokenChange}
                      margin='none'
                      size='medium'
                    >
                      <MenuItem
                        className={classes.menu}
                        value='YUP'
                      >Yup</MenuItem>
                      <MenuItem
                        className={classes.menu}
                        value='YUPETH LP'
                      >Yup/Eth LP</MenuItem>
                      <MenuItem
                        className={classes.menu}
                        value='ETH'
                      >Eth</MenuItem>
                    </Select>
                    <FormHelperText style={{ opacity: '0.7', color: '#C4C4C4' }}>Token</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container
                className={classes.grid}
                alignItems='center'
                direction='row'
                spacing={2}
              >
                <Grid item
                  className={classes.textItem}
                >
                  <Typography className={classes.text}>
                    to
                  </Typography>
                </Grid>
                <Grid item
                  className={classes.gridItem}
                >
                  <FormControl className={classes.formControl}>
                    <Select
                      className={classes.textField}
                      inputProps={{
                        className: classes.textField
                      }}
                      MenuProps={{
                       getContentAnchorEl: null,
                       anchorOrigin: {
                         vertical: 'bottom',
                         horizontal: 'center'
                       }
                     }}
                      value={this.state.block}
                      onChange={this.handleBlockChange}
                      margin='none'
                      size='medium'
                    >
                      <MenuItem
                        className={classes.menu}
                        value='ETH'
                      >Ethereum</MenuItem>
                      <MenuItem
                        className={classes.menu}
                        value='EOS'
                      >EOS</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container
                className={classes.grid}
                alignItems='center'
                direction='row'
                spacing={2}
              >
                <Grid item
                  className={classes.textItem}
                />
                <Grid item
                  className={classes.gridItem}
                >
                  <TextField
                    autoFocus
                    margin='none'
                    onChange={this.handleAcctChange}
                    type='text'
                    fullWidth
                    InputProps={{
                      className: classes.acctField,
                      style: {
                        color: '#ffffff'
                      }
                    }}
                  />
                </Grid>
              </Grid>

              <Grid container
                className={classes.feeGrid}
                alignItems='center'
                direction='row'
                spacing={2}
              >
                <Grid item
                  xs={6}
                >
                  <Typography className={classes.feeText}>Transaction Fee</Typography>
                </Grid>
                <Grid item
                  xs={6}
                >
                  <Typography className={classes.feeText}
                    style={{ textAlign: 'right' }}
                  >43.054 YUP</Typography>
                </Grid>
              </Grid>

              <Grid container
                className={classes.feeGrid}
                alignItems='center'
                direction='row'
                spacing={2}
              >
                <Grid item
                  xs={6}
                >
                  <Typography className={classes.feeText}>Bridge Fee</Typography>
                </Grid>
                <Grid item
                  xs={6}
                >
                  <Typography className={classes.feeText}
                    style={{ textAlign: 'right' }}
                  >4.054 YUP</Typography>
                </Grid>
              </Grid>

              <Grid container
                className={classes.feeGrid}
                alignItems='center'
                direction='row'
                spacing={2}
              >
                <Grid item
                  xs={6}
                >
                  <Typography className={classes.feeText}
                    style={{ color: '#fff' }}
                  ><strong>Total</strong></Typography>
                </Grid>
                <Grid item
                  xs={6}
                >
                  <Typography className={classes.feeText}
                    style={{ color: '#fff', textAlign: 'right' }}
                  ><strong>47.054 YUP</strong></Typography>
                </Grid>
              </Grid>
            </MuiThemeProvider>

            <Button onClick={() => {
              // if (isNaN(stakeValue)) {
              //   setError({
              //     severity: 'warning',
              //     msg: 'Please enter a valid staking amount.',
              //     snackbar: true
              //   })
              // } else {
              //   stakeToken()
              //   handleDialogClose()
              // }
            }}
              className={classes.sendBtn}
            >
              Send
            </Button>
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
