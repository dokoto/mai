import request from 'request-promise'

const userData = require('./users.json')
const adminUserData = require('./adminUsers.json')

const SUPER_TOKEN = 'OyalhYuKbQgUNpOQhdTQamZDKrhqOAC8'
const MASTER_TOKEN = 'W0sgNBbwsfoUfe5GXNQY36p1IOHA96Gb'

const rest = [
  {
    data: adminUserData,
    url: 'http://0.0.0.0:9000/api/users/admin',
    access_token: SUPER_TOKEN
  },
  {
    data: userData,
    url: 'http://0.0.0.0:9000/api/users',
    access_token: MASTER_TOKEN
  }
]

async function processData (url, model, accessToken) {
  await request({
    method: 'POST',
    uri: url,
    body: model,
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    json: true
  }).catch(err => console.log('>>>>  ERROR'))
}

async function processRest (item) {
  console.log(`Posting datas to ${item.url}`)
  for (let i = 0; i < item.data.length; i += 1) {
    processData(item.url, item.data[i], item.access_token)
  }
}

for (let i = 0; i < rest.length; i += 1) {
  processRest(rest[i])
}
