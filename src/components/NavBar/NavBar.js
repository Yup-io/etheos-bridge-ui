import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Toolbar, Grid, AppBar } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import WalletLogin from '../WalletLogin/WalletLogin'

const styles = theme => ({
  logo: {
    width: '50px',
    height: 'auto',
    marginTop: '1px',
    [theme.breakpoints.down('xs')]: {
      width: '30px'
    }
  },
  nav: {
    position: 'relative',
    background: 'transparent'
  },
  AppBar: {
    boxShadow: 'none',
    padding: '0 90px'
  },
  bar: {
    padding: '10px 25% 50px 25%',
    [theme.breakpoints.down('md')]: {
      padding: '10px 0px 35px 0px'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '10px 0px 25px 0px'
    }
  },
  header: {
    marginLeft: '15px'
  },
  title: {
    fontFamily: 'Bungee',
    fontSize: '1.7rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.2rem'
    }
  },
  description: {
    fontFamily: 'Rubik',
    fontSize: '1rem',
    fontWeight: '300',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.7rem'
    }
  }
})

class NavBar extends Component {
  render () {
    const { classes } = this.props
    return (
      <AppBar elevation={0}
        className={classes.nav}
      >
        <Toolbar>
          <Grid container
            direction='row'
            justify='space-between'
            alignItems='center'
            className={classes.bar}
          >
            <Grid item
              style={{ display: 'flex' }}
            >
              <img src='/images/logos/bridgelogo.svg'
                className={classes.logo}
              />
              <Typography className={classes.header}>
                <span className={classes.title}>EthEos</span>
                <br />
                <span className={classes.description}>The EOS ↔ ETH Bridge</span>
              </Typography>
            </Grid>
            <Grid item>
              <WalletLogin />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    )
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NavBar)
