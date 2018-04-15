import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Treatment } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, treatment

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  treatment = await Treatment.create({})
})

test('POST /treatments 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, key: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.key).toEqual('test')
})

test('POST /treatments 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /treatments 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /treatments 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /treatments 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /treatments/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${treatment.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(treatment.id)
})

test('GET /treatments/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${treatment.id}`)
  expect(status).toBe(401)
})

test('GET /treatments/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /treatments/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${treatment.id}`)
    .send({ access_token: adminSession, key: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(treatment.id)
  expect(body.key).toEqual('test')
})

test('PUT /treatments/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${treatment.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /treatments/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${treatment.id}`)
  expect(status).toBe(401)
})

test('PUT /treatments/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, key: 'test' })
  expect(status).toBe(404)
})

test('DELETE /treatments/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${treatment.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /treatments/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${treatment.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /treatments/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${treatment.id}`)
  expect(status).toBe(401)
})

test('DELETE /treatments/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
