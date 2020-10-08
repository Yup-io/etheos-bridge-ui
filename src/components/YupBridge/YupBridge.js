import React, { useState, useEffect } from 'react'
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

import { transfer } from '../../eos/actions'

const web3 = new Web3(new Web3(Web3.givenProvider))
const ETH_BRIDGE_ADDRESS = '0xc2118d4d90b274016cB7a54c03EF52E6c537D957'
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
    minHeight: '70vh',
    background: '#434343',
    margin: 'auto',
    borderRadius: '20px',
    padding: '0px 0px 25px 0px',
    [theme.breakpoints.down('md')]: {
      width: '60%'
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      minHeight: '50vh'
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
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: '75px'
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
    fontFamily: 'Rubik',
    [theme.breakpoints.down('lg')]: {
      width: '110px'
    },
    [theme.breakpoints.down('sm')]: {
      width: '100px'
    },
    [theme.breakpoints.down('xs')]: {
      width: '75px'
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
    fontFamily: 'Rubik !important'
  },
  memoItem: {
    margin: 'auto'
  },
  acctField: {
    width: '20vw',
    fontFamily: 'Rubik',
    [theme.breakpoints.down('md')]: {
      width: '40vw'
    },
    [theme.breakpoints.down('xs')]: {
      width: '80vw'
    }
  },
  feeGrid: {
    padding: '1% 7%',
    margin: 'auto'
  },
  feeText: {
    fontSize: '1.1rem',
    color: '#C4C4C4',
    fontWeight: '100'
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

  }
})

const YupBridge = (props) => {
  const { classes, scatter, scatterAccount } = props
  console.log('SCATTER: ', scatter, scatterAccount)
  const { account } = useWeb3React()

  const [token, setToken] = useState('YUP')
  const [chain, setChain] = useState('')
  useEffect(() => {
    setChain(account ? 'EOS' : 'ETH')
  }, [account, scatter])
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

  const sendToken = async () => {
    const totalFee = parseInt(numeral(transactFee + bridgeFee).format('0,0.00'))
    try {
      // send with MetaMask
      if (account) {
        const transferAmount = web3.utils.toBN(totalFee)
        const contract = new web3.eth.Contract(TransferABI, ETH_BRIDGE_ADDRESS)
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
      } else if (scatterAccount) {
          // send with Scatter
          const txData = {
            amount: totalFee,
            asset: token,
            recipient: memo
          }
          console.log('SCATTER TRANSFER: ', txData)
          await transfer(scatterAccount, txData)
        }
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
                  placeholder='0.00'
                  InputProps={{
                    className: classes.textField
                  }}
                  style={{ }}
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
                    style={{ textTransform: 'uppercase' }}
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
                       horizontal: 'left'
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
                      style={{ pointerEvents: account ? 'none' : '' }}
                    >Ethereum</MenuItem>
                    <MenuItem
                      className={classes.menu}
                      value='EOS'
                      style={{ pointerEvents: scatterAccount ? 'none' : '' }}
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
                  placeholder='Address'
                />
              </Grid>
            </Grid>

            <Grid container
              className={classes.feeGrid}
              alignItems='center'
              direction='row'
              spacing={2}
              style={{ marginTop: '50px' }}
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
              spacing={2}
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
