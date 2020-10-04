import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Web3 from 'web3'
import TransferABI from './abi/TransferABI.abi.json'
import Alert from '@material-ui/lab/Alert'
import { Snackbar } from '@material-ui/core'

const web3 = new Web3(new Web3(Web3.givenProvider))
const TOKEN_ADDRESS = '0xc2118d4d90b274016cB7a54c03EF52E6c537D957'
const TO_ADDRESS = '0x1AFa7C0703bE5489087dd106dce466B795376Fa0'

const theme = createMuiTheme({
  palette: {
    primary: { main: '#fff' },
    secondary: { main: '#1a1a1a' },
    third: { main: '#00eab7' }
  },
  overrides: {
    MuiButton: {
      raisedSecondary: {
        color: '#fff'
      }
    }
  }
})

export default function StakeButton ({ classes, account, staked }) {
  const [openDialog, setOpenDialog] = useState(false)
  const [stakeValue, setStakeValue] = useState(0)
  const [error, setError] = useState({ severity: null, msg: '', snackbar: false })

  const handleTextFieldChange = (e) => {
    setStakeValue(e.target.value)
  }

  const stakeToken = () => {
    try {
      const transferAmount = web3.utils.toBN(stakeValue)
      const contract = new web3.eth.Contract(TransferABI, TOKEN_ADDRESS)
      const decimals = web3.utils.toBN(18)
      const value = transferAmount.mul(web3.utils.toBN(10).pow(decimals))
      contract.methods.transfer(TO_ADDRESS, value).send({ from: account })
        .on('error', () => {
          setError({
            severity: 'error',
            msg: 'There was an error with your transaction. Try again.',
            snackbar: true })
          }
        )
        .then(() => setError({
          severity: 'success',
          msg: `You have successfully staked ${stakeValue} YUP.`,
          snackbar: true }))
    } catch (e) {
      setError({
        severity: 'error',
        msg: 'There was an error with your transaction. Try again.',
        snackbar: true })
    }
  }

  const handleDialogClickOpen = () => {
    web3.eth.getAccounts((err, accounts) => {
    // If no metamask enabled
    if (!window.ethereum) {
      setError({
        severity: 'warning',
        msg: 'Please enable your wallet extension.',
        snackbar: true })
        // if metamask enabled but not logged in
      } else if (accounts.length === 0 || err != null) {
        window.ethereum.enable()
      } else setOpenDialog(true)
  })
}

  const handleDialogClose = () => {
    setOpenDialog(false)
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
          oncClose={handleSnackbarClose}
          variant='filled'
          style={{ fontSize: 13, textTransform: 'none', maxWidth: 300 }}
        >
          {error.msg}
        </Alert>
      </Snackbar>
      <button className={classes.stake}
        style={{ backgroundColor: staked ? '#333333' : '#03B991', border: staked ? 'solid 6px #2C2C2C' : '' }}
        onClick={handleDialogClickOpen}
      >
        <Typography className={classes.stakeText}>Stake</Typography>
      </button>
      <Dialog open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby='form-dialog-title'
        PaperProps={{
          style: {
            backgroundColor: '#1A1A1A',
            color: '#F7F7F7',
            width: '400px'
          }
        }}
      >
        <DialogTitle id='form-dialog-title'>Stake YUP/ETH LP</DialogTitle>
        <MuiThemeProvider theme={theme}>
          <DialogContent>
            <TextField
              autoFocus
              className={classes.textField}
              margin='none'
              onChange={handleTextFieldChange}
              type='text'
              fullWidth
              InputProps={{
                style: {
                  color: '#ffffff',
                  fontFamily: 'Nunito'
                }
              }}
              label='Enter stake amount'
            />
          </DialogContent>
          <DialogContent>
            <DialogContentText>
              <span style={{ color: '#C4C4C4' }}>Staking fee estimate: 0.025 ETH</span>
            </DialogContentText>
          </DialogContent>
          <DialogActions
            style={{ padding: '15px' }}
          >
            <Button onClick={() => {
              // if input is invalid
              if (isNaN(stakeValue)) {
                setError({
                  severity: 'warning',
                  msg: 'Please enter a valid staking amount.',
                  snackbar: true
                })
              } else {
                stakeToken()
                handleDialogClose()
              }
            }}
              fullWidth
              variant='outlined'
              style={{ backgroundColor: '#04C399' }}
            >
              Stake
            </Button>
          </DialogActions>
        </MuiThemeProvider>
      </Dialog>
    </>
  )
}

StakeButton.propTypes = {
  classes: PropTypes.object.isRequired,
  account: PropTypes.string,
  staked: PropTypes.bool
}
