import { pushTransaction } from './push-transaction'
const { YUP_CONTRACT_ACCOUNT, YUP_ACCOUNT_MANAGER } = process.env

export async function createcomment (account, data) {
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
        name: 'createcomv2',
        authorization: [{
          actor: account.name,
          permission: account.authority
        }],
        data: {
          postid: data.postid,
          author: account.name,
          timestamp: (new Date()).getTime(),
          comment: data.comment
        }
      }
    ]
  }

  const txStatus = await pushTransaction(tx)
  return txStatus
}

export async function editcomment (account, data) {
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
        name: 'editcom',
        authorization: [{
          actor: account.name,
          permission: account.authority
        }],
        data: {
          commentid: data.commentid,
          comment: data.comment,
          edit_timestamp: (new Date()).getTime()
        }
      }
    ]
  }

  const txStatus = await pushTransaction(tx)
  return txStatus
}

export async function deletecomment (account, data) {
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
        name: 'deletecom',
        authorization: [{
          actor: account.name,
          permission: account.authority
        }],
        data: {
          commentid: data.commentid
        }
      }
    ]
  }

  const txStatus = await pushTransaction(tx)
  return txStatus
}
