import { pushTransaction } from './push-transaction'
const { YUP_CONTRACT_ACCOUNT, YUP_ACCOUNT_MANAGER, YUP_ETH_CONTRACT, LP_ETH_CONTRACT, YUP_BRIDGE, LP_BRIDGE } = process.env

export async function transfer (account, data) {
  const normalizedAmount = `${Number(data.amount).toFixed(4)} ${data.asset}`
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
        account: data.asset === 'YUP' ? YUP_ETH_CONTRACT : LP_ETH_CONTRACT,
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
          ram_payer: YUP_ACCOUNT_MANAGER,
          from: account.name,
          to: data.asset === 'YUP' ? YUP_BRIDGE : LP_BRIDGE,
          quantity: normalizedAmount,
          memo: data.recipient
        }
      }
    ]
  }

  console.log(tx)

  const txStatus = await pushTransaction(tx)
  return txStatus
}

export async function createacct (account, data) {
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
        account: YUP_CONTRACT_ACCOUNT,
        name: 'createacct',
        authorization: [{
          actor: account.name,
          permission: account.authority
        }],
        data: {
          owner: data.username,
          eosname: account.name,
          bio: data.bio,
          avatar: data.avatar,
          username: data.username
        }
      }
    ]
  }

  const txStatus = await pushTransaction(tx)
  return txStatus
}

export async function editacct (account, data) {
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
        account: YUP_CONTRACT_ACCOUNT,
        name: 'editacct',
        authorization: [{
          actor: account.name,
          permission: account.authority
        }],
        data: {
          owner: account.name,
          fullname: data.fullname || '',
          bio: data.bio || '',
          avatar: data.avatar || ''
        }
      }
    ]
  }

  const txStatus = await pushTransaction(tx)
  return txStatus
}
