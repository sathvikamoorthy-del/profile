import { z } from 'zod'
import { describe, expect, it } from 'vitest'
import { validateData } from './validate-data'

const schema = z.object({ name: z.string() })

describe('validateData', () => {
  it('returns the parsed data when valid', () => {
    expect(validateData(schema, { name: 'Ada' }, 'test.json')).toEqual({ name: 'Ada' })
  })

  it('throws a readable error naming the file and field on invalid data', () => {
    expect(() => validateData(schema, { name: 123 }, 'test.json')).toThrowError(
      /test\.json[\s\S]*name/,
    )
  })
})
