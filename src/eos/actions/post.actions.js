import { pushTransaction } from './push-transaction'
const { YUP_CONTRACT_ACCOUNT, YUP_ACCOUNT_MANAGER } = process.env

export async function createpost (account, data) {
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
        name: 'createpostv3',
        authorization: [{
          actor: account.name,
          permission: account.authority
        }],
        data: {
          img_hash: data.imgHash,
          video_hash: data.videoHash,
          author: account.name,
          tag: 'general',
          timestamp: (new Date()).getTime(),
          caption: data.caption
        }
      }
    ]
  }

  const txStatus = await pushTransaction(tx)
  return txStatus
}

export async function editpost (account, data) {
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
        name: 'editpost',
        authorization: [{
          actor: account.name,
          permission: account.authority
        }],
        data: {
          img_hash: data.imgHash,
          video_hash: data.videoHash,
          tag: 'general',
          postid: data.postid,
          caption: data.caption
        }
      }
    ]
  }

  const txStatus = await pushTransaction(tx)
  return txStatus
}

export async function deletepost (account, data) {
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
        name: 'deletepost',
        authorization: [{
          actor: account.name,
          permission: account.authority
        }],
        data: {
          postid: data.postid
        }
      }
    ]
  }

  const txStatus = await pushTransaction(tx)
  return txStatus
}
