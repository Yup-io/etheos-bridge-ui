import axios from 'axios'
import ScatterJS, { Network } from 'scatterjs-core'
import ScatterEOS from 'scatterjs-plugin-eosjs'
import Eos from 'eosjs'
import { mainnet, testnet } from './scatter.config'
import { JsonRpc } from 'eosjs2'
const { BACKEND_API, NODE_ENV } = process.env
const networkConfig = NODE_ENV === 'production' ? mainnet : testnet
const network = Network.fromJson(networkConfig)

const rpc = new JsonRpc(network.fullhost())

class ScatterWallet {
  constructor () {
    this.scatter = null
    this.identity = null
    this.connected = false
    this.eos = null
    this.rpc = rpc
  }

  async detect (updateScatter, scatterInstall) {
    try {
      if (this.connected) {
        this.eos = this.scatter.eos(networkConfig, Eos, {})
        updateScatter(this.scatter, this.identity)
        scatterInstall(true)
        return
      }

      const connected = await ScatterJS.scatter.connect('YupApp')
      if (!connected) { return }

      this.connected = connected
      this.scatter = ScatterJS.scatter
      console.log(this.scatter)
      window.scatter = null

      ScatterJS.plugins(new ScatterEOS())

      if (this.identity == null) {
        const identity = await this.scatter.getIdentity({
          accounts: [networkConfig]
        })

        if (identity.length === 0) {
          throw Error('No Yup identities found')
        }

        this.identity = {
          name: identity.accounts[0].name,
          authority: identity.accounts[0].authority
        }

        // window.analytics.identify({ userId: this.identity.name })

        // Add new account to backend if it doesn't exist
        try {
          await axios.get(`${BACKEND_API}/accounts/${this.identity.name}`)
        } catch (e) {
          if (e.response.data.statusCode === 404) {
            axios.post(`${BACKEND_API}/accounts/${this.identity.name}`)
          }
        }

        if (this.scatter && this.scatter.isExtension) {
          this.eos = this.scatter.eos(networkConfig, Eos, {})
          updateScatter(this.scatter, this.identity)
          scatterInstall(true)
        }
      }
    } catch (err) {
        console.error('SCATTER DETECT ERROR: ', err)
      }
  }
}

const wallet = new ScatterWallet()
export default wallet
