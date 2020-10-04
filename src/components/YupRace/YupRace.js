import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Footer from '../Footer/Footer'

const styles = theme => ({
  container: {
    width: '100%',
    maxHeight: '100vh',
    padding: '0px',
    background: '#3A3A3A',
    [theme.breakpoints.down('sm')]: {
      height: '100%'
    }
  },
  frame: {
    width: '570px',
    height: '405px',
    display: 'flex',
    background: '#2a2a2a',
    margin: 'auto',
    border: '1px black solid',
    boxSizing: 'border-box',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '350px'
    }
  },
  gameContainer: {
    width: '640px',
    height: '770px',
    background: '#434343',
    margin: 'auto',
    borderRadius: '20px',
    boxShadow: '-2px 4px 0.2px #353535, -5px 7px 0.2px #353535, -10px 12px 0.2px #353535, -15px 17px 0.2px #353535, -15px 17px 5px #fafafa10',
    [theme.breakpoints.down('770px')]: {
      width: '70%',
      height: '700px'
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '700px',
      overflow: 'hidden',
      boxShadow: 'none',
      background: 'transparent'
    }
  },
  gameTitle: {
    margin: 'auto',
    textAlign: 'center',
    fontFamily: 'Racing Sans One',
    fontSize: '60px',
    width: '300px',
    position: 'relative',
    padding: '5px 0px 5px 0px',
    color: '#ca2bb0',
    textShadow: '0 0 2px #DAE588, 0 0 2px #DAE588, 0 0 2px #DAE588, 0 0 2px #DAE588',
    letterSpacing: '1px',
    [theme.breakpoints.down('sm')]: {
      width: '200px',
      padding: '0px'
      // top: '1%'
    }
  },
  gameTitleContainer: {
    textAlign: 'center',
    marginBottom: '-45px',
    paddingTop: '15px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '-25px'
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '-25px',
      paddingTop: '0px'
    }
  }
})

class YupRace extends Component {
  state = {
    open: true
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
          <DialogTitle id='form-dialog-title'>Disclaimer</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <span style={{ color: '#C4C4C4' }}>This is an experimental site for Yup Racing.</span>
            </DialogContentText>
          </DialogContent>
        </Dialog>

        <div className={classes.container}>
          <div className={classes.gameContainer}>
            <div className={classes.gameTitleContainer}>
              <img src='images/logos/YupRacing.svg'
                className={classes.gameTitle}
              />
            </div>
            <iframe src='http://yup-racing-game.s3-website-us-east-1.amazonaws.com/'
              className={classes.frame}
              scrolling='no'
              frameBorder='0'
            />
            <Footer />
          </div>
        </div>
      </>
    )
  }
}

YupRace.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(YupRace)
