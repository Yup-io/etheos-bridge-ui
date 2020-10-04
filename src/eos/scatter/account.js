import wallet from './scatter.wallet'
const { YUPX_TOKEN_ACCOUNT } = process.env

export async function getCurrencyBalance (account, currency) {
  if (currency === 'EOS') {
    const res = await wallet.rpc.get_currency_balance('eosio.token', account, currency)
    if (res.length === 0) {
      return { currency: null, amount: null }
    }
    const data = res[0]
    const tokens = data.split(' ')
    return { currency: tokens[1], amount: tokens[0] }
  } else if (currency === 'YUPX') {
    const res = await wallet.rpc.get_currency_balance(YUPX_TOKEN_ACCOUNT, account, currency)
    if (res.length === 0) {
      return { currency: null, amount: null }
    }
    const data = res[0]
    const tokens = data.split(' ')
    return { currency: tokens[1], amount: tokens[0] }
  }
}

export async function getResourceUsage (account) {
  const data = await wallet.rpc.get_account(account)
  const { cpu_limit: cpu, net_limit: net, ram_quota, ram_usage } = data // eslint-disable-line camelcase
  return { cpu, ram: { quota: ram_quota, used: ram_usage }, net }
}
