import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import axios from 'axios'
import { useWeb3React } from '@web3-react/core'
import StakeButton from '../StakeButton/StakeButton'
const { BACKEND_API } = process.env
const BUY_LINK = '#'
const PROTOCOL_LINK = 'http://yup.io/'
const DISCORD_LINK = 'https://discord.gg/KED2nHS'

const useStyles = makeStyles((theme) => ({
  container: {
    height: '20vh',
    width: '75%',
    minHeight: '25%',
    marginLeft: '10%',
    marginTop: '5%',
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: 'Rubik',
    fontSize: '10px',
    textTransform: 'uppercase',
    [theme.breakpoints.down('xl')]: {
      height: '10vh'
    },
    [theme.breakpoints.down('md')]: {
      width: '82%',
      height: '14vh',
      marginLeft: '7%'
    },
    [theme.breakpoints.down('sm')]: {
      width: '82%',
      fontSize: '8px'
    }
  },
  controllerLeft: {
    height: '150px',
    width: '150px',
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      left: '-25px'
    }
  },
  controllerRight: {
    height: '150px',
    width: '50%',
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      left: '-25px'
    }
  },
  crossCenter: {
    backgroundColor: '#333333',
    width: '40px',
    height: '40px',
    marginTop: '55px',
    marginLeft: '55px',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      width: '30px',
      height: '30px'
    }
  },
  crossTop: {
    backgroundColor: '#333333',
    width: '40px',
    height: '50px',
    position: 'absolute',
    borderRadius: '15%',
    marginTop: '-45px',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      width: '30px',
      height: '40px',
      marginTop: '-35px'
    }
  },
  crossBottom: {
    backgroundColor: '#333333',
    width: '40px',
    height: '50px',
    position: 'absolute',
    borderRadius: '15%',
    marginTop: '35px',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      width: '30px',
      height: '40px',
      marginTop: '25px'
    }
  },
  crossLeft: {
    backgroundColor: '#333333',
    width: '50px',
    height: '40px',
    position: 'absolute',
    borderRadius: '15%',
    marginLeft: '-45px',
    [theme.breakpoints.down('sm')]: {
      width: '40px',
      height: '30px',
      marginLeft: '-35px'
    }
  },
  crossRight: {
    backgroundColor: '#333333',
    width: '50px',
    height: '40px',
    position: 'absolute',
    borderRadius: '15%',
    marginLeft: '35px',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      width: '40px',
      height: '30px',
      marginLeft: '25px'
    }
  },
  rightButtons: {
    position: 'absolute',
    width: '70px',
    height: '40px',
    marginTop: '50px',
    marginLeft: '50px',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      marginTop: '40px',
      marginLeft: '40px'
    }
  },
  unstake: {
    position: 'absolute',
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    cursor: 'pointer',
    borderWidth: '3px',
    '&:focus': {
      outline: 'none'
    },
    [theme.breakpoints.down('xs')]: {
      width: '25px',
      height: '25px'
    }
  },
  linkTwitter: {
    position: 'absolute',
    height: '60px',
    width: '60px',
    marginLeft: '150px',
    borderRadius: '50%',
    border: 'solid 6px #227D99',
    backgroundColor: '#2B9DC0',
    cursor: 'pointer',
    '&:focus': {
      outline: 'none'
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '135px'
    },
    [theme.breakpoints.down('xs')]: {
      width: '50px',
      height: '50px',
      marginLeft: '100px'
    }
  },
  unstakeText: {
    color: '#F7F7F7',
    position: 'relative',
    top: '35px',
    left: '-13px',
    fontFamily: 'Rubik',
    fontSize: '0.6rem',
    textTransform: 'uppercase',
    [theme.breakpoints.down('sm')]: {
      left: '-15px'
    },
    [theme.breakpoints.down('xs')]: {
      left: '-18px'
    }
  },
  linkTwitterText: {
    color: '#F7F7F7',
    position: 'relative',
    width: '55px',
    top: '55px',
    left: '-10px',
    fontFamily: 'Rubik',
    fontSize: '0.7rem',
    textTransform: 'uppercase',
    [theme.breakpoints.down('xs')]: {
      left: '-15px'
    }
  },
  buyText: {
    color: '#F7F7F7',
    position: 'relative',
    top: '-30px',
    left: '15px',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    },
    [theme.breakpoints.down('sm')]: {
      top: '-20px',
      left: '10px'
    }
  },
  infoText: {
    color: '#F7F7F7',
    position: 'relative',
    left: '40px',
    top: '12px',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    },
    [theme.breakpoints.down('sm')]: {
      left: '30px'
    }
  },
  discordText: {
    color: '#F7F7F7',
    position: 'relative',
    top: '55px',
    left: '-30px',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    },
    [theme.breakpoints.down('sm')]: {
      top: '40px',
      left: '-20px'
    }
  },
  stake: {
    position: 'absolute',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    marginLeft: '70px',
    border: 'solid 6px #029474',
    cursor: 'pointer',
    top: '-10px',
    '&:focus': {
      outline: 'none'
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '60px'
    },
    [theme.breakpoints.down('xs')]: {
      width: '50px',
      height: '50px',
      marginLeft: '40px',
      top: '-5px'
    }
  },
  stakeText: {
    color: '#F7F7F7',
    position: 'relative',
    top: '45px',
    left: '-1px',
    fontFamily: 'Rubik',
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    [theme.breakpoints.down('sm')]: {
      left: '0px'
    },
    [theme.breakpoints.down('xs')]: {
      left: '-5px'
    }
  }
}))

const ControllerButtons = () => {
  const classes = useStyles()
  const { account } = useWeb3React()
  const [staked] = useState(false)

  const startTwitterOAuth = async () => {
    try {
      const oauthRes = (await axios.post(`${BACKEND_API}/v1/auth/oauth-challenge`, { domain: 'yup.io' }))
      const { token, _id: id } = oauthRes.data
      const twitterRes = (await axios.post(`${BACKEND_API}/v1/auth/twitter`,
        { verificationToken: token, verificationId: id, oauthReferrer: 'website' }))
      window.open(twitterRes.data.redirectPath)
    } catch (err) {
      console.error('Error occured during Twitter OAuth: ', err)
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.controllerLeft}>
        <div className={classes.crossCenter}>
          <div className={classes.crossTop} />
          <div className={classes.crossBottom} />
          <div className={classes.crossLeft} />
          <div className={classes.crossRight}>
            <a href={BUY_LINK}
              className={classes.buyText}
            >
              Buy</a>
            <a href={PROTOCOL_LINK}
              className={classes.infoText}
            >
              Info</a>
            <a href={DISCORD_LINK}
              className={classes.discordText}
            >
              Discord</a>
          </div>
        </div>
      </div>
      <div className={classes.controllerRight}>
        <div className={classes.rightButtons}>
          <button className={classes.unstake}
            style={{ backgroundColor: staked ? '#FF4040' : '#333333', border: staked ? 'solid 3px #CC3333' : '' }}
          >
            <Typography className={classes.unstakeText}>Unstake</Typography>
          </button>
          <StakeButton
            classes={classes}
            account={account}
          />
          <button className={classes.linkTwitter}
            onClick={() => {
              startTwitterOAuth()
            }}
          >
            <Typography className={classes.linkTwitterText}>Link Twitter</Typography>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ControllerButtons
