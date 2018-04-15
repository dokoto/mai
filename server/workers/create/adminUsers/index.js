import request from 'request-promise';

const adminUserData = require('./adminUsers.json');

const TOKEN = {
  SUPER: 'OyalhYuKbQgUNpOQhdTQamZDKrhqOAC8',
  MASTER: 'W0sgNBbwsfoUfe5GXNQY36p1IOHA96Gb',
  ADMIN: '',
  USER: ''
};

const rest = [
  {
    data: adminUserData,
    url: 'http://0.0.0.0:9000/api/v1/users/admin',
    access_token: TOKEN.SUPER
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
    processData(item.url, item.data[i], item.access_token);
  }
}

async function main() {
  for (let i = 0; i < rest.length; i += 1) {
    processRest(rest[i]);
  }
}

main();
