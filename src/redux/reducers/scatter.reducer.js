import { scatterConstants as constants } from '../constants'

const initialState = { scatter: null, scatterAccount: null, installed: true, notify: false, push: false, reloadComments: false }

export function scatterRequest (state = initialState, action) {
  switch (action.type) {
    case constants.LOGIN:
      return { ...state, scatter: action.scatter, scatterAccount: action.scatterAccount }
    case constants.LOGOUT:
      return { ...initialState }
    default:
      return state
  }
}

export function scatterInstallation (state = initialState, action) {
  switch (action.type) {
    case constants.INSTALL_STATUS:
      return { ...state, installed: action.installed, notify: action.notify }
    case constants.NOTIFY_SCATTER:
      return { ...state, notify: action.notify }
    case constants.PUSH_ACCOUNT:
      return { ...state, push: action.load }
    default:
      return state
  }
}
