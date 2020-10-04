import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import numeral from 'numeral'
import { ERC20Balance } from '../ERC20Balance/ERC20Balance'
import { useWeb3React } from '@web3-react/core'
import CountUp from 'react-countup'
import { connect } from 'react-redux'
import axios from 'axios'
const BACKEND_API = process.env.BACKEND_API

const styles = theme => ({
  container: {
    backgroundColor: '#2C2C2C',
    height: '50px',
    width: '570px',
    margin: 'auto',
    borderBottomLeftRadius: '5px',
    borderBottomRightRadius: '5px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    fontFamily: 'VT323',
    fontSize: '1.2rem',
    boxShadow: '0px -20px #2c2c2c',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      fontSize: '1rem'
    }
  },
  metrics: {
    fontSize: '1.7rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.2rem'
    }
  },
  number: {
    color: '#C4C4C4',
    textTransform: 'uppercase'
  }
})

  const MetricsBar = (props) => {
    const { classes, scatter, scatterAccount } = props
    const { account, library, chainId, active } = useWeb3React()

    const [yupBal, setYupBal] = useState(0)
    const [yupInf, setYupInf] = useState(0)

    const fetchYupData = () => {
      if (scatterAccount) {
        const req = `${BACKEND_API}/levels/user/${scatterAccount.name}`
        axios.get(req)
          .then(res => {
            setYupBal(numeral(res.data.balance.YUPX).format('0,0.00'))
            setYupInf(numeral(res.data.weight).format('0'))
          })
          .catch(err => {
            console.error(err, 'ERROR FETCHING YUP BALANCE')
          })
      } else {
        setYupBal(0.00)
        setYupInf(0)
      }
    }

    useEffect(() => {
      fetchYupData()
    }, [scatter, scatterAccount])

    return (
      <div className={classes.container}>
        {active && (
          <ERC20Balance
            chainId={chainId}
            account={account}
            active={active}
            library={library}
            classes={classes}
          />
        )}
        {!active && scatterAccount && (
          <div className={classes.number}>
            <CountUp className={classes.metrics}
              decimals={2}
              start={0}
              end={parseFloat((yupBal))}
            /> Yup
          </div>
        )}
        <div className={classes.number}><span className={classes.metrics}>0.00</span> Staked</div>
        {!active && (
          <div className={classes.number}>
            <CountUp className={classes.metrics}
              decimals={0}
              start={0}
              end={parseFloat((yupInf))}
            /> Influence
          </div>
        )}
      </div>
    )
}

const mapStateToProps = (state, ownProps) => {
  const scatter = state.scatterRequest
  const scatterAccount = state.scatterRequest.scatterAccount
  return {
    scatter, scatterAccount
  }
}

MetricsBar.propTypes = {
  classes: PropTypes.object.isRequired,
  scatter: PropTypes.object,
  scatterAccount: PropTypes.object
}

export default connect(mapStateToProps)(withStyles(styles)(MetricsBar))
