import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const CONTRACTS_LINK = '#'
const GITHUB_LINK = 'https://github.com/Yup-io/Yup-Racing'

const styles = theme => ({
  footer: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    borderRadius: '20px',
    padding: '12px 0px'
  },
  link: {
    textDecoration: 'none',
    color: '#C4C4C4',
    margin: '10px',
    fontSize: '0.7rem',
    fontFamily: 'Rubik',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
})

class Footer extends Component {
  render () {
    const { classes } = this.props
    return (
      <div className={classes.footer}>
        <a target='_blank'
          href={CONTRACTS_LINK}
          className={classes.link}
        >
          Smart Contracts</a>
        <a target='_blank'
          href={GITHUB_LINK}
          className={classes.link}
        >
          Github</a>
      </div>
    )
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Footer)
