import React, { useState } from 'react'
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { Grid, MenuItem, FormHelperText, Snackbar } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import Footer from '../Footer/Footer'

import { connect } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'
import TransferABI from './abi/TransferABI.abi.json'
import Alert from '@material-ui/lab/Alert'

const web3 = new Web3(new Web3(Web3.givenProvider))
const TOKEN_ADDRESS = '0xc2118d4d90b274016cB7a54c03EF52E6c537D957'
const TO_ADDRESS = '0xf8b41A391782Be39b7A8c36aA775c675A8368f53'

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
    width: '40%',
    minHeight: '75vh',
    background: '#434343',
    margin: 'auto',
    borderRadius: '20px',
    [theme.breakpoints.down('lg')]: {
      minHeight: '75vh'
    },
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
    minWidth: '125px',
    padding: '0px 25px !important',
    [theme.breakpoints.down('lg')]: {
      minWidth: '110px'
    },
    [theme.breakpoints.down('md')]: {
      minWidth: '100px',
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
    width: '125px',
    fontSize: '1.2rem',
    color: '#fff',
    cssUnderline: {
      borderBottomColor: '#ffffff'
    },
    [theme.breakpoints.down('lg')]: {
      width: '110px'
    },
    [theme.breakpoints.down('md')]: {
      width: '100px'
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
  memoItem: {
    margin: 'auto'
  },
  acctField: {
    width: '25vw',
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
    width: '90%',
    height: '60px',
    display: 'flex',
    borderRadius: '15px',
    margin: '7% auto auto auto',
    '&:hover': {
      backgroundColor: '#04C399',
      opacity: '0.7'
    },
    [theme.breakpoints.down('md')]: {
      margin: '15% auto auto auto'
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

const YupBridge = (props) => {
  const { classes, scatter, scatterAccount } = props
  console.log('SCATTER: ', scatter, scatterAccount)
  const { account } = useWeb3React()

  const [token, setToken] = useState('YUP')
  const [chain, setChain] = useState('ETH')
  const [sendValue, setSendValue] = useState(0)
  const [memo, setMemo] = useState('')
  const [error, setError] = useState({ severity: null, msg: '', snackbar: false })

  const handleBalanceChange = (e) => {
    setSendValue(e.target.value)
    console.log('BALANCE: ' + sendValue)
  }

  const handleAcctChange = (e) => {
    setMemo(e.target.value)
    console.log('SEND TO: ' + memo)
  }

  const handleTokenChange = (e) => {
    setToken(e.target.value)
  }

  const handleChainChange = (e) => {
    setChain(e.target.value)
  }

  const sendToken = () => {
    try {
      const transferAmount = web3.utils.toBN(sendValue)
      const contract = new web3.eth.Contract(TransferABI, TOKEN_ADDRESS)
      const decimals = web3.utils.toBN(18)
      const value = transferAmount.mul(web3.utils.toBN(10).pow(decimals))
      contract.methods.transfer(TO_ADDRESS, value).send({ from: account })
        .on('error', () => {
          setError({
              severity: 'error',
              msg: 'There was an error with your transaction. Please try again.',
              snackbar: true })
          }
        )
        .then(() => setError({
            severity: 'success',
            msg: `You have successfully transfered ${sendValue} ${token}.`,
            snackbar: true }))
    } catch (e) {
      setError({
          severity: 'error',
          msg: 'There was an error with your transaction. Please try again.',
          snackbar: true })
    }
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return
    setError({ snackbar: false })
  }

  return (
    <>
      <Snackbar open={error.snackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={error.msg}
      >
        <Alert severity={error.severity}
          onClose={handleSnackbarClose}
          variant='filled'
          style={{ fontSize: 14, textTransform: 'none', maxWidth: 400 }}
        >
          {error.msg}
        </Alert>
      </Snackbar>
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
                  onChange={handleBalanceChange}
                  type='text'
                  fullWidth
                  InputProps={{
                    className: classes.textField
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
                    value={token}
                    onChange={handleTokenChange}
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
                    value={chain}
                    onChange={handleChainChange}
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
                className={classes.memoItem}
              >
                <TextField
                  autoFocus
                  margin='none'
                  onChange={handleAcctChange}
                  type='text'
                  fullWidth
                  InputProps={{
                    className: classes.acctField
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
            if (isNaN(sendValue)) {
              setError({
                  severity: 'warning',
                  msg: 'Please enter a valid staking amount.',
                  snackbar: true })
            } else {
              sendToken()
            }
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

YupBridge.propTypes = {
  classes: PropTypes.object.isRequired,
  scatter: PropTypes.object,
  scatterAccount: PropTypes.object
}

const mapStateToProps = ({ scatterRequest }) => {
  return { ...scatterRequest }
}

export default connect(mapStateToProps)(withStyles(styles)(YupBridge))
