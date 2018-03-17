import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Appointment } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, appointment

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  appointment = await Appointment.create({})
})

test('POST /appointments 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, email: 'test', date: 'test', time: 'test', treatment: 'test', doc: 'test', address: 'test', status: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.email).toEqual('test')
  expect(body.date).toEqual('test')
  expect(body.time).toEqual('test')
  expect(body.treatment).toEqual('test')
  expect(body.doc).toEqual('test')
  expect(body.address).toEqual('test')
  expect(body.status).toEqual('test')
})

test('POST /appointments 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /appointments 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /appointments 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /appointments/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${appointment.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(appointment.id)
})

test('GET /appointments/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${appointment.id}`)
  expect(status).toBe(401)
})

test('GET /appointments/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /appointments/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${appointment.id}`)
    .send({ access_token: userSession, email: 'test', date: 'test', time: 'test', treatment: 'test', doc: 'test', address: 'test', status: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(appointment.id)
  expect(body.email).toEqual('test')
  expect(body.date).toEqual('test')
  expect(body.time).toEqual('test')
  expect(body.treatment).toEqual('test')
  expect(body.doc).toEqual('test')
  expect(body.address).toEqual('test')
  expect(body.status).toEqual('test')
})

test('PUT /appointments/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${appointment.id}`)
  expect(status).toBe(401)
})

test('PUT /appointments/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: userSession, email: 'test', date: 'test', time: 'test', treatment: 'test', doc: 'test', address: 'test', status: 'test' })
  expect(status).toBe(404)
})

test('DELETE /appointments/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${appointment.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /appointments/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${appointment.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(401)
})

test('DELETE /appointments/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${appointment.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /appointments/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${appointment.id}`)
  expect(status).toBe(401)
})

test('DELETE /appointments/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
