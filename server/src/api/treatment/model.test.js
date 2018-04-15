import { Treatment } from '.'

let treatment

beforeEach(async () => {
  treatment = await Treatment.create({ key: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = treatment.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(treatment.id)
    expect(view.key).toBe(treatment.key)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = treatment.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(treatment.id)
    expect(view.key).toBe(treatment.key)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
