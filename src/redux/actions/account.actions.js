import { accountConstants as constants } from '../constants'
import { getCurrencyBalance, getResourceUsage } from '../../eos/scatter/account'
import { editacct } from '../../eos/actions'

import axios from 'axios'
const BACKEND_API = process.env.BACKEND_API

export function fetchCurrencyBalance (username, currency) {
  return async dispatch => {
    dispatch(request(username, currency))
    try {
      const balanceInfo = await getCurrencyBalance(username, currency)
      dispatch(success(username, balanceInfo.currency, balanceInfo.amount))
    } catch (err) {
      dispatch(failure(username, currency, err))
    }
  }

  function request (username, currency) {
    return { type: constants.FETCH_CURRENCY_BALANCE, username, currency }
  }

  function success (username, currency, balance) {
    return { type: constants.FETCH_CURRENCY_BALANCE_SUCCESS, username, currency, balance }
  }

  function failure (username, currency, error) {
    return { type: constants.FETCH_CURRENCY_BALANCE_FAILURE, username, currency, error }
  }
}

export function fetchResourceUsage (username) {
  return async dispatch => {
    dispatch(request(username))
    try {
      const resourceInfo = await getResourceUsage(username)
      dispatch(success(username, resourceInfo))
    } catch (err) {
      dispatch(failure(username, err))
    }
  }

  function request (username) {
    return { type: constants.FETCH_RESOURCE_USAGE, username }
  }

  function success (username, resourceInfo) {
    return { type: constants.FETCH_RESOURCE_USAGE_SUCCESS, username, resourceInfo }
  }

  function failure (username, error) {
    return { type: constants.FETCH_RESOURCE_USAGE_FAILURE, username, error }
  }
}

export function deductBalance (username, amount, currency) {
  return { type: constants.DEDUCT_BALANCE, username, currency, amount }
}

export function updateWeight (username, update) {
  return { type: constants.UPDATE_WEIGHT, username, ...update }
}

export function updateAccountInfo (account, update) {
  return async dispatch => {
    dispatch(request(account.name))
    try {
      await editacct(account, update)
      dispatch(success(account.name, update))
    } catch (err) {
      dispatch(failure(account.name, err))
    }
  }

  function request (username) {
    return { type: constants.UPDATE_ACCOUNT_INFO, username }
  }

  function success (username, update) {
    return { type: constants.UPDATE_ACCOUNT_INFO_SUCCESS, username, update }
  }

  function failure (username, error) {
    return { type: constants.UPDATE_ACCOUNT_INFO_FAILURE, username, error }
  }
}

export function fetchAllSocialLevels () {
  return async dispatch => {
    dispatch(request())
    try {
      const levelsInfo = (await axios.get(`${BACKEND_API}/levels`)).data
      dispatch(success(levelsInfo))
    } catch (err) {
      dispatch(failure(err))
    }
  }

  function request () {
    return { type: constants.FETCH_ALL_SOCIAL_LEVELS }
  }

  function success (levelsInfo) {
    return { type: constants.FETCH_ALL_SOCIAL_LEVELS_SUCCESS, levelsInfo }
  }

  function failure (error) {
    return { type: constants.FETCH_ALL_SOCIAL_LEVELS_FAILURE, error }
  }
}

export function fetchSocialLevel (username) {
  return async dispatch => {
    dispatch(request(username))
    try {
      const levelInfo = (await axios.get(`${BACKEND_API}/levels/user/${username}`)).data
      dispatch(success(username, levelInfo))
    } catch (err) {
      dispatch(failure(username, err))
    }
  }

  function request (username) {
    return { type: constants.FETCH_SOCIAL_LEVEL, username }
  }

  function success (username, levelInfo) {
    return { type: constants.FETCH_SOCIAL_LEVEL_SUCCESS, username, levelInfo }
  }

  function failure (username, error) {
    return { type: constants.FETCH_SOCIAL_LEVEL_FAILURE, username, error }
  }
}
