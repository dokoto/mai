import { Literal } from '.'

let literal

beforeEach(async () => {
  literal = await Literal.create({ lang: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = literal.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(literal.id)
    expect(view.lang).toBe(literal.lang)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = literal.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(literal.id)
    expect(view.lang).toBe(literal.lang)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
