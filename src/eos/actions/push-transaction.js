import wallet from '../scatter/scatter.wallet'
import axios from 'axios'
import { Api, JsonRpc } from 'eosjs2'
import { JsSignatureProvider } from 'eosjs2/dist/eosjs-jssig'
import fetch from 'node-fetch'
import crypto from 'crypto'

const { EOS_API, EOS_CHAINID } = process.env
const signatureProvider = new JsSignatureProvider([])
const rpc = new JsonRpc(EOS_API, { fetch })
const api = new Api({ rpc, signatureProvider })

export async function pushTransaction (txData) {
  console.log(txData)
  if (wallet.scatter.isExtension) {
  try {
    const { transaction: signedTx } = await wallet.eos.transaction(txData, {
      blocksBehind: 3,
      expireSeconds: 60,
      broadcast: false
    })

    const { transaction, signatures } = signedTx

    const serializedTx = api.serializeTransaction(transaction)
    const signBuf = Buffer.concat([
      Buffer.from(EOS_CHAINID, 'hex'), Buffer.from(serializedTx), Buffer.from(new Uint8Array(32))
    ])

    const signedDataHash = crypto.createHash('sha256').update(signBuf).digest('hex')

    const backend = 'http://localhost:4001'
    const txStatus = (await axios.post(`${backend}/transaction`, {
      transaction,
      signature: signatures[0],
      signedDataHash
    })).data
    return txStatus
  } catch (error) {
      console.log(error)
  }
  } else {
    return wallet.eos.transact(txData, {
      blocksBehind: 3,
      expireSeconds: 30
    })
  }
}
