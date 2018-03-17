import request from 'request-promise'

export const getUser = (accessToken) =>
  request({
    uri: 'https://www.googleapis.com/userinfo/v2/me',
    json: true,
    qs: {
      access_token: accessToken
    }
  }).then(({ id, name, email, picture }) => {
    console.log('>>>>>> AFTER LOGIN GOOGLE')
    console.log(id, name, email, picture )
    return {
      service: 'google',
      picture,
      id,
      name,
      email
    }
  })
