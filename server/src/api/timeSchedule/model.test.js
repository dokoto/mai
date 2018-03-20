import { TimeSchedule } from '.'

let timeSchedule

beforeEach(async () => {
  timeSchedule = await TimeSchedule.create({ times: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = timeSchedule.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(timeSchedule.id)
    expect(view.times).toBe(timeSchedule.times)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = timeSchedule.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(timeSchedule.id)
    expect(view.times).toBe(timeSchedule.times)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
