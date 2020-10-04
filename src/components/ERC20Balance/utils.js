import { isAddress } from '@ethersproject/address'
import { Web3Provider } from '@ethersproject/providers'
import { Contract } from '@ethersproject/contracts'

export function getLibrary (provider) {
    const library = new Web3Provider(provider)
    library.pollingInterval = 12000
    return library
  }

export const fetcher = (library, abi) => (...args) => {
    const [arg1, arg2, ...params] = args
    // if it's a contract
    if (isAddress(arg1)) {
      const address = arg1
      const method = arg2
      const contract = new Contract(address, abi, library.getSigner())
      return contract[method](...params)
    }
    // if it's an eth call
    const method = arg1
    return library[method](arg2, ...params)
  }
