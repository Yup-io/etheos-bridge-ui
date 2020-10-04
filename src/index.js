import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import * as reducers from './redux/reducers'
import { history, reactReduxContext } from './utils/history'
import App from './App'

import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

const { NODE_ENV } = process.env

let composeEnhancers
let middleware

if (NODE_ENV === 'development') {
  const loggerMiddleware = createLogger()
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  middleware = applyMiddleware(
    routerMiddleware(history),
    thunkMiddleware,
    loggerMiddleware
  )
} else if (NODE_ENV === 'production') {
  composeEnhancers = compose

  middleware = applyMiddleware(
    routerMiddleware(history),
    thunkMiddleware
  )
}

const store = createStore(
  combineReducers({
    router: connectRouter(history),
    ...reducers
  }),
  composeEnhancers(middleware)
)

function getLibrary (provider) {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

ReactDOM.render(
  <Provider store={store}
    context={reactReduxContext}
  >
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  </Provider>, document.getElementById('root'))
