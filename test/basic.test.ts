import { describe, it, expect } from 'vitest'
import module from '../src/module'

describe('module', () => {
  it('should be defined and callable', () => {
    expect(module).toBeDefined()
    expect(typeof module).toBe('function')
  })
})
