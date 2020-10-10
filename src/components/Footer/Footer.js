import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const CONTRACTS_LINK = '#'
const EOS_LINK = '#'
const DISCORD_LINK = 'https://discord.gg/KneTzU4'
const YUP_LINK = 'http://yup.io/'

const styles = theme => ({
  footer: {
    fontFamily: 'Rubik',
    backgroundColor: 'transparent',
    textAlign: 'center',
    borderRadius: '20px',
    padding: '12px 0px'
  },
  link: {
    color: '#C4C4C4',
    margin: '10px',
    fontSize: '0.8rem',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  disclaimerText: {
    color: '#C4C4C4',
    fontWeight: '300'
  }
})

class Footer extends Component {
  state = {
    open: false
  }

  handleDialogOpen = (e) => {
    e.preventDefault()
    this.setState({ open: true })
  }

  handleDialogClose = () => {
    this.setState({ open: false })
  }

  render () {
    const { classes } = this.props
    return (
      <>
        <Dialog open={this.state.open}
          onClose={this.handleDialogClose}
          aria-labelledby='form-dialog-title'
          PaperProps={{
            style: {
              backgroundColor: '#1A1A1A',
              color: '#F7F7F7',
              width: '400px'
            }
          }}
        >
          <DialogTitle id='form-dialog-title'>ETHEOS Info</DialogTitle>
          <DialogContent>
            <DialogContentText className={classes.disclaimerText}>
              ⚠️ This is highly experimental technology. Please use with caution and at your own risk.
            </DialogContentText>
            <DialogContentText className={classes.disclaimerText}>
              <strong style={{ color: 'white' }}>Contracts:</strong>
            </DialogContentText>
            <DialogContentText className={classes.disclaimerText}>
              The smart contracts were initially built by DAPP Network and the LiquidApps team, but are tweaked depending on the token being traded.
            </DialogContentText>
            <DialogContentText className={classes.disclaimerText}>
              <a href={CONTRACTS_LINK}
                target='_blank'
                className={classes.link}
              >Smart Contract Code</a>
              <a href={EOS_LINK}
                target='_blank'
                className={classes.link}
              >EOS</a>
            </DialogContentText>
          </DialogContent>
        </Dialog>

        <div className={classes.footer}>
          <a onClick={this.handleDialogOpen}
            href='#'
            className={classes.link}
          >
            About</a>
          <a target='_blank'
            href={CONTRACTS_LINK}
            className={classes.link}
          >
            Smart Contracts</a>
          <a target='_blank'
            href={DISCORD_LINK}
            className={classes.link}
          >
            Discord</a>
          <a target='_blank'
            href={YUP_LINK}
            className={classes.link}
          >
            Yup</a>
        </div>
      </>
    )
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Footer)
