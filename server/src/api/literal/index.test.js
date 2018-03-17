import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Literal } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, literal

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  literal = await Literal.create({})
})

test('POST /literals 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, lang: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.lang).toEqual('test')
})

test('POST /literals 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /literals 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /literals 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /literals 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /literals/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${literal.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(literal.id)
})

test('GET /literals/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${literal.id}`)
  expect(status).toBe(401)
})

test('GET /literals/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /literals/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${literal.id}`)
    .send({ access_token: adminSession, lang: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(literal.id)
  expect(body.lang).toEqual('test')
})

test('PUT /literals/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${literal.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /literals/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${literal.id}`)
  expect(status).toBe(401)
})

test('PUT /literals/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, lang: 'test' })
  expect(status).toBe(404)
})

test('DELETE /literals/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${literal.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /literals/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${literal.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /literals/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${literal.id}`)
  expect(status).toBe(401)
})

test('DELETE /literals/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
