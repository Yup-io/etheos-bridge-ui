import { pushTransaction } from './push-transaction'
const { YUP_CONTRACT_ACCOUNT, YUP_ACCOUNT_MANAGER } = process.env

export async function follow (account, data) {
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
        name: 'follow',
        authorization: [{
          actor: account.name,
          permission: account.authority
        }],
        data: {
          follower: account.name,
          account_to_follow: data.accountToFollow
        }
      }
    ]
  }

  const txStatus = await pushTransaction(tx)
  return txStatus
}

export async function unfollow (account, data, eos) {
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
        name: 'unfollow',
        authorization: [{
          actor: account.name,
          permission: account.authority
        }],
        data: {
          follower: account.name,
          account_to_unfollow: data.accountToUnfollow
        }
      }
    ]
  }

  const txStatus = await pushTransaction(tx)
  return txStatus
}
