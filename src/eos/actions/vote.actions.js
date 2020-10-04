import wallet from '../scatter/scatter.wallet'
import { pushTransaction } from './push-transaction'
const { YUP_CONTRACT_ACCOUNT, YUP_ACCOUNT_MANAGER } = process.env

export async function createvote (account, data) {
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
          name: 'createvotev3',
          authorization: [{
            actor: account.name,
            permission: account.authority
          }],
          data: {
            voter: account.name,
            postid: data.postid,
            rating: data.rating,
            like: Number(!!data.like),
            category: data.category
          }
        }
      ]
    }

    const txStatus = await pushTransaction(tx)
    return txStatus
}

export async function editvote (account, data) {
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
        name: 'editvotev2',
        authorization: [{
          actor: account.name,
          permission: account.authority
        }],
        data: {
          voteid: data.voteid,
          like: wallet.scatter.isExtension ? Number(!!data.like) : !!data.like,
          rating: data.rating,
          category: data.category
        }
      }
    ]
  }

  const txStatus = await pushTransaction(tx)
  return txStatus
}

export async function deletevote (account, data) {
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
        name: 'deletevote',
        authorization: [{
          actor: account.name,
          permission: account.authority
        }],
        data: {
          voteid: data.voteid
        }
      }
    ]
  }

  const txStatus = await pushTransaction(tx)
  return txStatus
}
