import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Tooltip, Button, Dialog, DialogTitle, DialogContent, DialogContentText, Typography, Grid } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import { useWeb3React } from '@web3-react/core'
import { useEagerConnect, useInactiveListener } from '../../utils/hooks'
import { injected } from '../../utils/connectors.js'

import { connect } from 'react-redux'
import { loginScatter, logoutScatter, signalConnection } from '../../redux/actions/scatter.actions'
import scatterWallet from '../../eos/scatter/scatter.wallet'

const styles = theme => ({
  connect: {
    backgroundColor: '#505050',
    color: '#FAFAFA',
    borderRadius: '100px',
    margin: '0px 10px 10px 10px',
    padding: '8px 24px',
    fontFamily: 'Rubik',
    fontWeight: '400',
    '&:hover': {
      backgroundColor: '#505050',
      boxShadow: '1px 1px 5px #00eab799, -1px -1px 5px #f890e7aa, inset -3px -3px 10px #6a6a6a33'
    }
  },
  dialog: {
    width: '100%',
    marginLeft: 0,
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: 0,
      width: `100%`
    },
    [theme.breakpoints.up('1600')]: {
      width: '100%',
      marginLeft: 0
    }
  },
  dialogTitleText: {
    fontFamily: 'Rubik',
    fontWeight: '300',
    color: '#ffffff',
    fontSize: '24'
  },
  dialogContentText: {
    fontFamily: 'Rubik',
    fontWeight: '200',
    color: '#ffffff',
    marginTop: '20px'
  },
  primaryBtn: {
    color: '#0a0a0a',
    fontWeight: '500',
    backgroundColor: '#00eab7',
    '&:hover': {
      backgroundColor: '#00bb92'
    }
  },
  linkBtn: {
    color: '#FFFFFF',
    fontWeight: '100',
    textTransform: 'capitalize',
    textDecoration: 'underline'
  },
  desktopDialogContentText: {
    display: 'inline',
    [theme.breakpoints.down('600')]: {
      display: 'none'
    }
  },
  mobileDialogContentText: {
    display: 'inline',
    [theme.breakpoints.up('600')]: {
      display: 'none'
    }
  },
  blockButton: {
    display: 'block',
    backgroundColor: 'transparent',
    color: '#ffffff',
    borderColor: '#6a6a6a',
    width: '100%',
    height: '50px',
    fontWeight: '200',
    fontSize: '14px',
    fontFamily: 'Rubik',
    textAlign: 'start',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#FAFAFA66'
    }
  },
  walletIcon: {
    maxWidth: '6vw',
    width: '22px',
    float: 'right'
  },
  buttonIcon: {
    maxWidth: '3vw',
    width: '15px',
    marginLeft: '5px'
  }
})

const WalletLogin = (props) => {
  const { classes } = props
  const { connector, account, activate, deactivate, active } = useWeb3React()
  const { scatter, scatterAccount, updateScatter, scatterInstall, disconnectScatter } = props

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState()
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || activatingConnector)

  const [dialogOpen, setDialogOpen] = useState(false)

  const handleDialogOpen = () => {
    setDialogOpen(true)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
  }

  const checkScatter = () => {
    (async () => {
      if (scatter == null || scatterAccount == null) {
        try {
          await scatterWallet.detect(updateScatter, scatterInstall)
        } catch (err) {
          if (err.message === 'TWO_SCATTERS_INSTALLED') {
            console.error('Both Scatter Desktop and Extension are installed. Close or uninstall one to continue')
          }
        }
      } else {
        disconnectScatter()
      }
    })()
  }

  return (
    <div>
      {account && active && !scatter && (
        <Tooltip
          placement='bottom'
          title={<h2 color='#fff'
            style={{ fontSize: '12px', fontWeight: '500' }}
                 >Disconnect Wallet</h2>}
        >
          <Box>
            <Button color='inherit'
              className={classes.connect}
              onClick={() => {
                deactivate()
                handleDialogOpen()
              }}
            >
              {account.substring(0, 8)}...
              <img className={classes.buttonIcon}
                src='images/icons/metamask-fox.svg'
              />
            </Button>
          </Box>
        </Tooltip>
      )}
      {scatter && scatter.identity && (
        <Tooltip
          placement='bottom'
          title={<h2 color='#fff'
            style={{ fontSize: '12px', fontWeight: '500' }}
                 >Disconnect Wallet</h2>}
        >
          <Box>
            <Button color='inherit'
              className={classes.connect}
              onClick={() => {
                checkScatter()
                handleDialogOpen()
              }}
            >
              {scatter.identity.name}
              <img className={classes.buttonIcon}
                src='images/logos/yuplogowhite.png'
              />
            </Button>
          </Box>
        </Tooltip>
      )}
      {!account && !active && !scatter && (
        <div>
          <Button className={classes.connect}
            onClick={handleDialogOpen}
          >
            Connect Wallet
          </Button>
          <Dialog open={dialogOpen}
            onClose={handleDialogClose}
            aria-labelledby='form-dialog-title'
            className={classes.dialog}
            PaperProps={{
              style: {
                backgroundColor: '#1a1a1a',
                boxShadow: '2px 2px 100px #313131',
                width: '80%',
                marginTop: '-25vh',
                maxWidth: '315px',
                borderRadius: '12px'
              }
            }}
          >
            <DialogTitle className={classes.dialogTitle}
              id='form-dialog-title'
            >
              <Grid container
                justify='space-between'
              >
                <Grid item>
                  <Typography
                    align='left'
                    className={classes.dialogTitleText}
                  >
                    Connect Wallet
                  </Typography>
                </Grid>
              </Grid>
            </DialogTitle>
            <DialogContent>
              <Grid container
                direction='column'
                justify='space-around'
                alignItems='stretch'
                spacing={1}
              >
                <Grid item>
                  <Button className={classes.blockButton}
                    variant='outlined'
                    onClick={() => {
                      setActivatingConnector(injected)
                      activate(injected)
                      handleDialogClose()
                    }}
                  >
                    <Grid container
                      direction='row'
                      justify='space-between'
                      alignItems='center'
                    >
                      <Grid item>
                        MetaMask
                      </Grid>
                      <Grid item>
                        <img className={classes.walletIcon}
                          src='images/icons/metamask-fox.svg'
                        />
                      </Grid>
                    </Grid>
                  </Button>
                </Grid>
                <Grid item>
                  <Button className={classes.blockButton}
                    variant='outlined'
                    onClick={() => {
                      checkScatter()
                    }}
                  >
                    <Grid container
                      direction='row'
                      justify='space-between'
                      alignItems='center'
                    >
                      <Grid item>
                        Yup
                      </Grid>
                      <Grid item>
                        <img className={classes.walletIcon}
                          src='images/logos/yuplogowhite.png'
                        />
                      </Grid>
                    </Grid>
                  </Button>
                </Grid>
              </Grid>
              <DialogContentText />
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  )
}

WalletLogin.propTypes = {
  classes: PropTypes.object.isRequired,
  scatter: PropTypes.object,
  scatterInstall: PropTypes.func,
  updateScatter: PropTypes.func,
  scatterAccount: PropTypes.object,
  disconnectScatter: PropTypes.func
}

const mapStateToProps = ({ scatterRequest }) => {
  return { ...scatterRequest }
}

const mapDispatchToProps = dispatch => {
  return {
    scatterInstall: (bool) => dispatch(signalConnection(bool)),
    updateScatter: (scatter, scatterAccount) => dispatch(loginScatter(scatter, scatterAccount)),
    disconnectScatter: () => dispatch(logoutScatter())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WalletLogin))
