import request from 'request-promise';

const treatmenteData = require('./treatment.json');

const TOKEN = {
  SUPER: 'OyalhYuKbQgUNpOQhdTQamZDKrhqOAC8',
  MASTER: 'W0sgNBbwsfoUfe5GXNQY36p1IOHA96Gb',
  ADMIN: ''
};

const rest = [
  {
    data: treatmenteData,
    url: 'http://0.0.0.0:9000/api/v1/treatments',
    token: 'ADMIN'
  }
];

async function processData(url, model, accessToken) {
  await request({
    method: 'POST',
    uri: url,
    body: model,
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    json: true
  }).catch(err => console.log('>>>>  ERROR'));
}

async function processRest(item) {
  console.log(`Posting datas to ${item.url}`);
  for (let i = 0; i < item.data.length; i += 1) {
    processData(item.url, item.data[i], TOKEN[item.token]);
  }
}

async function main() {
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
  });
  TOKEN.ADMIN = admin.token;
  for (let i = 0; i < rest.length; i += 1) {
    processRest(rest[i]);
  }
}

main();
