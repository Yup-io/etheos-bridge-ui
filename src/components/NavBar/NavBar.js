import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Toolbar, Grid, AppBar, Tooltip } from '@material-ui/core'
import WalletLogin from '../WalletLogin/WalletLogin'

const styles = theme => ({
  icon: {
    display: 'inline-block'
  },
  lights: {
    width: '100px',
    height: 'auto',
    marginTop: '1px',
    [theme.breakpoints.down('xs')]: {
      width: '75px'
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
    padding: '0 25%',
    [theme.breakpoints.down('md')]: {
      padding: '0px'
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
            <Tooltip
              placement='bottom'
              title={<h color='#fff'
                style={{ fontSize: '12px' }}
                     >On your mark, get set, go!</h>}
            >
              <Grid item>
                <img src='/images/trafficlights.gif'
                  className={classes.lights}
                />
              </Grid>
            </Tooltip>
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
