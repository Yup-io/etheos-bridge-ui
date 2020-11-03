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
import ERC20ABI from './abi/ERC20ABI.abi.json'
import Alert from '@material-ui/lab/Alert'
import numeral from 'numeral'
import { transfer } from '../../eos/actions'
/* eslint-disable no-unused-vars */
import axios from 'axios'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const web3 = new Web3(new Web3(Web3.givenProvider))
// NEEDS TO BE UPDATED
const { ETH_TOKEN_CONTRACT, BRIDGE_FEE, BACKEND_API } = process.env
// fetch from api
const MINIMUM_BRIDGE = 10

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
  },
  disclaimerText: {
    color: '#C4C4C4',
    fontWeight: '300'
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

const YupBridge = ({ classes, scatter, scatterAccount }) => {
  const { account } = useWeb3React()
  const [token, setToken] = useState('YUP')
  const [chain, setChain] = useState('')
  const [sendBal, setSendBal] = useState(0.0000)
  const [accountBal, setAccountBal] = useState(0.000)
  const [memo, setMemo] = useState('')
  const [error, setError] = useState({ severity: 'warning', msg: 'This is an experimental technology. Use with caution!', snackbar: true })
  const [bridgeFee, setBridgeFee] = useState(0.0000)
  const [totalFee, setTotalFee] = useState(0.0000)
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    setChain(account ? 'EOS' : 'ETH')
    const bridge = account ? 0.0000 : BRIDGE_FEE
    setBridgeFee(bridge)
    fetchAndSetBalance()
  }, [account, scatter])

  const handleBalanceChange = (e) => {
    const bal = parseFloat(e.target.value)
    setSendBal(bal)
    const bridge = account ? 0.0000 : BRIDGE_FEE
    setBridgeFee(bridge)
    const total = chain === account ? bal : bal + parseFloat(bridgeFee)
    const parseFee = parseFloat(numeral(total).format('0,0.0000'))
    setTotalFee(parseFee)
  }

  const fetchAndSetBalance = async () => {
    try {
      if (scatterAccount) {
        const { data } = await axios.get(`${BACKEND_API}/levels/user/${scatterAccount.name}`)
        setAccountBal(data.balance.YUP)
      } else if (account) {
        const yupETHTokenInstance = new web3.eth.Contract(ERC20ABI, ETH_TOKEN_CONTRACT)
        const ERC20YUPbalance = await yupETHTokenInstance.methods.balanceOf(account).call() * Math.pow(10, -18)
        setAccountBal(ERC20YUPbalance)
      } else {
        setAccountBal(0.00)
    }
   } catch (err) {
      console.error('ERROR FETCHING BALANCE', err)
      setAccountBal(0.00)
    }
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
    let txRes
    try {
      if (sendBal > accountBal) {
        setError({
          severity: 'error',
          msg: `Please enter a valid amount.`,
          snackbar: true })
          return
      }
      // IF CONNECTED WITH METAMASK
      if (account) {
        const transferAmount = web3.utils.toWei(totalFee.toString())
        const contract = new web3.eth.Contract(TransferABI, ETH_TOKEN_CONTRACT)
        const value = web3.utils.toBN(transferAmount)
        const memoByte = web3.utils.asciiToHex(memo)
        txRes = await contract.methods.sendToken(value, memoByte).send({ from: account })
          .on('error', snackbarErrorMessage())

      // IF CONNECTED WITH SCATTER
      } else if (scatterAccount) {
          const txData = {
            amount: sendBal,
            asset: token,
            recipient: memo
          }
          txRes = await transfer(scatterAccount, txData)
        }
        txRes == null ? snackbarErrorMessage() : snackbarSuccessMessage()
      } catch (e) {
        snackbarErrorMessage()
    }
  }

  const snackbarSuccessMessage = () => {
    setError({
      severity: 'success',
      msg: `You have successfully transferred ${sendBal} ${token}.`,
      snackbar: true })
  }

  const snackbarErrorMessage = () => {
    setError({
      severity: 'error',
      msg: 'There was an error with your transaction. Please try again.',
      snackbar: true })
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return
    setError({ snackbar: false })
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Snackbar open={error.snackbar}
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
      <Dialog open='true'
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        PaperProps={{
          style: {
            backgroundColor: '#1A1A1A',
            color: '#F7F7F7',
            width: '400px',
            fontFamily: 'Rubik, sans serif'
          }
        }}
      >
        <DialogTitle id='form-dialog-title'>Success</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.disclaimerText}>
            You have successfully transferred {sendBal} {token}!
          </DialogContentText>
          <DialogContentText className={classes.disclaimerText}>
            <strong style={{ color: 'white' }}><a style={{ color: 'white' }}
              target='_blank'
              href='https://etherscan.io/address/0xc06E095671EF4E48dB25BA20F6D3c8663F039bF8'
                                               >See Address on Etherscan ↗️</a></strong>
          </DialogContentText>
        </DialogContent>
      </Dialog>
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
                <FormHelperText style={{ opacity: '0.7', color: '#C4C4C4' }}>Balance: { numeral(accountBal).format('0,0.00') } </FormHelperText>
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
                <Tooltip placement='bottom-start'
                  title='In order to ensure stability of the bridge, there needs to be a minimum set for bridging'
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

          <Button style={{ pointerEvents: (sendBal >= MINIMUM_BRIDGE) ? 'all' : 'none' }}
            onClick={() => {
            if (isNaN(sendBal)) {
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
