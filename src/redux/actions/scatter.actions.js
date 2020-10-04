import { scatterConstants as constants } from '../constants'

export function loginScatter (scatter, scatterAccount) {
  return {
    type: constants.LOGIN,
    scatter,
    scatterAccount
  }
}

export function logoutScatter () {
  return {
    type: constants.LOGOUT,
    scatter: null,
    scatterAccount: null
  }
}

export function signalConnection (bool) {
  let val = !bool
  return {
    type: constants.INSTALL_STATUS,
    installed: bool,
    notify: val
  }
}
export function signalNotify (bool) {
  return {
    type: constants.NOTIFY_SCATTER,
    notify: bool
  }
}

export function pushAccount (b) {
  return {
    type: constants.PUSH_ACCOUNT,
    load: b
  }
}
