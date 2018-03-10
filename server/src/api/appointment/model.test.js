import { Appointment } from '.'

let appointment

beforeEach(async () => {
  appointment = await Appointment.create({ email: 'test', date: 'test', time: 'test', treatment: 'test', doc: 'test', address: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = appointment.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(appointment.id)
    expect(view.email).toBe(appointment.email)
    expect(view.date).toBe(appointment.date)
    expect(view.time).toBe(appointment.time)
    expect(view.treatment).toBe(appointment.treatment)
    expect(view.doc).toBe(appointment.doc)
    expect(view.address).toBe(appointment.address)
    expect(view.status).toBe(appointment.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = appointment.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(appointment.id)
    expect(view.email).toBe(appointment.email)
    expect(view.date).toBe(appointment.date)
    expect(view.time).toBe(appointment.time)
    expect(view.treatment).toBe(appointment.treatment)
    expect(view.doc).toBe(appointment.doc)
    expect(view.address).toBe(appointment.address)
    expect(view.status).toBe(appointment.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
