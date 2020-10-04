import React, { useEffect } from 'react'
import { Web3ReactProvider } from '@web3-react/core'
import useSWR from 'swr'
import { formatUnits } from '@ethersproject/units'
import { Contract } from '@ethersproject/contracts'
import ERC20ABI from './abi/ERC20.abi.json'
import { TOKENS_BY_NETWORK } from '../../utils/networks'
import { getLibrary, fetcher } from './utils'
import CountUp from 'react-countup'
/* eslint react/prop-types: 0 */

export const ERC20Balance = ({ chainId, account, active, library, classes }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      {active && (
        <>
          {TOKENS_BY_NETWORK[chainId].map((token) => (
            <TokenBalance
              account={account}
              library={library}
              classes={classes}
              key={token.address}
              {...token}
            />
          ))}
        </>
      )}
    </Web3ReactProvider>
  )
}

const TokenBalance = ({ symbol, address, decimals, account, library, classes }) => {
  const { data: balance, mutate } = useSWR([address, 'balanceOf', account], {
    fetcher: fetcher(library, ERC20ABI)
  })

  useEffect(() => {
    // listen for changes on an Ethereum address
    console.log(`listening for Transfer...`)
    const contract = new Contract(address, ERC20ABI, library.getSigner())
    const fromMe = contract.filters.Transfer(account, null)
    library.on(fromMe, (from, to, amount, event) => {
      mutate(undefined, true)
    })
    const toMe = contract.filters.Transfer(null, account)
    library.on(toMe, (from, to, amount, event) => {
      mutate(undefined, true)
    })
    // remove listener when the component is unmounted
    return () => {
      library.removeAllListeners(toMe)
      library.removeAllListeners(fromMe)
    }
    // trigger the effect only on component mount
  }, [])

  if (!balance) {
    return <div>...</div>
  }
  return (
    <div className={classes.number}>
      <CountUp className={classes.metrics}
        decimals={2}
        start={0}
        end={parseFloat(formatUnits(balance, decimals))}
      /> {symbol}
    </div>
  )
}
