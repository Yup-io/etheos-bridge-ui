import { createDfuseClient } from '@dfuse/client'
import nodeFetch from 'node-fetch'
import WebSocketClient from 'ws'

const { DFUSE_API_KEY, DFUSE_API_NETWORK } = process.env

async function webSocketFactory (url, protocols = []) {
  const webSocket = new WebSocketClient(url, protocols, {
    handshakeTimeout: 30 * 1000, // 30s
    maxPayload: 200 * 1024 * 1000 * 1000 // 200Mb
  })

  const onUpgrade = (response) => {
    // You need to remove the listener at some point since this factory
    // is called at each reconnection with the remote endpoint!
    webSocket.removeListener('upgrade', onUpgrade)
  }

  webSocket.on('upgrade', onUpgrade)

  return webSocket
}

export const dfuseClientFactory = (onError, onReconnect) => {
  return createDfuseClient({
    apiKey: DFUSE_API_KEY,
    network: DFUSE_API_NETWORK,
    httpClientOptions: {
      fetch: nodeFetch
    },
    streamClientOptions: {
      autoReconnect: true,
      socketOptions: {
        onError,
        onReconnect,
        webSocketFactory: (url) => webSocketFactory(url)

      }
    },
    graphqlStreamClientOptions: {
      socketOptions: {
        onError,
        onReconnect,
        reconnectDelayInMs: 250,
        webSocketFactory: (url) => webSocketFactory(url, ['graphql-ws'])
      }
    }
  })
}

const defaultOnError = (error) => {
  console.log('An error occurred', error)
}

const defaultOnReconnect = () => {
  console.log('<============= Stream as re-connected to socket correctly =============>')
}
export const defaultDfuseClient = dfuseClientFactory(defaultOnError, defaultOnReconnect)
export default defaultDfuseClient
