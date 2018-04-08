import request from 'request-promise'
import moment from 'moment'

const appointmentData = require('./appointment.json')

const TOKEN = {
  SUPER: 'OyalhYuKbQgUNpOQhdTQamZDKrhqOAC8',
  MASTER: 'W0sgNBbwsfoUfe5GXNQY36p1IOHA96Gb',
  ADMIN: '',
  USER: ''
}

const rest = [
  {
    data: appointmentData,
    url: 'http://0.0.0.0:9000/api/appointments',
    token: 'USER'
  }
]

async function processData (url, model, accessToken, date) {
  console.log(model.doctor.email)
  const doctor = await request({
    method: 'GET',
    uri: `http://0.0.0.0:9000/api/users?q=${model.doctor.email}`,
    headers: {
      Authorization: `Bearer ${TOKEN.ADMIN}`
    },
    json: true
  })
  console.log(model.patient.email)
  const user = await request({
    method: 'GET',
    uri: `http://0.0.0.0:9000/api/users?q=${model.patient.email}`,
    headers: {
      Authorization: `Bearer ${TOKEN.ADMIN}`
    },
    json: true
  })
  model.date = date
  model.doctor._id = doctor[0].id
  model.patient._id = user[0].id
  model.createddBy = user[0].id;
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
    const date = moment().add(i, 'week')
    processData(item.url, item.data[i], TOKEN[item.token], date)
  }
}

async function main () {
  const admin = await request({
    method: 'POST',
    uri: 'http://0.0.0.0:9000/api/auth',
    body: {
      access_token: TOKEN.MASTER
    },
    auth: {
      user: 'dokoto.moloko@gmail.com',
      pass: '123456'
    },
    json: true
  })
  const user = await request({
    method: 'POST',
    uri: 'http://0.0.0.0:9000/api/auth',
    body: {
      access_token: TOKEN.MASTER
    },
    auth: {
      user: 'manuel@coolmail.com',
      pass: '123456'
    },
    json: true
  })
  TOKEN.ADMIN = admin.token
  TOKEN.USER = user.token
  for (let i = 0; i < rest.length; i += 1) {
    processRest(rest[i])
  }
}

main()
