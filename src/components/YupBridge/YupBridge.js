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
import numeral from 'numeral'

const web3 = new Web3(new Web3(Web3.givenProvider))
const TOKEN_ADDRESS = '0xc2118d4d90b274016cB7a54c03EF52E6c537D957'
const TO_ADDRESS = '0xf8b41A391782Be39b7A8c36aA775c675A8368f53'
const BRIDGE_FEE = 0.05

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
    width: '35%',
    maxWidth: '550px',
    background: '#434343',
    margin: 'auto',
    borderRadius: '20px',
    padding: '0px 0px 25px 0px',
    [theme.breakpoints.down('md')]: {
      width: '60%'
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      minHeight: '50vh'
    }
  },
  grid: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3)
    },
    maxWidth: '100%'
  },
  textItem: {
    width: '75px'
  },
  text: {
    width: '75px',
    fontSize: '1.5rem',
    color: '#fff',
    fontWeight: '100',
    fontFamily: 'Rubik'
  },
  textField: {
    fontSize: '1.5rem',
    lineHeight: '1.1875em',
    fontFamily: 'Rubik',
    [theme.breakpoints.down('lg')]: {
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2rem'
    },
    [theme.breakpoints.down('xs')]: {
    }
  },
  formControl: {
    minWidth: 100,
    marginRight: '0px',
    [theme.breakpoints.down('xs')]: {
      minWidth: 20
    }
  },
  menu: {
    fontFamily: 'Rubik !important'
  },
  memoItem: {
    margin: 'auto',
    padding: theme.spacing(4),
    width: '100%'
  },
  acctField: {
    fontFamily: 'Rubik',
    borderRadius: '15px',
    [theme.breakpoints.down('md')]: {
    },
    [theme.breakpoints.down('xs')]: {
    }
  },
  feeGrid: {
    margin: 'auto',
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1)
    }
  },
  feeText: {
    fontSize: '1.1rem',
    color: '#C4C4C4',
    fontWeight: '100',
    fontFamily: 'Rubik, sans-serif',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.9rem'
    }

  },
  sendBtn: {
    backgroundColor: '#04C399',
    width: '90%',
    height: '60px',
    fontSize: '1.2rem',
    color: '#fff',
    display: 'flex',
    borderRadius: '15px',
    margin: '7% auto auto auto',
    boxShadow: '0 0 20px #A3A3A355',
    '&:hover': {
      backgroundColor: '#04C399',
      opacity: '0.8',
      boxShadow: '0 0 20px #A3A3A380'
    },
    [theme.breakpoints.down('md')]: {
      margin: '10% auto auto auto',
      bottom: '10px'
    }
  }
})

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: '#fff' },
    secondary: { main: '#fff' },
    third: { main: '#00eab7' }
  },
  overrides: {
    container: {
      fontFamily: 'Rubik, sans-serif'
    }
  }
})

const YupBridge = (props) => {
  const { classes, scatter, scatterAccount } = props
  console.log('SCATTER: ', scatter, scatterAccount)
  const { account } = useWeb3React()

  const [token, setToken] = useState('YUP')
  const [chain, setChain] = useState('ETH')
  const [sendValue, setSendValue] = useState(0.0)
  const [memo, setMemo] = useState('')
  const [error, setError] = useState({ severity: null, msg: '', snackbar: false })
  const [transactFee, setTransactFee] = useState(0.0)
  const [bridgeFee, setBridgeFee] = useState(0.0)

  const handleBalanceChange = (e) => {
    setSendValue(e.target.value)
    const transact = e.target.value ? parseFloat(e.target.value) : 0.0
    setTransactFee(transact)
    setBridgeFee(parseFloat(numeral(e.target.value * BRIDGE_FEE).format('0,0.00')))
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
      const totalFee = parseInt(numeral(transactFee + bridgeFee).format('0,0.00'))
      const transferAmount = web3.utils.toBN(totalFee)
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

  const fetchTotalFee = () => {
    const fee = transactFee + bridgeFee
    const parseFee = parseFloat(numeral(fee).format('0,0.00'))
    return parseFee
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
              justifyContent='flex-start'
              direction='row'
              spacing={1}
            >
              <Grid item
                xs={3}
                sm={2}
                className={classes.textItem}
                style={{ marginBottom: '20px',
                [theme.breakpoints.down('sm')]: {
                  height: '100%'
                } }}
              >
                <Typography className={classes.text}>
                  Send
                </Typography>
              </Grid>
              <Grid item
                xs={4}
                sm={3}
              >
                <TextField
                  autoFocus
                  margin='none'
                  onChange={handleBalanceChange}
                  type='text'
                  placeholder='0.00'
                  InputProps={{
                    className: classes.textField
                  }}
                  style={{ }}
                />
                <FormHelperText style={{ opacity: '0.7', color: '#C4C4C4' }}>Balance:</FormHelperText>
              </Grid>
              <Grid item
                xs={5}
                sm={3}
              >
                <FormControl className={classes.formControl}>
                  <Select
                    inputProps={{
                      className: classes.textField
                    }}
                    MenuProps={{
                     getContentAnchorEl: null,
                     anchorOrigin: {
                       vertical: 'bottom',
                       horizontal: 'left'
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
                    >YUP</MenuItem>
                    <MenuItem
                      className={classes.menu}
                      value='YUPETH LP'
                    >YUP/ETH LP</MenuItem>
                  </Select>
                  <FormHelperText style={{ opacity: '0.7', color: '#C4C4C4' }}>Token</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container
              className={classes.grid}
              alignItems='center'
              direction='row'
            >
              <Grid item
                xs={3}
                sm={2}
                className={classes.textItem}
              >
                <Typography className={classes.text}>
                  to
                </Typography>
              </Grid>
              <Grid item
                xs={3}
                sm={2}
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
                       horizontal: 'left'
                     }
                   }}
                    value={chain}
                    onChange={handleChainChange}
                    margin='none'
                    size='medium'
                    style={{ paddingTop: '2px' }}
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
              spacing={0}
            >
              <Grid item
                classes={{
                  root: classes.memoItem
                }}
              >
                <TextField
                  autoFocus
                  margin='none'
                  variant='outlined'
                  onChange={handleAcctChange}
                  type='text'
                  fullWidth
                  InputProps={{
                    className: classes.acctField
                  }}
                  placeholder='Address'
                />
              </Grid>
            </Grid>

            <Grid container
              className={classes.feeGrid}
              alignItems='center'
              direction='row'
              style={{ marginTop: '20px', fontFamily: 'Rubik' }}
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
                >{transactFee} {token}</Typography>
              </Grid>
            </Grid>

            <Grid container
              className={classes.feeGrid}
              alignItems='center'
              direction='row'
            >
              <Grid item
                xs={6}
              >
                <Typography className={classes.feeText}>Bridge Fee ({BRIDGE_FEE * 100}%)</Typography>
              </Grid>
              <Grid item
                xs={6}
              >
                <Typography className={classes.feeText}
                  style={{ textAlign: 'right' }}
                >{bridgeFee} {token}</Typography>
              </Grid>
            </Grid>

            <Grid container
              className={classes.feeGrid}
              alignItems='center'
              direction='row'
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
                ><strong>{fetchTotalFee()} {token}</strong></Typography>
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
