import request from 'request-promise';

const userData = require('./users.json');

const TOKEN = {
  SUPER: process.env.SUPER_USER_KEY,
  MASTER: process.env.MASTER_KEY,
  ADMIN: '',
  USER: ''
};

const rest = [
  {
    data: userData,
    url: 'http://0.0.0.0:9000/api/v1/users',
    access_token: TOKEN.MASTER
  }
];

async function processData(url, model, accessToken) {
  if (model.treatments) {
    const treatments = await request({
      method: 'GET',
      uri: `http://0.0.0.0:9000/api/v1/treatments`,
      json: true,
      headers: {
        Authorization: `Bearer ${TOKEN.ADMIN}`
      }
    });
    model.treatments = model.treatments.map(item => {
      const treat = treatments.filter(
        itemI => itemI.lang === item.lang && itemI.key === item.key
      );
      return { ...item, _id: treat[0].id };
    });
  }
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
