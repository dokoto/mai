import request from 'request-promise'

const timeScheduleData = require('./timeSchedule.json')

const TOKEN = {
  SUPER: 'OyalhYuKbQgUNpOQhdTQamZDKrhqOAC8',
  MASTER: 'W0sgNBbwsfoUfe5GXNQY36p1IOHA96Gb',
  ADMIN: ''
}

const rest = [
  {
    data: timeScheduleData,
    url: 'http://0.0.0.0:9000/api/v1/timeSchedules',
    token: 'ADMIN'
  }
]

async function processData (url, model, accessToken) {
  console.log(model.doctor.email)
  const user = await request({
    method: 'GET',
    uri: `http://0.0.0.0:9000/api/v1/users?q=${model.doctor.email}`,
    headers: {
      Authorization: `Bearer ${TOKEN.ADMIN}`
    },
    json: true
  })
  model.doctor._id = user[0].id
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
    processData(item.url, item.data[i], TOKEN[item.token])
  }
}

async function main () {
  const admin = await request({
    method: 'POST',
    uri: 'http://0.0.0.0:9000/api/v1/auth',
    body: {
      access_token: TOKEN.MASTER
    },
    auth: {
      user: 'dokoto.moloko@gmail.com',
      pass: '123456'
    },
    json: true
  })
  TOKEN.ADMIN = admin.token
  for (let i = 0; i < rest.length; i += 1) {
    processRest(rest[i])
  }
}

main()
