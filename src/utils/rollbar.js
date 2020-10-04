import Rollbar from 'rollbar'

const { ROLLBAR_ACCESS_KEY, NODE_ENV } = process.env

const rollbar = new Rollbar({ accessToken: ROLLBAR_ACCESS_KEY })

const transformer = payload => {
  const body = payload.body && payload.body.message && payload.body.message.body
  if (body) {
    payload.body.message.body = `[frontend] ` + body
  }
  return payload
}

rollbar.configure({
  enabled: NODE_ENV === 'production',
  transform: transformer,
  environment: `${NODE_ENV}:frontend`
})

export default rollbar
