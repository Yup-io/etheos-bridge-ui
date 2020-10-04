import wallet from '../scatter/scatter.wallet'
import axios from 'axios'
import { Api, JsonRpc } from 'eosjs2'
import { JsSignatureProvider } from 'eosjs2/dist/eosjs-jssig'
import fetch from 'node-fetch'
import crypto from 'crypto'

const { BACKEND_API, EOS_API, EOS_CHAINID } = process.env
const signatureProvider = new JsSignatureProvider([])
const rpc = new JsonRpc(EOS_API, { fetch })
const api = new Api({ rpc, signatureProvider })

export async function pushTransaction (txData) {
  if (wallet.scatter.isExtension) {
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

  const txStatus = (await axios.post(`${BACKEND_API}/transaction`, {
    transaction,
    signature: signatures[0],
    signedDataHash
  })).data
  return txStatus
} else {
  return wallet.eos.transact(txData, {
    blocksBehind: 3,
    expireSeconds: 30
  })
}
}
