import React, { useState, useEffect } from 'react'
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { Grid, MenuItem, FormHelperText, Snackbar, Tooltip } from '@material-ui/core'
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
import CircularProgress from '@material-ui/core/CircularProgress'

import { transfer } from '../../eos/actions'

const web3 = new Web3(new Web3(Web3.givenProvider))
// NEEDS TO BE UPDATED
const { ETH_TOKEN_CONTRACT, BRIDGE_FEE, MINIMUM_BRIDGE } = process.env
const ERROR_MSG = 'There was an error with your transaction. Please try again'
const DISCLAIMER = 'This is an experimental technology. Use with caution!'
const MIN_BRIDGE_MSG = 'A minimum is set to ensure bridge stability'
const INVALID_MSG = 'Please enter a valid staking amount'

const styles = theme => ({
  snackbar: {
    fontFamily: 'Rubik'
  },
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

const VoteLoader = props => (
  <CircularProgress size={35}
    style={{ color: '#fff' }}
  />
)

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

const YupBridge = ({ classes, scatter, scatterAccount }) => {
  const { account } = useWeb3React()

  const [token, setToken] = useState('YUP')
  const [chain, setChain] = useState('')
  useEffect(() => {
    setChain(account ? 'EOS' : 'ETH')
    const bridge = account ? 0.0 : BRIDGE_FEE
    setBridgeFee(bridge)
    const total = account ? sendBal : sendBal + parseFloat(bridgeFee)
    setTotalFee(total.toFixed(4))
  }, [account, scatterAccount])
  const [sendBal, setSendBal] = useState(0.0)
  const [memo, setMemo] = useState('')
  const [error, setError] = useState({ severity: 'warning', msg: DISCLAIMER, snackbar: true })
  const [bridgeFee, setBridgeFee] = useState(0.0)
  const [totalFee, setTotalFee] = useState(0.0)
  const [loading, setLoading] = useState(false)

  const handleBalanceChange = (e) => {
    const bal = parseFloat(e.target.value) || 0.0
    setSendBal(bal)
    const total = account ? bal : bal + parseFloat(bridgeFee)
    setTotalFee(total.toFixed(4))
  }

  const handleAcctChange = (e) => {
    setMemo(e.target.value)
  }

  const handleTokenChange = (e) => {
    setToken(e.target.value)
  }

  const handleChainChange = (e) => {
    setChain(e.target.value)
  }

  const sendToken = async () => {
    try {
      console.log(chain)
      // send with MetaMask
      if (chain === 'EOS') {
        if (!account) {
          setError({
            severity: 'warning',
            msg: 'Please connect your MetaMask wallet',
            snackbar: true })
          return
        }
        const transferAmount = web3.utils.toWei(totalFee.toString())
        const contract = new web3.eth.Contract(TransferABI, ETH_TOKEN_CONTRACT)
        const value = web3.utils.toBN(transferAmount)
        const memoByte = web3.utils.asciiToHex(memo)
        console.log('AMOUNT: ', value)
        console.log('MEMO: ', memoByte)
        setLoading(true)
        contract.methods.sendToken(value, memoByte).send({ from: account })
          .on('error', () => {
            setLoading(false)
            setError({
              severity: 'error',
              msg: ERROR_MSG,
              snackbar: true })
            }
          )
          .then(() => {
            setLoading(false)
            setError({
              severity: 'success',
              msg: `You have successfully transfered ${sendBal} ${token}`,
              snackbar: true })
            }
          )
      } else if (chain === 'ETH') {
          if (!scatterAccount) {
            setError({
              severity: 'warning',
              msg: 'Please connect your Scatter wallet',
              snackbar: true })
            return
          }
          // send with Scatter
          const txData = {
            amount: sendBal,
            asset: token,
            recipient: memo
          }
          setLoading(true)
          const txStatus = await transfer(scatterAccount, txData)
          setLoading(false)
          if (!txStatus) {
            setError({
                severity: 'error',
                msg: ERROR_MSG,
                snackbar: true })
          } else {
            setError({
              severity: 'success',
              msg: `You have successfully transfered ${sendBal} ${token}`,
              snackbar: true })
          }
        }
      } catch (e) {
        setLoading(false)
        setError({
          severity: 'error',
          msg: ERROR_MSG,
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
        className={classes.snackbar}
        autoHideDuration={4000}
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
              justifycontent='flex-start'
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
                      value='YUPETH'
                    >YUP-ETH LP</MenuItem>
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
              style={{ display: account ? 'none' : '' }}
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
                ><strong>{totalFee} {token}</strong></Typography>
              </Grid>
            </Grid>

            <Grid container
              className={classes.feeGrid}
              alignItems='center'
              direction='row'
              style={{ opacity: '0.3' }}
            >
              <Grid item
                xs={6}
              >
                <Tooltip
                  placement='bottom-start'
                  title={<h color='#fff'
                    style={{ fontSize: '14px' }}
                         >{MIN_BRIDGE_MSG}</h>}
                >
                  <Typography className={classes.feeText}>Minimum to bridge
                  </Typography>
                </Tooltip>
              </Grid>
              <Grid item
                xs={6}
              >
                <Typography className={classes.feeText}
                  style={{ textAlign: 'right' }}
                >{MINIMUM_BRIDGE} {token}</Typography>
              </Grid>
            </Grid>
          </MuiThemeProvider>

          <Button style={{ pointerEvents: (sendBal < MINIMUM_BRIDGE) ? 'none' : '' }}
            onClick={() => {
            if (isNaN(sendBal)) {
              setError({
                  severity: 'warning',
                  msg: INVALID_MSG,
                  snackbar: true })
            } else {
              sendToken()
            }
          }}
            className={classes.sendBtn}
          >
            {
              loading
                ? <VoteLoader />
              : <Typography>Send</Typography>
            }
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
