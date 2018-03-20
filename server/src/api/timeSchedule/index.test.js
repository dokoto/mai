import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { TimeSchedule } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, timeSchedule

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  timeSchedule = await TimeSchedule.create({})
})

test('POST /timeSchedules 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, times: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.times).toEqual('test')
})

test('POST /timeSchedules 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /timeSchedules 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /timeSchedules 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /timeSchedules 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /timeSchedules/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${timeSchedule.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(timeSchedule.id)
})

test('GET /timeSchedules/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${timeSchedule.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /timeSchedules/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${timeSchedule.id}`)
  expect(status).toBe(401)
})

test('GET /timeSchedules/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /timeSchedules/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${timeSchedule.id}`)
    .send({ access_token: adminSession, times: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(timeSchedule.id)
  expect(body.times).toEqual('test')
})

test('PUT /timeSchedules/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${timeSchedule.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /timeSchedules/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${timeSchedule.id}`)
  expect(status).toBe(401)
})

test('PUT /timeSchedules/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, times: 'test' })
  expect(status).toBe(404)
})

test('DELETE /timeSchedules/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${timeSchedule.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /timeSchedules/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${timeSchedule.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /timeSchedules/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${timeSchedule.id}`)
  expect(status).toBe(401)
})

test('DELETE /timeSchedules/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
