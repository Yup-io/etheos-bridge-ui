import { pushTransaction } from './push-transaction'
const { YUP_CONTRACT_ACCOUNT, YUP_ACCOUNT_MANAGER, YUP_TOKEN_EOS, LP_TOKEN_EOS, YUP_BRIDGE_CONTRACT_EOS, LP_BRIDGE_CONTRACT_EOS, YUP_BRIDGE_FEE, LP_BRIDGE_FEE } = process.env

export async function transfer (account, data) {
  const normalizedAmount = `${Number(data.amount).toFixed(4)} ${data.asset}`
  const normalizedYUPFee = `${Number(YUP_BRIDGE_FEE).toFixed(4)} YUP`
  const normalizedYUPETHFee = `${Number(LP_BRIDGE_FEE).toFixed(4)} YUPETH`
  const tx = {
    actions: [
      {
        account: YUP_CONTRACT_ACCOUNT,
        name: 'noop',
        authorization: [{
          actor: YUP_ACCOUNT_MANAGER,
          permission: 'active'
        }],
        data: {}
      },
      {
        account: data.asset === 'YUP' ? YUP_TOKEN_EOS : LP_TOKEN_EOS,
        name: 'transfer',
        authorization: [{
          actor: account.name,
          permission: account.authority
        },
        {
          actor: YUP_ACCOUNT_MANAGER,
          permission: 'active'
        }],
        data: {
          from: account.name,
          to: data.asset === 'YUP' ? YUP_BRIDGE_CONTRACT_EOS : LP_BRIDGE_CONTRACT_EOS,
          quantity: normalizedAmount,
          memo: data.recipient
        }
      },
      {
        account: data.asset === 'YUP' ? YUP_TOKEN_EOS : LP_TOKEN_EOS,
        name: 'transfer',
        authorization: [{
          actor: account.name,
          permission: account.authority
        },
        {
          actor: YUP_ACCOUNT_MANAGER,
          permission: 'active'
        }],
        data: {
          from: account.name,
          to: YUP_ACCOUNT_MANAGER,
          quantity: data.asset === 'YUP' ? normalizedYUPFee : normalizedYUPETHFee,
          memo: 'Bridge Fee'
        }
      }
    ]
  }
  const txStatus = await pushTransaction(tx)
  return txStatus
}
